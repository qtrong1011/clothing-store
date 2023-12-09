import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { Fragment, useContext } from "react"
import {ReactComponent as Logo} from '../../../assets/crown.svg'
import {NavigationContainer, NavLinks, NavLink, LogoContainer} from './navigation.styles'
import { signOutUser } from "../../../utils/firebase/firebase.utils"
import CartIcon from "../../cart-icon/cart-icon.component"
import CartDropDown from "../../cart-dropdown/cart-dropdown.component"
import { selectCurrentUser } from "../../../store/user/user.selector"
import { selectIsCartOpen } from "../../../store/cart/cart.selector"


const Navigation = () =>{

  const currentUser = useSelector(selectCurrentUser)

  const isCartOpen = useSelector(selectIsCartOpen)


  
    return(

      <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'>
            <Logo className="logo" />
          </LogoContainer>
          
          <NavLinks>
            <NavLink to='/shop'>SHOP</NavLink>
            {
              currentUser ? (
                <NavLink as='span' className="nav-link" onClick={signOutUser}>SIGN OUT</NavLink>
              ) : (
                <NavLink to='/auth'>SIGN IN</NavLink>
              )
            }
            <CartIcon />
            
            
          </NavLinks>
          {isCartOpen && <CartDropDown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
  }


export default Navigation