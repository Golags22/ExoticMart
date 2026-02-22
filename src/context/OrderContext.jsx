// src/context/OrderContext.jsx
import React, { createContext, useState, useContext, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import { db } from "../backend/firebase";
import { collection, addDoc, getDocs, query, where, orderBy, doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get user orders
  const getUserOrders = useCallback(async () => {
    if (!user) return [];

    setLoading(true);
    setError(null);
    
    try {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      const userOrders = [];
      querySnapshot.forEach((doc) => {
        userOrders.push({ id: doc.id, ...doc.data() });
      });
      
      setOrders(userOrders);
      return userOrders;
    } catch (error) {
      console.error("Get orders error:", error);
      setError(error.message);
      toast.error("Error loading orders");
      return [];
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Place order
  const placeOrder = async (items, total, shippingAddress, paymentMethod) => {
    if (!user) {
      toast.warning("Please login to place order");
      return Promise.reject("LOGIN_REQUIRED");
    }

    setLoading(true);
    setError(null);
    
    try {
      // Calculate totals
      const subtotal = total || items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.1;
      const shipping = subtotal > 50 ? 0 : 5.99;
      const grandTotal = subtotal + tax + shipping;

      const orderData = {
        userId: user.uid,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          brand: item.brand,
          options: item.options || {}
        })),
        subtotal,
        tax,
        shipping,
        total: grandTotal,
        shippingAddress,
        paymentMethod,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        trackingNumber: null,
        carrier: null,
        estimatedDelivery: null
      };

      // Add order to Firestore
      const docRef = await addDoc(collection(db, "orders"), orderData);
      
      // Update user's orders array in Firestore
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const updatedOrders = [...(userData.orders || []), { id: docRef.id, ...orderData }];
        await updateDoc(userRef, { orders: updatedOrders });
      }

      // Update local state
      setOrders(prev => [{ id: docRef.id, ...orderData }, ...prev]);

      toast.success("Order placed successfully!");
      return { id: docRef.id, ...orderData };
    } catch (error) {
      console.error("Place order error:", error);
      setError(error.message);
      toast.error("Error placing order");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Reorder function - add all items from previous order to cart
  const reorder = async (order) => {
    if (!user) {
      toast.warning("Please login to reorder");
      return Promise.reject("LOGIN_REQUIRED");
    }

    setLoading(true);
    
    try {
      // Add each item from the order to cart
      for (const item of order.items) {
        await addToCart(
          { 
            id: item.id, 
            name: item.name, 
            price: item.price, 
            image: item.image,
            brand: item.brand 
          }, 
          item.quantity, 
          item.options || {}
        );
      }
      
      toast.success("Items added to your cart!");
      return true;
    } catch (error) {
      console.error("Reorder error:", error);
      toast.error("Failed to add items to cart");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get order by ID
  const getOrderById = async (orderId) => {
    try {
      const orderDoc = await getDoc(doc(db, "orders", orderId));
      if (orderDoc.exists()) {
        return { id: orderDoc.id, ...orderDoc.data() };
      }
      toast.error("Order not found");
      return null;
    } catch (error) {
      console.error("Get order error:", error);
      toast.error("Error loading order");
      return null;
    }
  };

  // Cancel order (if still pending)
  const cancelOrder = async (orderId) => {
    if (!user) {
      toast.warning("Please login to cancel order");
      return Promise.reject("LOGIN_REQUIRED");
    }

    try {
      const orderRef = doc(db, "orders", orderId);
      const orderDoc = await getDoc(orderRef);
      
      if (!orderDoc.exists()) {
        toast.error("Order not found");
        return false;
      }

      const orderData = orderDoc.data();
      
      // Only allow cancellation of pending orders
      if (orderData.status !== "pending") {
        toast.error("Only pending orders can be cancelled");
        return false;
      }

      await updateDoc(orderRef, {
        status: "cancelled",
        updatedAt: new Date().toISOString()
      });

      // Update local state
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId 
            ? { ...order, status: "cancelled" } 
            : order
        )
      );

      toast.success("Order cancelled successfully");
      return true;
    } catch (error) {
      console.error("Cancel order error:", error);
      toast.error("Error cancelling order");
      throw error;
    }
  };

  // Clear error
  const clearError = () => setError(null);

  const value = {
    orders,
    loading,
    error,
    placeOrder,
    getUserOrders,
    getOrderById,
    reorder,
    cancelOrder,
    clearError
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};