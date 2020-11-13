import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductListScreen from "./screens/ProductListScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

function App({history}) {

  console.log("history", history)
  return (
    <Router>
      <div className="app">
      <Header />
      <main className="py-3">
        <Container>
           <Route path="/login"  component={LoginScreen}/>
           <Route path="/admin/userlist"  component={UserListScreen}/>
           <Route path="/admin/orderlist"  component={OrderListScreen}/>
           <Route path="/admin/user/:id/edit"  component={UserEditScreen}/>
           <Route path="/admin/product/:id/edit"  component={ProductEditScreen}/>
           <Route path="/register"  component={RegisterScreen}/>
           <Route path="/profile"  component={ProfileScreen}/>
           <Route path="/shipping"  component={ShippingScreen}/>
           <Route path="/payment"  component={PaymentScreen}/>
           <Route path="/placeorder"  component={PlaceOrderScreen}/>
           <Route path="/order/:id"  component={OrderScreen}/>
           <Route path="/products/:id"  component={ProductScreen}/>
           <Route path="/admin/productList"  exact  component={ProductListScreen}/>
           <Route path="/admin/productList/:pageNumber" exact  component={ProductListScreen}/>
           <Route path="/cart/:id?"  component={CartScreen}/>
          <Route path="/search/:keyword" exact  component={HomeScreen}/>
          <Route path="/search/:keyword/page/:pageNumber"  component={HomeScreen}/>
          <Route path="/page/:pageNumber"  component={HomeScreen}/>
         
          <Route path="/" exact component={HomeScreen}/>
         
        </Container>
      </main>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
