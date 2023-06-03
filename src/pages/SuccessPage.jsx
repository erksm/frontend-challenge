import { useEffect } from 'react';
import { clearCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import '../source/styles/success.scss';

const SuccessPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearCart());
    }, []);

    return (
        <div className="block__container">
            <div className="block__success">
                <h1>Pedido realizado com sucesso!</h1>
                <p>Você receberá um email com mais informações sobre sua compra.</p>
            </div>
        </div>
    )
}

export default SuccessPage;