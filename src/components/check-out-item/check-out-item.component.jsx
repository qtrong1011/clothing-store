import './check-out-item.styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, decrementItem, removeItem } from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'

const CheckoutItem = ({cartItem}) =>{
    const {name, imageUrl, price, quantity} = cartItem
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()
    const removeItemHandler = () =>{
        dispatch(removeItem(cartItems,cartItem))
    }
    const addItemHandler = () =>{
        dispatch(addItemToCart(cartItems,cartItem))
    }
    const decrementItemHandler = () =>{
        dispatch(decrementItem(cartItems,cartItem))
    }
    return(
        <div className='checkout-item-container'>
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>

            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className="arrow" onClick={decrementItemHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className="arrow" onClick={addItemHandler}>&#10095;</div>
            </span>
            <div className="price">{price}</div>
            
            <div className='remove-button' onClick={removeItemHandler}>&#10005;</div>
        </div>
    )


}


export default CheckoutItem