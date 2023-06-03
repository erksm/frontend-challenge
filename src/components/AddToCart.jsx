import { useState } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import '../source/styles/addtocart.scss';
import { useDispatch } from "react-redux";
import { addCartItem } from '../redux/slices/cartSlice';

const AddToCart = ({ id }) => {
    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);
    
    const handleComic = () => {
        dispatch(addCartItem({id, qty}));
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
