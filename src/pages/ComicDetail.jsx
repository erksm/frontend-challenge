import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FetchComics from '../services/FetchComics';
import AddToCart from '../components/AddToCart';

const ComicDetails = () => {
  const { id } = useParams();
  const [comic, setComic] = useState(null);

  useEffect(() => {
    FetchComics(id).then((response) => {
      setComic(response[0]);
    });
  }, []);

  console.log('detail', comic)

  if (!comic) {
    return <div>Loading...</div>;
  }

  const thumbUrl = comic.thumbnail?.path + '.' + comic.thumbnail?.extension;

  return (
    <div>
      <div id={comic.id}>
        <img src={thumbUrl} ></img>
        <h1>Titulo: {comic.title}</h1>
        <p>Preço: {comic.prices[0].price}</p>
        <p>Descriçao: {comic.description}</p>
        <AddToCart id={comic.id}/>
      </div>
    </div>
  );
}

export default ComicDetails;