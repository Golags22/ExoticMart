import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useOrder } from "../../hooks/useOrder";
import ShippingAddress from "./ShippingAddress";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";
import { ArrowLeft, CheckCircle, Package, Truck, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
  const { cart } = useCart();
  const { user } = useAuth();
  const { createOrder, loading } = useOrder();
// const { createOrder } = useOrder();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState(null);
  
  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  const handleCheckout = async () => {
    if (!selectedAddress) {
      alert("Please select or add an address");
      return;
    }
    
    const createdOrderId = await createOrder(selectedAddress);
    if (createdOrderId) {
      setOrderId(createdOrderId);
      setStep(2);
    }
  };

  // If cart is empty
  if (!cart.items.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-white rounded-full p-6 inline-block mb-6 shadow-lg">
            <Package className="text-red-400" size={64} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some items to your cart before checking out</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white to-red-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                Checkout
              </h1>
              <p className="text-gray-500 mt-1">
                {step === 1 ? "Complete your shipping information" : "Secure payment"}
              </p>
            </div>
            {step === 1 && (
              <Link
                to="/cart"
                className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
              >
                <ArrowLeft size={20} />
                Back to Cart
              </Link>
            )}
          </div>

          {/* Progress Steps */}
          <div className="mt-6 flex items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm
                ${step >= 1 ? "bg-gradient-to-r from-red-500 to-red-600 text-white" : "bg-gray-200 text-gray-500"}
              `}>
                {step > 1 ? <CheckCircle size={16} /> : 1}
              </div>
              <span className={`text-sm ${step >= 1 ? "text-red-600 font-medium" : "text-gray-400"}`}>
                Shipping
              </span>
            </div>
            <div className={`flex-1 h-0.5 max-w-16 ${step >= 2 ? "bg-red-500" : "bg-gray-200"}`} />
            <div className="flex items-center gap-2">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm
                ${step >= 2 ? "bg-gradient-to-r from-red-500 to-red-600 text-white" : "bg-gray-200 text-gray-500"}
              `}>
                {step > 2 ? <CheckCircle size={16} /> : 2}
              </div>
              <span className={`text-sm ${step >= 2 ? "text-red-600 font-medium" : "text-gray-400"}`}>
                Payment
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form Steps */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address Step */}
            {step === 1 && (
              <div className="animate-fadeIn">
                <ShippingAddress 
                  user={user} 
                  selectedAddress={selectedAddress} 
                  setSelectedAddress={setSelectedAddress} 
                />
              </div>
            )}
            
            {/* Payment Method Step */}
            {step === 2 && (
              <div className="animate-fadeIn">
                <PaymentMethod 
                  orderId={orderId} 
                  totalAmount={total} 
                />
              </div>
            )}

            {/* Trust Badges */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <Shield className="text-green-500" size={18} />
                  <span className="text-xs text-gray-600">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="text-red-500" size={18} />
                  <span className="text-xs text-gray-600">Free Shipping Over $50</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={18} />
                  <span className="text-xs text-gray-600">30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
          
            <OrderSummary
  cart={cart}
  subtotal={subtotal}
  tax={tax}
  shipping={shipping}
  total={total}
  loading={loading}
  selectedAddress={selectedAddress}
  createOrder={createOrder}
  step={step}
/>
          </div>
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}