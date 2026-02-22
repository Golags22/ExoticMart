// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../backend/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user, userProfile } = useAuth();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from user profile
  useEffect(() => {
    if (userProfile) {
      setCart(userProfile.cart || []);
      setWishlist(userProfile.wishlist || []);
    } else {
      setCart([]);
      setWishlist([]);
    }
    setLoading(false);
  }, [userProfile]);

  // Save cart to Firestore
  const saveCart = async (newCart) => {
    setCart(newCart);
    
    if (user) {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          cart: newCart
        });
      } catch (error) {
        console.error("Error saving cart:", error);
        toast.error("Error saving cart");
      }
    }
  };

  // Add to cart
  const addToCart = async (product, quantity = 1, options = {}) => {
    if (!user) {
      toast.warning("Please login to add items to your cart");
      return Promise.reject("LOGIN_REQUIRED");
    }

    try {
      const newCart = [...cart];
      const existingItem = newCart.find(item => 
        item.id === product.id && 
        JSON.stringify(item.options) === JSON.stringify(options)
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        newCart.push({ 
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          quantity, 
          options 
        });
      }

      await saveCart(newCart);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Error adding to cart");
      throw error;
    }
  };

  // Remove from cart
  const removeFromCart = async (productId, options = {}) => {
    if (!user) {
      toast.warning("Please login to manage your cart");
      return;
    }

    try {
      const newCart = cart.filter(item => 
        !(item.id === productId && JSON.stringify(item.options) === JSON.stringify(options))
      );
      await saveCart(newCart);
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Remove from cart error:", error);
      toast.error("Error removing item");
    }
  };

  // Update quantity
  const updateQuantity = async (productId, quantity, options = {}) => {
    if (!user) {
      toast.warning("Please login to update your cart");
      return;
    }

    if (quantity < 1) {
      removeFromCart(productId, options);
      return;
    }

    try {
      const newCart = cart.map(item =>
        item.id === productId && JSON.stringify(item.options) === JSON.stringify(options)
          ? { ...item, quantity }
          : item
      );
      await saveCart(newCart);
    } catch (error) {
      console.error("Update quantity error:", error);
      toast.error("Error updating quantity");
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (!user) return;
    
    try {
      await saveCart([]);
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Clear cart error:", error);
      toast.error("Error clearing cart");
    }
  };

  // Toggle wishlist
  const toggleWishlist = async (product) => {
    if (!user) {
      toast.warning("Please login to add items to your wishlist");
      return Promise.reject("LOGIN_REQUIRED");
    }

    try {
      const exists = wishlist.some(item => item.id === product.id);
      let newWishlist;
      
      if (exists) {
        newWishlist = wishlist.filter(item => item.id !== product.id);
        toast.success("Removed from wishlist");
      } else {
        newWishlist = [...wishlist, product];
        toast.success("Added to wishlist");
      }
      
      setWishlist(newWishlist);
      
      if (user) {
        await updateDoc(doc(db, "users", user.uid), {
          wishlist: newWishlist
        });
      }
    } catch (error) {
      console.error("Toggle wishlist error:", error);
      toast.error("Error updating wishlist");
      throw error;
    }
  };

  // Move to cart
  const moveToCart = async (productId, options = {}) => {
    if (!user) return;
    
    try {
      const item = wishlist.find(item => 
        item.id === productId && JSON.stringify(item.options) === JSON.stringify(options)
      );
      
      if (item) {
        await addToCart(item, 1, options);
        await toggleWishlist(item);
      }
    } catch (error) {
      console.error("Move to cart error:", error);
      toast.error("Error moving to cart");
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartTax = () => {
    return getCartSubtotal() * 0.1; // 10% tax
  };

  const getCartTotalWithTax = () => {
    return getCartSubtotal() + getCartTax();
  };

  const value = {
    cart,
    wishlist,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    moveToCart,
    isInWishlist,
    getCartTotal,
    getCartCount,
    getCartSubtotal,
    getCartTax,
    getCartTotalWithTax
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};