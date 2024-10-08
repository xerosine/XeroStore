import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./redux/store";

//auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

//private routes
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/User/Profile";
import Shipping from "./pages/Order/Shipping";
import PlaceOrder from "./pages/Order/PlaceOrder";
import Order from "./pages/Order/Order";

//admin routes
import AdminRoute from "./pages/Admin/AdminRoute";
import UserList from "./pages/Admin/UserList";
import CategoryList from "./pages/Admin/CategoryList";
import ProductCreate from "./pages/Admin/ProductCreate";
import ProductUpdate from "./pages/Admin/ProductUpdate";
import AllProducts from "./pages/Admin/AllProducts";
import OrderList from "./pages/Admin/OrderList";

//regular routes
import ProductDetails from "./pages/Product/ProductDetails";
import Home from "./pages/Home";
import Favorites from "./pages/Product/Favorites";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import UserOrders from "./pages/User/UserOrders";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route index element={<Home />}></Route>
      <Route path="favorites" element={<Favorites />}></Route>
      <Route path="cart" element={<Cart />}></Route>
      <Route path="shop" element={<Shop />}></Route>
      <Route path="product/:id" element={<ProductDetails />}></Route>
      <Route path="user-orders" element={<UserOrders />}></Route>

      <Route path="" element={<PrivateRoute />}>
        <Route path="profile" element={<Profile />}></Route>
        <Route path="shipping" element={<Shipping />}></Route>
        <Route path="placeorder" element={<PlaceOrder />}></Route>
        <Route path="order/:id" element={<Order />}></Route>
      </Route>

      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />}></Route>
        <Route path="categorylist" element={<CategoryList />}></Route>
        <Route path="productlist" element={<AllProducts />}></Route>
        <Route path="orderlist" element={<OrderList />}></Route>
        <Route path="product/create" element={<ProductCreate />}></Route>
        <Route path="product/update/:id" element={<ProductUpdate />}></Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PayPalScriptProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PayPalScriptProvider>
  </React.StrictMode>
);
