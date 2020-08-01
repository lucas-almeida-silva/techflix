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
  const categoryTitles = categorias.map(({ titulo }) => titulo)

  const { values, handleChange, clearForm } = useForm({
    titulo: '',
    url: '',
    categoria: '',
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

    const categoriaEscolhida = categorias.find(categoria => categoria.titulo === values.categoria);

    if(!categoriaEscolhida) {
      toast.error('Categoria inválida! Selecione uma categoria na lista.');
      return;
    }

    videosRepository.create({
      titulo: values.titulo,
      url: values.url,
      categoriaId: categoriaEscolhida.id,
    })
    .then(() => {
      history.push('/');
      toast.success('Cadastro realizado com sucesso!');
    })
    .catch((err) => {
      toast.error(err.message)
    });
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
          label="Categoria"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />

        <Button background="darkblue" type="submit">Cadastrar</Button>
        <Button as={Link} to="/">Voltar</Button>
        <Button as={Link} to="/cadastro/categoria" float="right">Categorias</Button>
      
      </form>

    </PageDefault>
  );
}

export default CadastroVideo;
