// src/context/AuthContext.jsx (fixed version)
import React, { createContext, useState, useContext, useEffect } from "react";
import { 
  auth, 
  db 
} from "../backend/firebase";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed:", user?.email);
      setUser(user);
      
      if (user) {
        try {
          // Get or create user profile
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);
          
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          } else {
            // Create new user profile
            const newProfile = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || "",
              role: "customer",
              createdAt: serverTimestamp(),
              lastActive: serverTimestamp(),
              cart: [],
              wishlist: [],
              orders: [],
              addresses: [],
              phone: "",
              newsletter: false
            };
            await setDoc(userRef, newProfile);
            setUserProfile(newProfile);
          }
        } catch (error) {
          console.error("Error with user profile:", error);
          toast.error("Error loading profile");
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
      setInitialized(true);
    });

    return unsubscribe;
  }, []);

  // UPDATED SIGNUP FUNCTION (keep this one, remove the other)
  const signUp = async (email, password, userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile with display name
      if (userData.displayName) {
        await updateProfile(user, { displayName: userData.displayName });
      }

      // Set default role as customer unless specified
      const role = userData.role || "customer";

      // Create user profile in Firestore
      const newProfile = {
        uid: user.uid,
        email: user.email,
        displayName: userData.displayName || "",
        role: role,
        createdAt: serverTimestamp(),
        lastActive: serverTimestamp(),
        cart: [],
        wishlist: [],
        orders: [],
        addresses: userData.address ? [userData.address] : [],
        phone: userData.phone || "",
        newsletter: userData.newsletter || false
      };

      await setDoc(doc(db, "users", user.uid), newProfile);
      setUserProfile(newProfile);
      
      toast.success("Account created successfully!");
      return { ...user, role };
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message);
      throw error;
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Update last active
      if (userCredential.user) {
        await updateDoc(doc(db, "users", userCredential.user.uid), {
          lastActive: serverTimestamp()
        });
      }
      
      toast.success("Login successful!");
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.message);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error(error.message);
      throw error;
    }
  };

  // Update profile
  const updateUserProfile = async (data) => {
    if (!user) throw new Error("No user logged in");
    
    try {
      // Update Firebase Auth profile
      if (data.displayName) {
        await updateProfile(user, { displayName: data.displayName });
      }
      
      // Update Firestore
      await updateDoc(doc(db, "users", user.uid), {
        ...data,
        updatedAt: serverTimestamp()
      });
      
      setUserProfile(prev => ({ ...prev, ...data }));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error(error.message);
      throw error;
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    if (!user) throw new Error("No user logged in");
    
    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Change password
      await updatePassword(user, newPassword);
      toast.success("Password changed successfully");
    } catch (error) {
      console.error("Change password error:", error);
      toast.error(error.message);
      throw error;
    }
  };

  // Add address
  const addAddress = async (address) => {
    if (!user) throw new Error("No user logged in");
    
    try {
      const addresses = [...(userProfile?.addresses || []), address];
      await updateDoc(doc(db, "users", user.uid), { addresses });
      setUserProfile(prev => ({ ...prev, addresses }));
      toast.success("Address added successfully");
    } catch (error) {
      console.error("Add address error:", error);
      toast.error(error.message);
      throw error;
    }
  };

  // Remove address
  const removeAddress = async (index) => {
    if (!user) throw new Error("No user logged in");
    
    try {
      const addresses = userProfile?.addresses.filter((_, i) => i !== index) || [];
      await updateDoc(doc(db, "users", user.uid), { addresses });
      setUserProfile(prev => ({ ...prev, addresses }));
      toast.success("Address removed");
    } catch (error) {
      console.error("Remove address error:", error);
      toast.error(error.message);
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    initialized,
    signUp,
    login,
    logout,
    resetPassword,
    updateUserProfile,
    changePassword,
    addAddress,
    removeAddress,
    isAuthenticated: !!user
  };
  

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};