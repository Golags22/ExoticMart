import { useState } from "react";
import { db } from "../backend/firebase";
import { collection, addDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export const useOrder = () => {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOrder = async (shippingAddress) => {
    if (!user) {
      alert("Login first");
      return null;
    }

    if (!cart.items.length) {
      alert("Cart is empty");
      return null;
    }

    setLoading(true);

    try {
      const totalAmount = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const orderRef = await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cart.items,
        totalAmount,
        status: "PENDING",
        paymentStatus: "UNPAID",
        shippingAddress,
        createdAt: serverTimestamp()
      });

      return orderRef.id;

    } catch (err) {
      console.error(err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const markOrderPaid = async (orderId) => {
    const orderRef = doc(db, "orders", orderId);

    await setDoc(orderRef, {
      paymentStatus: "PAID",
      status: "PAID",
      paidAt: serverTimestamp()
    }, { merge: true });

    await clearCart();
  };

  return {
    createOrder,
    markOrderPaid,
    loading,
    error
  };
};