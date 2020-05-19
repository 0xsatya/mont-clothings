import {createSelector} from 'reselect';

 const selectCart = state => state.cart;


 export const selectCartItems = createSelector(
     [selectCart],
     (cart) => cart.cartItems
 );


 export const selectCartItemsCount = createSelector(
     [selectCartItems],
     cartItems => cartItems.reduce(
         (accumulatedVal, currentItem) => 
     accumulatedVal + currentItem.quantity,
    0)
 )