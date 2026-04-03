import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Shop from "../components/sections/shop/Shop";
import Cart from "../pages/cart/Cart";
import NotFound from "../pages/NotFound";

import Categories from "../pages/Categories";
import About from "./../pages/About";
import Contact from "../pages/Contact";
import Checkout from "../pages/checkout/Checkout";
import OrderConfirmation from "./../pages/checkout/OrderConfirmation";
import {
  ProductList,
  ProductDetails,
} from "../components/products";
import CheckoutPage from "../components/checkout/CheckoutPage";
import Profile from "./../account/customer/profile";
import Orders from "../account/customer/Orders";
import Cosmetics from "../components/sections/shop/cosmetics/Cosmetics";
import Jewelry from "../components/sections/shop/Jewelry";
import Clothing from "../components/sections/shop/clothing/Clothing";
import Hair from "../components/sections/shop/hair/Hair";

const CustomerRoutes = (
  <Route element={<MainLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/products" element={<ProductList />} />
    <Route path="/product/:id" element={<ProductDetails />} />
    <Route path="/cart" element={<Cart />} />

    <Route path="/cosmetics" element={<Cosmetics />} />
    <Route path="/jeweries" element={<Jewelry />} />
    <Route path="/clothing" element={<Clothing />} />
    <Route path="/hair" element={<Hair />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/checkouts" element={<Checkout />} />
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />

    {/* customer Route for there account */}
    <Route path="/account/profile" element={<Profile />} />
    <Route path="/account/orders" element={<Orders />} />
    <Route path="*" element={<NotFound />} />
  </Route>
);

export default CustomerRoutes;
