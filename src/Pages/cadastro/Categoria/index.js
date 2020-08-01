import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';

function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '',
  };

  const { handleChange, values, clearForm } = useForm(valoresIniciais);
  
  const [loader, setLoader] = useState(false);
  const [categorias, setCategorias] = useState([]);
 
  useEffect(() => {
    setLoader(true);
    categoriasRepository.getAll()
      .then((categorias) => {
        setCategorias(categorias);
      })
      .catch(() => toast.error('Ocorreu um erro ao buscar as categorias'))
      .finally(setLoader(false));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setLoader(true);

    categoriasRepository.create({
      titulo: values.titulo,
      descricao: values.descricao,
      cor: values.cor
    })
    .then(() => {
      setCategorias([...categorias, values]);
      clearForm();
      toast.success('Cadastro realizado com sucesso!');
    })
    .catch((err) => {
      toast.error(err.message)
    })
    .finally(() => setLoader(false));
  }

  return (
    <>
    <PageDefault>

      {loader && ( <Loader /> )}

      <h1>Cadastro de Categoria</h1>

      <form onSubmit={handleSubmit}>

        <FormField
          label="Nome da categoria"
          type="text"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <Button type="submit">Cadastrar</Button>

      </form>
      
      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.titulo}`}>
            {categoria.titulo}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para a home
      </Link>

    </PageDefault>
    </>
  );
}

export default CadastroCategoria;
