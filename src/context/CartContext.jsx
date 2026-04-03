import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../backend/firebase";
import {
  doc,
  setDoc,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });

  // 🔄 Derived cart count for navbar
  const cartCount = (cart?.items || []).reduce(
    (total, item) => total + item.quantity,
    0
  );

  // 🔄 REAL-TIME SYNC with Firestore
  useEffect(() => {
    if (!user) return;

    const cartRef = doc(db, "carts", user.uid);

    const unsubscribe = onSnapshot(cartRef, (docSnap) => {
      if (docSnap.exists()) {
        setCart(docSnap.data());
      } else {
        setCart({ items: [] });
      }
    });

    return () => unsubscribe();
  }, [user]);

  // ➕ ADD TO CART
  const addToCart = async (product) => {
    if (!user) return alert("Login first");

    const cartRef = doc(db, "carts", user.uid);
    const existingItem = cart.items.find(
      (item) => item.productId === product.id
    );
console.log("Product received:", product);
    let updatedItems;

    if (existingItem) {
      updatedItems = cart.items.map((item) =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedItems = [
        ...cart.items,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        }
      ];
    }

    await setDoc(
      cartRef,
      {
        customerId: user.uid,
        items: updatedItems,
        updatedAt: serverTimestamp()
      },
      { merge: true } // 🔹 ensures document exists / merges updates
    );
  };

  // ➖ REMOVE ITEM
  const removeFromCart = async (productId) => {
    if (!user) return;

    const cartRef = doc(db, "carts", user.uid);
    const updatedItems = cart.items.filter(
      (item) => item.productId !== productId
    );

    await setDoc(
      cartRef,
      { items: updatedItems, updatedAt: serverTimestamp() },
      { merge: true }
    );
  };

  // 🔄 UPDATE QUANTITY
  const updateQuantity = async (productId, quantity) => {
    if (!user) return;

    if (quantity < 1) return; // avoid negative/zero quantity

    const cartRef = doc(db, "carts", user.uid);
    const updatedItems = cart.items.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );

    await setDoc(
      cartRef,
      { items: updatedItems, updatedAt: serverTimestamp() },
      { merge: true }
    );
  };

  // 🧹 CLEAR CART
  const clearCart = async () => {
    if (!user) return;

    const cartRef = doc(db, "carts", user.uid);
    await setDoc(
      cartRef,
      { items: [], updatedAt: serverTimestamp() },
      { merge: true }
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}