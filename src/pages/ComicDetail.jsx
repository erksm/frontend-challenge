import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FetchComics from '../services/FetchComics';
import AddToCart from '../components/AddToCart';
import Loader from '../components/Loader';
import '../source/styles/comic-detail.scss';

const ComicDetails = () => {
  const { id } = useParams();
  const [data, setdata] = useState(null);

  useEffect(() => {
    FetchComics(id).then((response) => {
      setdata(response[0]);
    });
  }, []);

  console.log('detail', data)

  if (!data) {
    return <Loader />;
  }

  const thumbUrl = data.thumbnail?.path + '.' + data.thumbnail?.extension;
  const price = data.prices[0].price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})

  return (
    <div id={data.id} className='block__container block__comic--details'>
        <img src={thumbUrl && thumbUrl} ></img>
        <div className='block__comic--detail--content'>
          <h1 className='block__comic--detail--title'>{data.title}</h1>
          <div className="block__comic--price">{price}</div>
          <p className="block__comic--description">{data.description}</p>
          <AddToCart id={data.id}/>
        </div>
    </div>
  );
}

export default ComicDetails;
