import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button'

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  }

  const [categorias, setCategorias] = useState([]);
  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor,
    })
  }

  function handleChange(event) {
    //const { getAttribute, value } = event.target;
    setValue(
      event.target.getAttribute('name'),
      event.target.value,
    );
  }

  return (
    <PageDefault>
      <h1>Cadastro de Categoria</h1>

      <form onSubmit={function handleSubmit(event) {
        event.preventDefault();
        
        setCategorias([...categorias, values]);
        setValues(valoresIniciais);
      }}>

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

      <ul>
        {categorias.map((categoria, indice) => {
          return (
            <li key={`${categoria}${indice}`}>
              {categoria.nome}
            </li>
          )
        })}
      </ul>

      <Link to="/">
        Ir para a home
      </Link>
      
    </PageDefault>
  )
}

export default CadastroCategoria;