import { useEffect, useState } from "react";
import '../source/styles/home.scss';
import FetchComics from '../services/FetchComics';
import ComicCard from '../components/ComicCard';
import Loader from "../components/Loader";

const ComicList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    FetchComics().then((response) => {
      setData(response);
    });
  }, []);

  if (!data) {
    return <Loader />;
  }

  return (
    <div className="block__container main__container">
      {data.map((item) => {
        const thumbUrl = item.thumbnail.path + '.' + item.thumbnail.extension;
        return (
          <ComicCard comicData={{ id: item.id, title: item.title, thumbUrl: thumbUrl, price: item.prices[0].price}} />
        )
      })}
    </div>
  );
}

export default ComicList;