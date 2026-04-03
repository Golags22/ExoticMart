// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, db } from "../backend/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 On auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const adminRef = doc(db, "admins", user.uid);
          const customerRef = doc(db, "customers", user.uid);

          const [adminDoc, customerDoc] = await Promise.all([
            getDoc(adminRef),
            getDoc(customerRef)
          ]);

          if (adminDoc.exists()) {
            setUserProfile({ ...adminDoc.data(), role: "admin" });
            await updateDoc(adminRef, { lastActive: serverTimestamp() });
          } else if (customerDoc.exists()) {
            setUserProfile({ ...customerDoc.data(), role: "customer" });
            await updateDoc(customerRef, { lastActive: serverTimestamp() });
          } else {
            setUserProfile(null); // No profile found
          }
        } catch (err) {
          console.error("Error fetching profile:", err);
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // 🔹 Customer signup (unchanged)
// src/context/AuthContext.jsx
// 🔹 Customer signup with comprehensive error handling
const signUp = async (email, password, userData) => {
  try {
    console.log("🚀 Starting signup process for:", email);
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("✅ User created:", user.uid);

    if (userData.fullName) {
      await updateProfile(user, { displayName: userData.fullName });
      console.log("✅ Profile updated");
    }

    const newProfile = {
      uid: user.uid,
      email: user.email,
      fullName: userData.fullName || "",
      role: "customer",
      createdAt: serverTimestamp(),
      lastActive: serverTimestamp(),
      phoneNumber: userData.phoneNumber || "",
      status: "active",
    };

    // Create customer doc
    await setDoc(doc(db, "customers", user.uid), newProfile);
    console.log("✅ Customer document created");
    setUserProfile(newProfile);
    
    // 🔔 Create notification for admin with error handling
    try {
      const notificationData = {
        type: "user",
        message: `New customer signed up: ${newProfile.fullName || newProfile.email}`,
        userId: user.uid,
        userEmail: user.email,
        read: false,
        priority: "high",
        createdAt: serverTimestamp(),
      };
      
      console.log("📝 Creating notification:", notificationData);
      const notificationRef = await addDoc(collection(db, "notifications"), notificationData);
      console.log("✅ Notification created with ID:", notificationRef.id);
    } catch (notificationError) {
      console.error("❌ Failed to create notification:", notificationError);
      console.error("Error details:", {
        code: notificationError.code,
        message: notificationError.message,
        stack: notificationError.stack
      });
      // Don't throw - user creation succeeded
    }
    
    toast.success("Customer account created successfully!");
    console.log("🎉 Signup completed successfully");
    
  } catch (error) {
    console.error("❌ Signup error:", error);
    toast.error(error.message);
    throw error;
  }
};

  // 🔹 FIXED login: check admins first, then customers
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const adminRef = doc(db, "admins", uid);
    const customerRef = doc(db, "customers", uid);

    const [adminDoc, customerDoc] = await Promise.all([
      getDoc(adminRef),
      getDoc(customerRef)
    ]);

    let profile = null;

    if (adminDoc.exists()) {
      profile = { ...adminDoc.data(), role: "admin" };
      await updateDoc(adminRef, { lastActive: serverTimestamp() });
    } else if (customerDoc.exists()) {
      profile = { ...customerDoc.data(), role: "customer" };
      await updateDoc(customerRef, { lastActive: serverTimestamp() });
    } else {
      throw new Error("User profile not found");
    }

    setUserProfile(profile);
    toast.success("Login successful!");
    return profile; // ✅ Return profile for AdminLogin role check
  };

  const logout = async () => {
    await signOut(auth);
    setUserProfile(null);
    toast.success("Logged out successfully");
  };

  if (loading) return <Loading />;

  return (
    <AuthContext.Provider value={{ user, userProfile, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};