import config from '../config'

const URL_CATEGORIES = `${config.URL_BACKEND}/categorias`;

function getAll() {
  return fetch(URL_CATEGORIES)
    .then(async (response) => {
      if(response.ok) {
        return await response.json();
      }

      throw new Error('Não foi possível buscar os dados');       
    });
}

function getAllWithVideos() {
    return fetch(`${URL_CATEGORIES}?_embed=videos`)
      .then(async (response) => {
        if(response.ok) {
          return await response.json();
        }

        throw new Error('Não foi possível buscar os dados');       
      });
}

function create(categoria) {
  return fetch(URL_CATEGORIES, {
      method: 'POST',
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify(categoria)
  })
    .then(async (response) => {
      if(response.ok) {
        return await response.json();
      }

      throw new Error('Não foi possível salvar os dados');       
  });
}

export default {
  getAll,
  getAllWithVideos,
  create
}