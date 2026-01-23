import React from "react";
import HomePage from "../Customers/Compontents/Pages/HomePage//HomePage"
import  { Routes,Route } from "react-router-dom";
import Cart from "../Customers/Compontents/Cart/Cart"
import Navigation from "../Customers/Compontents/Navigation/Navigation";
import Footer from "../Customers/Compontents/Footer/Footer";
import Product from "../Customers/Compontents/Product/Product";
import ProductDetails from "../Customers/Compontents/ProductDetails/ProductDetails";
import Checkout from "../Customers/Compontents/Checkout/Checkout";
import Order from "../Customers/Compontents/Order/Order";
import OrderDetail from "../Customers/Compontents/Order/OrderDetail"
import ProductSearchPage from "../Customers/Compontents/ProductSearchPage/ProductSearchPage";
import PaymentSuccess from "../Customers/Compontents/Payment/PaymentSuccess";
const CustomerRoutes = () => {
  return (
    <div>
      <div><Navigation/></div>
      <Routes>
          <Route path='/login' element={<HomePage/>}></Route>  
          <Route path='/register' element={<HomePage/>}></Route>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/:levelOne/:levelTwo/:levelThree' element={<Product/>}></Route>
          <Route path='/product/:productId' element={<ProductDetails/>}></Route>
          <Route path='/checkout' element={<Checkout/>}></Route>
           <Route path='/account/order' element={<Order/>}></Route>
           <Route path='/account/order/:orderId' element={<OrderDetail/>}></Route>
           <Route path="/products" element={<ProductSearchPage/>}></Route>
            <Route path='/payment/:orderId' element={<PaymentSuccess/>}></Route>

      </Routes>
      <div><Footer/></div>
    </div>
  );
};

export default CustomerRoutes;
