import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { AppRouter } from "./routes";


export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <ToastContainer position="top-right" autoClose={3000} />
          <AppRouter />
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}