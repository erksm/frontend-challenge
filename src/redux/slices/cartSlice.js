import { createSlice } from '@reduxjs/toolkit'
import { getItem, setItem, removeItem } from "../../services/LocalStorage";

const localStorageKey = 'cart';
const items = getItem(localStorageKey) || [];
const couponCode = getItem('couponCode') || '';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items,
        couponCode,
    },
    reducers: {
        addCartItem: (state, action) => {
            const { id, qty } = action.payload;

            const itemFound = state.items.find((cartItem) => {
                return cartItem.id === id;
            });

            if (itemFound) {
                itemFound.qty += qty;
                setItem(localStorageKey, state.items);
                return;
            }

            const comicData = {id, qty};
            state.items.push(comicData);
            setItem(localStorageKey, state.items);
        },
        removeCartItem: (state, action) => {
            const { id } = action.payload;
            const newFilterItem = state.items.filter((obj) => obj.id !== id);
            setItem(localStorageKey, newFilterItem);
            state.items = newFilterItem;
        },
        clearCart: (state, action) => {
            state.items = [];
        },
        addCoupon: (state, action) => {
            const { coupon } = action.payload;
            setItem('couponCode', coupon || '');
        },
        removeCoupon: (state, action) => {
            removeItem('couponCode');
        }
    },
})

export const { addCartItem, removeCartItem, clearCart, addCoupon, removeCoupon } = cartSlice.actions

export default cartSlice.reducer