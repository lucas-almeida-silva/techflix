import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };

  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);

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
    const URL = 'http://localhost:8080/categorias';
    fetch(URL)
    .then(async(resp) => {
      const resposta = await resp.json();
      setCategorias([
        ...resposta
      ])
    })
  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Categoria</h1>

      <form onSubmit={function handleSubmit(event) {
        event.preventDefault();

        setCategorias([...categorias, values]);
        setValues(valoresIniciais);
      }}
      >

        <FormField
          label="Nome da categoria"
          type="text"
          name="nome"
          value={values.nome}
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
          <li key={`${categoria.nome}`}>
            {categoria.nome}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para a home
      </Link>

    </PageDefault>
  );
}

export default CadastroCategoria;
