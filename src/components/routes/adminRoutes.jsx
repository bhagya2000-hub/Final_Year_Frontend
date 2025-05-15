import React from 'react'
import { Route} from "react-router-dom";
import ProtectedRouter from "../auth/ProtectedRouter";
import Dashboard from '../admin/Dashboard';
import ListProducts from '../admin/ListProduct';
import NewProduct from '../admin/NewProduct';
import UpdateProduct from '../admin/UpdateProduct';
import UploadImages from '../admin/UploadImages';
import ListOrders from '../admin/ListOrders';
import ProcessOrder from '../admin/ProcessOrder';
import ListUsers from '../admin/ListUsers';
import UpdateUser from '../admin/UpdateUser';

function adminRoutes() {
  return (
    <>
     <Route path="/admin/dashboard" element={ 
        <ProtectedRouter admin={true}>
        <Dashboard/> 
        </ProtectedRouter>}/>

        <Route path="/admin/products" element={ 
        <ProtectedRouter admin={true}>
        <ListProducts/> 
        </ProtectedRouter>}/>

        <Route path="/admin/product/new" element={ 
        <ProtectedRouter admin={true}>
        <NewProduct/> 
        </ProtectedRouter>}/>

        <Route path="/admin/product/:id" element={ 
        <ProtectedRouter admin={true}>
        <UpdateProduct/> 
        </ProtectedRouter>}/>

        <Route path="/admin/products/:id/upload_images" element={ 
        <ProtectedRouter admin={true}>
        <UploadImages/> 
        </ProtectedRouter>}/>

        <Route path="/admin/orders" element={ 
        <ProtectedRouter admin={true}>
        <ListOrders/> 
        </ProtectedRouter>}/>

        <Route path="/admin/orders/:id" element={ 
        <ProtectedRouter admin={true}>
        <ProcessOrder/> 
        </ProtectedRouter>}/>

        <Route path="/admin/users" element={ 
        <ProtectedRouter admin={true}>
        <ListUsers/> 
        </ProtectedRouter>}/>

        <Route path="/admin/users/:id" element={ 
        <ProtectedRouter admin={true}>
        <UpdateUser/> 
        </ProtectedRouter>}/>
    </>

)
}

export default adminRoutes
