import { useEffect, useState } from "react";
import FetchComics from '../services/FetchComics';
import { getItem, setItem } from '../services/LocalStorage';
import Cupom from "../components/Cupom";
import Loader from "../components/Loader";
import { BsFillTrash3Fill } from 'react-icons/bs';
import '../source/styles/checkout.scss';

const CheckoutPage = () => {
    const [data, setData] = useState([]);
    const [cupomValue, setCupomValue] = useState();
    const [totalFinal, setTotalFinal] = useState();
    const cartItems = getItem('cart') || [];

    useEffect(() => {
        FetchComics().then((response) => {
            const filterItem = response.filter(item => cartItems.find(el => {
                if (item.id === el.id) {
                    item.qty = el.qty;
                    item.total = item.prices[0].price * item.qty;
                    return true;
                }
                return false;
            }));
            setData(filterItem)
        });
    }, []);

    const totals = data.reduce((acc, item) => acc + item.total, 0);

    const applyCoupon = (cupomValue, isValid) => {
        console.log('isValid', isValid);
        setCupomValue(cupomValue);
        isValid && isValid ? setTotalFinal(totals - cupomValue) : setTotalFinal(totals);
    };
    
    useEffect(() => {
        setTotalFinal(totals);
    }, [data]);

    const removeItem = (id) => {
        const newFilterItem = data.filter((obj) => obj.id !== id);
        setItem('cart', newFilterItem);
        setData(newFilterItem)
    }

    const formatedTotals = totals && totals.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    const formatedCupomValue = cupomValue && cupomValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    const formatedTotalFinal = totalFinal && totalFinal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    
    if (!data) {
        return <Loader />;
    }

      return(
          <div className="block__container block__checkout">
            <div className="block__checkout--box">
                <h1>Resumo da compra </h1>
                {data.map((item) => {
                    const formatedPrice = item.prices[0].price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
                    const thumbUrl = item.thumbnail.path + '.' + item.thumbnail.extension;
                    return (
                        <div className="block__checkout--item" key={item.id}>
                            <div className="item thumb">
                                <img src={thumbUrl} alt="" />
                            </div>
                            <div className="item info">
                                <span className="title">
                                    {item.title}
                                </span>
                                <span className="price">
                                    {formatedPrice}
                                </span>
                            </div>
                            <div className="item qty">Qty: {item.qty}</div>
                            <div className="item btn--remove">
                                <button onClick={() => removeItem(item.id)}><BsFillTrash3Fill /></button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="block__checkout--info">
                <h2>Resumo do pedido</h2>
                <Cupom applyCoupon={applyCoupon} />
                <div className="block--total">
                    <div className="subtotal">
                        <span>Subtotal:</span> {formatedTotals}
                    </div>
                    {formatedCupomValue &&
                        <div className="discount">
                            <span>Desconto:</span> {formatedCupomValue}
                        </div>
                    }
                    <div className="total">
                        <span>Total:</span> {formatedTotalFinal}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage;