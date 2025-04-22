import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PolicyPage from "./pages/PolicyPage";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { SnackbarProvider } from "notistack";
import Dashboard from "./pages/user/UserDashboard";
import Private from "./components/routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import Admin from "./components/routes/Admin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import DashboardPage from "./pages/Admin/DashboardPage";
import UserPage from "./pages/Admin/UserPage";
import CatagoryPage from "./pages/Admin/CatagoryPage";
import ProductPage from "./pages/Admin/ProductPage";
import OrderPage from "./pages/user/OrderPage";
import UserDashboard from "./pages/user/UserDashboard";
import UserSection from "./pages/user/UserSection.";
import ProfilePage from "./pages/user/ProfilePage";
import ProductDetail from "./components/ProductDetail";
import ByCatagories from "./pages/Home/Catagories/ByCatagories";
import CartPage from "./pages/CartPage";
// import Checkout from "./pages/CheckoutPage";
import  {Elements}  from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from "./components/layout/OrderSuccess";
import CheckoutPage from "./pages/CheckoutPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import AnalyticPage from "./pages/Admin/AnalyticPage";
import ShippingDetailsPage from "./pages/ShippingDetailsPage";
import MessagePage from "./pages/Admin/MessagePage";
// import CatagoryById from "./pages/Home/Catagories/CatagoryById";


const stripePromise=loadStripe(import.meta.env.VITE_APP_PUBLISHABLE_KEY);
function App() {
  return (
    <>
      <SnackbarProvider>
        <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductDetail/>}/>
          <Route path="/categories/:slug" element={<ByCatagories/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/checkout" element={<CheckoutPage/>}/>
          <Route path="/order-success" element={<OrderSuccess/>}/>
          <Route path="/shipping-info" element={<ShippingDetailsPage />} />

          <Route path="/dashboard" element={<Private/>}>
            <Route path="user" element={<UserDashboard />}>
            <Route index element={<UserSection/>}/>
            <Route path="orders" element={<OrderPage/>}/>
            <Route path="profile" element={<ProfilePage/>}/>
            </Route>
          </Route>

          <Route path="/dashboard" element={<Admin />}>
            <Route path="admin" element={<AdminDashboard />}>
              <Route index element={<DashboardPage />} />
              <Route path="create-catagory" element={<CatagoryPage />} />
              <Route path="products" element={<ProductPage />} />
              <Route path="users" element={<UserPage />} />
              <Route path="orders-admin" element={<AdminOrders/>}/>
              <Route path="analytics" element={<AnalyticPage/>}/>
              <Route path="messages" element={<MessagePage/>}/>
            </Route>
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* <Route path="/category/:slug" element={<CatagoryById />} /> */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        </Elements>
      </SnackbarProvider>
    </>
  );
}

export default App;

