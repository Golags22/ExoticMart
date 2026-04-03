import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User, Mail, Lock, Eye, EyeOff, CheckCircle, ArrowLeft, Phone } from "lucide-react";
import { useCustomerSignup } from "../../hooks/useCustomerSignup";

export default function Signup() {
  const navigate = useNavigate();
  const {
    formData,
    handleChange,
    handleSignup,
    loading,
    passwordStrength,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    getPasswordStrengthColor,
    getPasswordStrengthText
  } = useCustomerSignup("customer");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSignup();
      toast.success("Customer account created!");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }  
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <button onClick={() => navigate('/')} className="absolute top-4 left-4 z-10 text-red-600"><ArrowLeft /></button>
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Create Customer Account</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full pl-10 py-3 border rounded-lg" />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full pl-10 py-3 border rounded-lg" />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input name="phoneNumber" type="tel" placeholder="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full pl-10 py-3 border rounded-lg" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 py-3 border rounded-lg"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
          </div>
          {formData.password && (
            <div className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Password Strength</span>
                <span className={passwordStrength <= 2 ? "text-red-500" : passwordStrength <= 3 ? "text-yellow-500" : "text-green-500"}>{getPasswordStrengthText()}</span>
              </div>
              <div className="w-full bg-gray-200 h-1.5 rounded-full">
                <div className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`} style={{ width: `${(passwordStrength / 5) * 100}%` }}></div>
              </div>
            </div>
          )}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 py-3 border rounded-lg"
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">{showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-3 rounded-lg flex justify-center items-center gap-2">
            {loading ? "Creating..." : <><CheckCircle size={18}/> Create Account</>}
          </button>
        </form>
      </div>
    </div>
  );
}