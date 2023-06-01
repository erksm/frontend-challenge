import { Link } from 'react-router-dom';
import { getItem } from '../services/LocalStorage';

const MiniCart = () => {
    const cartItems = getItem('cart') || [];
    const cartQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
    
    return(
        <div><Link to={'/checkout'} >Quantidade: {cartQty}</Link></div>
    )
}

export default MiniCart;
