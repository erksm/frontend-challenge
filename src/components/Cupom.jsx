import React, { useState } from 'react';

const Cupom = ({ applyCoupon }) => {
    const [couponCode, setCouponCode] = useState('');
    const [showMsg, setShowMsg] = useState(false);
    const [cupomMsg, setCupomMsg] = useState('');
    const cupoms = [{text: 'cupom1', value: 2.00},{text: 'cupom2', value: 3.00}];
    const handleChange = (event) => {
        setCouponCode(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        cupoms.find(((cupomItem) => {
            if (couponCode === cupomItem.text) {
                console.log(couponCode, cupomItem.text)
                const cupomValue = cupomItem.value;
                const isValid = true;
                setShowMsg(true);
                setCupomMsg('Cupom Válido');
                applyCoupon(cupomValue, isValid)
                return true;
            }
            const isValid = false;
            setShowMsg(true);
            setCupomMsg('Cupom Inválido');
            applyCoupon(isValid)
        }))
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={couponCode}
                onChange={handleChange}
                placeholder="Enter coupon code"
            />
            <button type="submit">Apply</button>
            {showMsg && <p>{cupomMsg}</p>}
        </form>
    );
};

export default Cupom;