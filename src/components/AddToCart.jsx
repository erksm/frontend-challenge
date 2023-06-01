import { useState } from 'react';
import { getItem, setItem } from '../services/LocalStorage';
import { IoCartOutline } from 'react-icons/io5';
import '../source/styles/addtocart.scss';

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

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        setQty(newQuantity);
    };

    const increaseQuantity = () => {
        setQty(qty + 1);
    };

    const decreaseQuantity = () => {
        if (qty > 1) {
        setQty(qty - 1);
        }
    };

    return (
        <div className='block block__addtocart-container'>
            <div className="block__addtocart-qty">
                <button onClick={decreaseQuantity} className='decrease-btn'>-</button>
                <input
                    type="text"
                    value={qty}
                    onChange={handleQuantityChange}
                />
                <button onClick={increaseQuantity} className='increase-btn'>+</button>
            </div>
            <button onClick={handleComic} className='block block__addtocart-button'>
                <IoCartOutline />
                <span>Adicionar</span>
            </button>
        </div>
    )
}

export default AddToCart;
