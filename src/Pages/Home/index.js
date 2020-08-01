import React, { useEffect, useState } from 'react';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import categoriasRepository from '../../repositories/categorias';
import PageDefault from '../../components/PageDefault';

function Home() {
  const [dadosIniciais, setDadosIniciais] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    categoriasRepository.getAllWithVideos()
      .then((categoriasComVideos) => {
        setDadosIniciais(categoriasComVideos);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoader(false))
  }, []);

  console.log(dadosIniciais)

  return (
    <PageDefault paddingAll={0}>
      {loader && (<Loader />)}

      {dadosIniciais.map((categoria, indice) => {
        if(indice === 0) {
          return (
            <div key={categoria.id}>
              <BannerMain
                videoTitle={categoria.videos[0].titulo}
                url={categoria.videos[0].url}
                videoDescription={categoria.videos[0].descricao}
              />
              <Carousel
                ignoreFirstVideo
                category={categoria}
              />
            </div>
          );
        } 
        return (         
          <Carousel
            key={categoria.id}
            category={categoria}
          />
        )

      })}
    </PageDefault>
  );
}

export default Home;
