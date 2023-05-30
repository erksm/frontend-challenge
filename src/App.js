import { useEffect, useState } from "react";
import './source/styles/index.scss';

function App() {
  const [data, setData] = useState([]);
  const timeStamp = '1685466831';
  const apiKey = 'a2e333d3af5b15f0eb2c11ce4d7ba9c1';
  const md5Hash = '69b68350cd547af9c7cf628cddc431d1';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://gateway.marvel.com/v1/public/comics?ts=${timeStamp}&apikey=${apiKey}&hash=${md5Hash}`);
        const jsonData = await response.json();
        setData(jsonData.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="comic-container">
      {data.map((item) => {
        const thumbUrl = item.thumbnail.path + '.' + item.thumbnail.extension;
        return (
          <div key={item.id} className="comic-box">
            <img src={thumbUrl} ></img>
            <div>Titulo: {item.title}</div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
