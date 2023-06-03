import { Link } from 'react-router-dom';
import { getItem } from '../services/LocalStorage';
import { CgShoppingCart } from 'react-icons/cg';
import '../source/styles/minicart.scss';
import { useSelector } from 'react-redux';

const MiniCart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const cartQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
    
    return(
        <div className='minicart__icon'><Link to={'/checkout'} ><span className='counter'>{cartQty}</span><CgShoppingCart /></Link></div>
    )
}

export default MiniCart;
