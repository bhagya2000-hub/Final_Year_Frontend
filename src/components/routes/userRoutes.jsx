import React from 'react'
import ProductDetails from "../product/ProductDetails";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Profile from "../user/Profile";
import UpdateProfile from "../user/UpdateProfile";
import ProtectedRouter from "../auth/ProtectedRouter";
import UploadAvatar from "../user/UploadAvatar";
import UpdatePassword from "../user/UpdatePassword";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import Cart from "../cart/Cart";
import Shipping from "../cart/Shipping";
import ConfirmOrder from "../cart/ConfirmOrder";
import PaymentMethods from "../cart/PaymentMethods";
import MyOrder from "../order/MyOrder";
import OrderDetails from "../order/OrderDetails";
import Invoice from "../invoice/Invoice";
import Home from "../Home";
import { Route} from "react-router-dom"

function userRoutes() {
  return (
    <>
    <Route path="/" element={ <Home/>}/>
    
         <Route path="/product/:id" element={ <ProductDetails/>}/>
         <Route path="/login" element={ <Login/>}/>
         <Route path="/register" element={ <Register/>}/>
         <Route path="/password/reset/:token" element={ <ResetPassword/>}/>
         <Route path="/me/profile" element={ 
          <ProtectedRouter>
             <Profile/>
          </ProtectedRouter>
          
          
          }/>
         <Route path="/me/update_profile" element={ <ProtectedRouter><UpdateProfile/> </ProtectedRouter>}/>
         <Route path="/me/update_Avatar" element={ <ProtectedRouter><UploadAvatar/> </ProtectedRouter>}/>
         <Route path="/me/update_password" element={ <ProtectedRouter><UpdatePassword/> </ProtectedRouter>}/>
         <Route path="/password/forgot" element={ <ForgotPassword/>}/>
         <Route path="/cart" element={ <Cart/>}/>
         <Route path="/shipping" element={ <ProtectedRouter><Shipping/> </ProtectedRouter>}/>
         <Route path="/confirm_order" element={ <ProtectedRouter><ConfirmOrder/> </ProtectedRouter>}/>
         <Route path="/payment_methods" element={ <ProtectedRouter><PaymentMethods/> </ProtectedRouter>}/>
         <Route path="/me/orders" element={ <ProtectedRouter><MyOrder/> </ProtectedRouter>}/>
         <Route path="/me/orders/:id" element={ <ProtectedRouter><OrderDetails/> </ProtectedRouter>}/>
         <Route path="/invoice/orders/:id" element={ <ProtectedRouter><Invoice/> </ProtectedRouter>}/>

    </>
  )
}

export default userRoutes
