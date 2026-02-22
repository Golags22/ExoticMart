import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../backend/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowLeft, ShoppingBag } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Reference to user document
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) throw new Error("No user record found.");

      // Update lastActive timestamp
      await updateDoc(userDocRef, { lastActive: serverTimestamp() });

      // Show success toast
      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Get role and redirect - updated for e-commerce
      const role = userDoc.data().role;

      // Small delay for toast to show
      setTimeout(() => {
        switch (role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "vendor":
            navigate("/vendor/dashboard");
            break;
          case "customer":
          default:
            navigate("/");
        }
      }, 1500);

    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
      <ToastContainer />
      
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row relative">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
          aria-label="Go back"
        >
          <ArrowLeft size={20} className="text-red-600" />
        </button>

        {/* Left Column - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10 order-2 md:order-1">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
            <p className="text-gray-600">Sign in to your Exotic Mart account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition bg-gray-50 focus:bg-white"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link 
                to="/forgot-password" 
                className="text-sm text-red-600 hover:text-red-700 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            New to Exotic Mart?{" "}
            <Link to="/users/signup" className="text-red-600 font-medium hover:text-red-700 hover:underline">
              Create an account
            </Link>
          </p>

          {/* Demo Credentials (Optional - remove in production) */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
              <ShoppingBag size={12} /> Demo Customer Account:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-gray-600">Email: customer@exoticmart.com</div>
              <div className="text-gray-600">Password: Customer123!</div>
            </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-red-600 to-red-500 hidden md:flex items-center justify-center p-12 relative overflow-hidden order-1 md:order-2">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative text-center text-white z-10">
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Exotic Mart Shopping" 
              className="rounded-2xl shadow-2xl mb-8 mx-auto w-full h-64 object-cover border-4 border-white/20"
            />
            <h2 className="text-2xl font-bold mb-4">Welcome to Exotic Mart</h2>
            <p className="text-red-100 max-w-md mx-auto">
              Your destination for premium beauty, fashion, and lifestyle essentials.
            </p>
            
            {/* Benefits list for online shop */}
            <div className="mt-8 space-y-3 text-left bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">✓</div>
                <span>Track your orders in real-time</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">✓</div>
                <span>Save items to your wishlist</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">✓</div>
                <span>Fast checkout with saved addresses</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">✓</div>
                <span>Exclusive member discounts & offers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}