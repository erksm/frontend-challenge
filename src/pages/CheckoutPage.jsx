import { useEffect, useMemo, useState } from "react";
import FetchComics from '../services/FetchComics';
import Coupon from "../components/Coupon";
import Loader from "../components/Loader";
import { BsFillTrash3Fill } from 'react-icons/bs';
import '../source/styles/checkout.scss';
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem } from '../redux/slices/cartSlice';

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const [data, setData] = useState([]);
    const [couponValue, setCouponValue] = useState(0);

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
    }, [cartItems]);

    const totals = useMemo(() => {
        return data.reduce((acc, item) => acc + item.total, 0);
    }, [data]);

    const totalNormal = useMemo(() => {
        return data.reduce((acc, item) => {
            let sum = acc;
            if (!item.rare) {
                sum += item.total;
            }
            return sum;
        }, 0);
    }, [data]);

    const applyCoupon = (isValid, couponValue, rareCoupon) => {
        const total = rareCoupon ? totals : totalNormal;
        const couponTotals = (total * (couponValue / 100));
        if (!isValid) {
            setCouponValue(0);
            return;
        }
        setCouponValue(couponTotals);
    };

    const removeItem = (id) => {
        dispatch(removeCartItem({ id }));
    }

    const totalFinal = useMemo(() => {
        return totals - couponValue;
    }, [totals, couponValue]);

    const formatedTotals = totals && totals.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    const formatedCouponValue = couponValue && couponValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    const formatedTotalFinal = totalFinal && totalFinal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

    if (!data) {
        return <Loader />;
    }

    return (
        <div className="block__container block__checkout">
            <div className="block__checkout--box">
                <h1>Resumo da compra </h1>
                {data.map((item) => {
                    const formatedPrice = item.prices[0].price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
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
                                {item.rare &&
                                    <span className="item rare">Quadrinho Raro</span>
                                }
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
                <Coupon applyCoupon={applyCoupon} data={data} />
                <div className="block--total">
                    <div className="subtotal">
                        <span>Subtotal:</span> {formatedTotals}
                    </div>
                    {!!formatedCouponValue &&
                        <div className="discount">
                            <span>Desconto:</span> {formatedCouponValue}
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