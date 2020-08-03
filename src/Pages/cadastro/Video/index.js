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

  const valoresIniciais = {
    titulo: '',
    url: '',
    categoria: 0,
  }

  function validate(values) {
    const errors = {};

    if(!values.titulo) {
      errors.titulo = 'O título do vídeo é obrigatório';
    }

    if(!values.url) {
      errors.url = 'A URL é obrigatória';
    }

    if(!values.categoria) {
      errors.categoria = 'A categoria é obrigatória';
    }

    return errors;
  }

  const { handleChange, handleBlur, values, touched, errors, markAllAsTouched, clearForm } = useForm({valoresIniciais, validate});
  const [categorias, setCategorias] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    categoriasRepository.getAllWithVideos()
      .then((categorias) => {
        setCategorias(categorias);
      })
      .catch(() => toast.error('Ocorreu um erro ao buscar as categorias'));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    markAllAsTouched();

    if(Object.keys(errors).length)
      return;

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
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.titulo}
          error = {touched.titulo && errors.titulo ? errors.titulo : ""} 
        />

        <FormField
          label="URL"
          name="url"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.url}
          error = {touched.url && errors.url ? errors.url : ""} 
        />

        <FormField
          type="select"
          name="categoria"
          label="Categoria"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.categoria}
          error = {touched.categoria && errors.categoria ? errors.categoria : ""} 
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
