import {CartIconContainer,ShoppingIcon,ItemCount} from'./cart-icon.styles'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsCartOpen,selectCartCount } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'

const CartIcon = () => {
    const isCartOpen = useSelector(selectIsCartOpen)
    const dispatch = useDispatch()
    const cartCount = useSelector(selectCartCount)
    const handleCartClick = () =>{
        dispatch(setIsCartOpen(!isCartOpen))
    }
    
    return(
        <CartIconContainer onClick={handleCartClick}>
            <ShoppingIcon  />
            <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon