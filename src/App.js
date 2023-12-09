import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanedListener,createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import Home from "./components/routes/home/home.component";
import Navigation from "./components/routes/navigation/navigation.component";
import Authentication from "./components/routes/authentication/authentication.component";
import {Routes,Route} from 'react-router-dom'
import Shop from "./components/routes/shop/shop.component";
import Checkout from "./components/routes/check-out/check-out.component";
import { setCurrentUser } from "./store/user/user.action";


const App = () => {
  const dispatch = useDispatch();
  //TRACKING AUTHORIZATION STATE (SIGNIN/SIGNOUT/SIGNUP)
  useEffect(()=>{
    const unsubcribe = onAuthStateChanedListener((user)=>{
        // console.log(user)
        if(user){
            createUserDocumentFromAuth(user)
        }
        dispatch(setCurrentUser(user))
    })
    return unsubcribe
  },[])
  return(
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="" element={<Home />}/>
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />}></Route>
      </Route>
    </Routes>
    
  )

};

export default App;
