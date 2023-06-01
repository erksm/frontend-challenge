import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

const ComicDetails = ({ comicData }) => {
    const { id, thumbUrl, title, price } = comicData;

  return (
    <div className="comic-item" id={id}>
      <img src={thumbUrl} ></img>
      <h1>Titulo: {title}</h1>
      <Link to={`comic-detail/${id}`}>Detalhes</Link>
      <p>Preço: {price}</p>
      <AddToCart id={id}/>
    </div>
  );
}

export default ComicDetails;
