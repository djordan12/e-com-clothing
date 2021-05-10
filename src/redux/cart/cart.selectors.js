// Reselect libary
// github.com/reduxjs/reselect

import { createSelector } from 'reselect';

const selectCart = state => state.cart;

// memoize selector
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accQuantity, cartItem) => 
            accQuantity + cartItem.quantity,
            0
        )
);