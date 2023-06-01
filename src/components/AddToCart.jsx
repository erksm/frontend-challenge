import { useState } from 'react';
import { getItem, setItem } from '../services/LocalStorage';

const AddToCart = ({ id }) => {
    const [qty, setQty] = useState(1);
    
    const handleComic = () => {
        const cart = getItem('cart') || [];
        const itemFound = cart.find((cartItem) => {
           return cartItem.id === id;
        });

        if (itemFound) {
            itemFound.qty += qty;
        } else {
            const comicData = {id, qty};
            cart.push(comicData)
        }

        setItem('cart', cart);
    }

    return (
        <>
            <input type="number" value={qty} onChange={(e) => setQty(+e.target.value)} />
            <button onClick={handleComic}>Adicionar</button>
        </>
    )
}

export default AddToCart;
