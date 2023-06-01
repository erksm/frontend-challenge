import { useEffect, useState } from "react";
import FetchComics from '../services/FetchComics';
import { getItem, setItem } from '../services/LocalStorage';
import MiniCart from "../components/MiniCart";
import Cupom from "../components/Cupom";

const CheckoutPage = () => {
    const [data, setData] = useState([]);
    const cartItems = getItem('cart') || [];
    const [totalFinal, setTotalFinal] = useState();

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
    
    if (!data) {
        return <div>Loading...</div>;
    }
    
    return(
        <div className="checkour-container">
            <MiniCart />
            <div className="items-container">
                <div className="items-box">
                    {data.map((item) => {
                        const thumbUrl = item.thumbnail.path + '.' + item.thumbnail.extension;
                        return (
                            <>
                                <div className="cart-item" key={item.id}>
                                    <div className="item-thumb">
                                        <img src={thumbUrl} alt="" />
                                    </div>
                                    <div className="item-name">{item.title}</div>
                                    <div className="item-price">{item.prices[0].price}</div>
                                    <div className="item qty">{item.qty}</div>
                                    <button onClick={() => removeItem(item.id)}>Remove</button>
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className="checkout-info">
                    <Cupom applyCoupon={applyCoupon} />
                    <div className="totals">
                        Total: {totalFinal}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage;