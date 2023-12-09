import {CartDropDownContainer,EmptyMessage,CartItems} from './cart-dropdown.styles'
import { useSelector, useDispatch } from 'react-redux'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { useNavigate } from 'react-router-dom'
import { setIsCartOpen } from '../../store/cart/cart.action'
import { selectIsCartOpen, selectCartItems } from '../../store/cart/cart.selector'

const CartDropDown = () =>{
    // const {cartItems, isCartOpen, setIsCartOpen} = useContext(CartContext)
    const dispatch = useDispatch()
    const isCartOpen = useSelector(selectIsCartOpen)
    const cartItems = useSelector(selectCartItems)
    const navigate = useNavigate()
    const goToCheckoutHandler = () =>{
        //Turn off the dropdown menu
        dispatch(setIsCartOpen(!isCartOpen))
        navigate('/checkout')
    }
    return (
        <CartDropDownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map((cartItem)=>(<CartItem key={cartItem.id} cartItem={cartItem} />))): (<EmptyMessage>Your cart is empty</EmptyMessage>)
                }
                
            </CartItems>

            <Button onClick={goToCheckoutHandler} buttonType={BUTTON_TYPE_CLASSES.base}>CHECKOUT</Button>


        </CartDropDownContainer>
    )
}

export default CartDropDown