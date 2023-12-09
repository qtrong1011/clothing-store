import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) =>{
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === productToAdd.id)

    //If found, increment quantity and return new array with modified cart item
    if(existingCartItem){
        return cartItems.map((cartItem)=> cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
    }
    //Return new array with new cart item
    return [...cartItems, {...productToAdd, quantity: 1}]
}
const decrementQuantity = (cartItems, productToDecrement) =>{
    //find if cartItems contains productToDecrement
    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === productToDecrement.id)

    //if the quantity equals 1, then delete the item
    if(existingCartItem.quantity === 1){
        //delete item from the cart
        return cartItems.filter((item) => item.id !== productToDecrement.id)
    }else {
        //decrement items by 1
        return cartItems.map((cartItem)=> cartItem.id === productToDecrement.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem)
    }
}

const deleteItem = (cartItems, productToRemove) =>{
        return cartItems.filter((item) => item.id !== productToRemove.id)
}





export const setIsCartOpen = (bool) => {
    return{type:CART_ACTION_TYPES.SET_CART_IS_OPEN,payload: bool}
}




export const addItemToCart = (cartItems,productToAdd) =>{
    const newCartItems = addCartItem(cartItems,productToAdd)
    return {type: CART_ACTION_TYPES.SET_CART_ITEMS,payload:newCartItems}
}
export const decrementItem = (cartItems,productToDecrement) =>{
    const newCartItems = decrementQuantity(cartItems,productToDecrement)
    return {type: CART_ACTION_TYPES.SET_CART_ITEMS,payload:newCartItems}

}
export const removeItem = (cartItems,productToRemove) =>{
    const newCartItems = deleteItem(cartItems,productToRemove)
    return {type: CART_ACTION_TYPES.SET_CART_ITEMS,payload:newCartItems}
}

