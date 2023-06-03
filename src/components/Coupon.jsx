import React, { useEffect, useState } from 'react';
import '../source/styles/coupon.scss';
import FetchCoupons from '../services/FetchCoupons';

const Coupon = ({ applyCoupon, data }) => {
    const [couponCode, setCouponCode] = useState('');
    const [showMsg, setShowMsg] = useState(false);
    const [couponValid, setCouponValid] = useState();
    const coupons = FetchCoupons();

    const handleChange = (event) => {
        setCouponCode(event.target.value);
    };

    const handleSubmit = (couponCode, event) => {
        event && event.preventDefault();
        const coupon = coupons.find(((couponItem) => {
            if (couponCode === couponItem.text) {
                const rareCoupon = couponItem.rare;
                const couponValue = couponItem.value;
                setShowMsg(true);
                setCouponValid(true);
                applyCoupon(true, couponValue, rareCoupon);
                return true;
            }
        }))

        if (!coupon) {
            setShowMsg(true);
            setCouponValid(false);
            applyCoupon(false);
        }
    };

    useEffect(() => {
        couponCode && handleSubmit(couponCode);
    }, [data]);

    return (
        <form onSubmit={(event) => handleSubmit(couponCode, event)} className='form form--coupon'>
            <input
                type="text"
                value={couponCode}
                onChange={handleChange}
                placeholder="Insira seu cupom"
                className='form__input'
            />
            <button type="submit" className='form__submit'>Aplicar</button>
            {showMsg && <p className={couponValid ? 'coupon--message valid' : 'coupon--message'} >{couponValid ? 'Cupom válido' : 'Cupom inválido'}</p>}
        </form>
    );
};

export default Coupon;