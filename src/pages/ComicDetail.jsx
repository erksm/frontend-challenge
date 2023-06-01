import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FetchComics from '../services/FetchComics';
import AddToCart from '../components/AddToCart';
import '../source/styles/comic-detail.scss';

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
    <div id={comic.id} className='block__container block__comic--details'>
        <img src={thumbUrl} ></img>
        <div className='block__comic--detail--content'>
          <h1 className='block__comic--detail--title'>{comic.title}</h1>
          <div className="block__comic--price">{comic.prices[0].price}</div>
          <p className="block__comic--description">{comic.description}</p>
          <AddToCart id={comic.id}/>
        </div>
    </div>
  );
}

export default ComicDetails;