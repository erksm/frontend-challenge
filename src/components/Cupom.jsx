import React, { useState } from 'react';
import '../source/styles/cupom.scss';

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
                console.log(couponCode, cupomItem.text);
                const cupomValue = cupomItem.value;
                const isValid = true;
                setShowMsg(true);
                setCupomMsg(true);
                applyCoupon(cupomValue, isValid);
                return true;
            }
            const isValid = false;
            setShowMsg(true);
            setCupomMsg(false);
            applyCoupon(isValid)
        }))
    };

    return (
        <form onSubmit={handleSubmit} className='form form--cupom'>
            <input
                type="text"
                value={couponCode}
                onChange={handleChange}
                placeholder="Insira seu cupom"
                className='form__input'
            />
            <button type="submit" className='form__submit'>Aplicar</button>
            {showMsg && <p className={cupomMsg ? 'cupom--message valid' : 'cupom--message'} >{cupomMsg ? 'Cupom válido' : 'Cupom inválido'}</p>}
        </form>
    );
};

export default Cupom;