import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';

function CadastroCategoria() {
  const URL = window.location.hostname.includes('localhost')
  ? 'http://localhost:8080/categorias'
  : 'https://tech-flix.herokuapp.com/categorias';

  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '',
  };

  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);
  const [loader, setLoader] = useState(false);

  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor,
    });
  }

  function handleChange(event) {
    setValue(
      event.target.getAttribute('name'),
      event.target.value,
    );
  }

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      fetch(URL)
      .then(async(resp) => {
        const resposta = await resp.json();
        setCategorias([
          ...resposta
        ])
        setLoader(false);
      })
    }, 600);
  }, []);

  async function handleSubmit(event) {
    setLoader(true);
    event.preventDefault();
  
    const request = {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    setTimeout(() => {
      fetch(URL, request)
      .then(resp => {
        setLoader(false);
  
        if(resp.ok){
          setCategorias([...categorias, values]);
          setValues(valoresIniciais);
  
          toast.success("Cadastro realizado com sucesso!");
        } else {
          toast.error("Ocorreu um erro ao salvar os dados")
        }
      })
    }, 1000) 
  }

  return (
    <>
    <PageDefault>

      {loader && ( 
        <Loader />
      )}

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

        <Button>Cadastrar</Button>

      </form>

      {categorias.length === 0 && (
        <div>LoadinG...</div>
      )}

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
