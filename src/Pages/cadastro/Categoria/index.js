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

  function validate(values) {
    const errors = {};

    if(!values.titulo) {
      errors.titulo = 'O nome da categoria é obrigatório';
    }

    if(!values.descricao) {
      errors.descricao = 'A descrição é obrigatória';
    }

    if(!values.cor) {
      errors.cor = 'A cor é obrigatória';
    }

    return errors;
  }

  const { handleChange, handleBlur, values, touched, errors, markAllAsTouched, clearForm } = useForm({valoresIniciais, validate});
  
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

    markAllAsTouched();
    
    if(Object.keys(errors).length)
      return;

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
    .finally(setLoader(false));
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
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.titulo}
          error = {touched.titulo && errors.titulo ? errors.titulo : ""} 
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao" 
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.descricao}
          error = {touched.descricao && errors.descricao ? errors.descricao : ""} 
        />
        
        <FormField
          label="Cor"
          type="color"
          name="cor"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.cor}
          error = {touched.cor && errors.cor ? errors.cor : ""} 
        />
        
      <Button background="darkblue" type="submit">Cadastrar</Button>
      <Button as={Link} to="/">Voltar</Button>

      </form>

      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.titulo}`}>
            {categoria.titulo}
          </li>
        ))}
      </ul>

    </PageDefault>
    </>
  );
}

export default CadastroCategoria;
