import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import CadastroVideo from './Pages/cadastro/Video';
import CadastroCategoria from './Pages/cadastro/Categoria';
import PageDefault from './components/PageDefault';

const Pagina404 = () => (
  <PageDefault>
    <h1>Página não encontrada - 404</h1>
  </PageDefault>
)

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/cadastro/video" component={CadastroVideo} exact />
      <Route path="/cadastro/categoria" component={CadastroCategoria} exact />
      <Route component={Pagina404} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);