import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import { toast } from 'react-toastify';
import Loader from '../../../components/Loader';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo() {
  const history = useHistory();

  const [loader, setLoader] = useState(false);
  const [categorias, setCategorias] = useState([]);

  const { values, handleChange } = useForm({
    titulo: '',
    url: '',
    categoria: 0,
  });

  useEffect(() => {
    categoriasRepository.getAllWithVideos()
      .then((categorias) => {
        setCategorias(categorias);
      })
      .catch(() => toast.error('Ocorreu um erro ao buscar as categorias'));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setLoader(true);

    videosRepository.create({
      titulo: values.titulo,
      url: values.url,
      categoriaId: Number(values.categoria)
    })
    .then(() => {
      history.push('/');
      toast.success('Cadastro realizado com sucesso!');
    })
    .catch((err) => {
      toast.error(err.message)
    })
    .finally(setLoader(false));
  }

  return (
    <PageDefault>

      {loader && ( <Loader /> )}

      <h1>Cadastro de vídeo</h1>

      <form onSubmit={handleSubmit}>

        <FormField
          label="Título do Vídeo"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="URL"
          name="url"
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          type="select"
          label="Categoria"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
        >
          <option hidden></option>
          {
            categorias.map(categoria => (
              <option value={categoria.id} key={categoria.id}>{categoria.titulo}</option>
            ))
          }
        </FormField>

        <Button background="darkblue" type="submit">Cadastrar</Button>
        <Button as={Link} to="/">Voltar</Button>
        <Button as={Link} to="/cadastro/categoria" float="right">Categorias</Button>
      
      </form>

    </PageDefault>
  );
}

export default CadastroVideo;
