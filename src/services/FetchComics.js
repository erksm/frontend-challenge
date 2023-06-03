import { getItem, setItem } from './LocalStorage';
import md5 from 'md5';

const FetchComics = async (id) => {
    const storageKey = id ? `comicItem-${id}` : 'allComics';
    const cacheData = getItem(storageKey);
    if (cacheData) {
        return cacheData;
    }
    const timeStamp = Date.now().toString();
    const publicKey = 'a2e333d3af5b15f0eb2c11ce4d7ba9c1';
    const privateKey = 'b3ef270cb59b71177875e817c0b75b8e5f221089';
    const md5Hash = md5(timeStamp + privateKey + publicKey);
    let apiUrl = 'http://gateway.marvel.com/v1/public/comics';
    if (id) {
        apiUrl += `/${id}`;
    }
    apiUrl += `?ts=${timeStamp}&apikey=${publicKey}&hash=${md5Hash}&limit=40`;
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    jsonData.data.results.forEach(item => {
        item.rare = false;
    });
    const shuffledArray = jsonData.data.results.sort(() => 0.5 - Math.random());
    const tenPercent = Math.floor(shuffledArray.length * 0.1);
    const tenPercentResult = shuffledArray.slice(0, tenPercent);
    tenPercentResult.forEach(item => {
        item.rare = true;
    });
    setItem(storageKey, jsonData.data.results);
    return jsonData.data.results;
};

export default FetchComics;
