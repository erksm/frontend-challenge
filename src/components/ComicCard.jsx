import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";
import '../source/styles/comic-card.scss';

const ComicDetails = ({ comicData }) => {
    const { id, thumbUrl, title, price } = comicData;

  return (
    <div className="block block__comic" id={id}>
      <Link to={`comic-detail/${id}`}>
        <div className="block__comic--image">
          <img src={thumbUrl} ></img>
        </div>
        <h2 className="block__comic--title">{title}</h2>
      </Link>
      <div className="block__comic--price">{price}</div>
      <AddToCart id={id}/>
    </div>
  );
}

export default ComicDetails;
