import { useState } from "react";
import { 
  ArrowLeft, 
  CheckCircle, 
  Truck, 
  CreditCard, 
  MapPin,
  Package,
  DollarSign,
  Shield,
  Clock,
  Printer
} from "lucide-react";

const ReviewStep = ({ shippingData, billingData, paymentData, cart, onBack, onSubmit }) => {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  // Calculate totals
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const discount = 0; // Add discount logic if needed
  const total = subtotal + tax + shipping - discount;

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderData = {
        shippingData,
        billingData,
        paymentData,
        cart,
        subtotal,
        tax,
        shipping,
        discount,
        total,
        orderDate: new Date().toISOString(),
        orderStatus: "pending"
      };
      
      console.log("Order placed:", orderData);
      alert("Order placed successfully!");
      
      if (onSubmit) {
        onSubmit(orderData);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Order</h2>
        <p className="text-gray-500">Please verify your information before placing the order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex items-center gap-2">
                <Truck className="text-red-500" size={20} />
                <h3 className="font-semibold text-gray-900">Shipping Information</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                <p className="font-medium text-gray-900">{shippingData.fullName}</p>
                <p className="text-gray-600">{shippingData.address}</p>
                <p className="text-gray-600">{shippingData.city}, {shippingData.postalCode}</p>
                {shippingData.phone && (
                  <p className="text-gray-600">{shippingData.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Billing Information */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex items-center gap-2">
                <MapPin className="text-red-500" size={20} />
                <h3 className="font-semibold text-gray-900">Billing Information</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                <p className="font-medium text-gray-900">{billingData.fullName}</p>
                <p className="text-gray-600">{billingData.address}</p>
                <p className="text-gray-600">{billingData.city}, {billingData.postalCode}</p>
                {billingData.phone && (
                  <p className="text-gray-600">{billingData.phone}</p>
                )}
              </div>
              {shippingData.address === billingData.address && 
               shippingData.city === billingData.city && (
                <div className="mt-3 flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                  <CheckCircle size={16} />
                  <span>Same as shipping address</span>
                </div>
              )}
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex items-center gap-2">
                <CreditCard className="text-red-500" size={20} />
                <h3 className="font-semibold text-gray-900">Payment Information</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-gray-600">Card ending in <span className="font-mono font-bold">****{paymentData.cardNumber?.slice(-4)}</span></p>
                  <p className="text-sm text-gray-500">Expires {paymentData.expiry}</p>
                </div>
                <Shield className="text-green-500" size={24} />
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex items-center gap-2">
                <Package className="text-red-500" size={20} />
                <h3 className="font-semibold text-gray-900">Order Items ({cart.length})</h3>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {cart.map((item, index) => (
                <div key={index} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary - Right Side */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                <h3 className="text-white font-semibold text-lg">Order Summary</h3>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-red-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Estimated Delivery */}
                <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-3">
                  <Clock className="text-blue-500 flex-shrink-0" size={18} />
                  <div className="text-xs text-gray-600">
                    <p className="font-medium mb-1">Estimated Delivery</p>
                    <p>{new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder}
                    className="
                      w-full
                      flex items-center justify-center gap-2
                      px-6 py-3
                      bg-gradient-to-r from-red-500 to-red-600
                      text-white font-medium
                      rounded-lg
                      hover:from-red-600 hover:to-red-700
                      transform hover:scale-105
                      transition-all duration-200
                      shadow-lg shadow-red-200
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                    "
                  >
                    {isPlacingOrder ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle size={20} />
                        Place Order
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={onBack}
                    disabled={isPlacingOrder}
                    className="
                      w-full
                      flex items-center justify-center gap-2
                      px-6 py-3
                      border border-gray-300
                      rounded-lg
                      text-gray-700 font-medium
                      hover:bg-gray-50 hover:border-gray-400
                      transition-all duration-200
                      disabled:opacity-50
                    "
                  >
                    <ArrowLeft size={20} />
                    Back to Edit
                  </button>
                </div>

                {/* Secure Checkout Note */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Shield size={14} />
                    <span>Secure checkout • 256-bit encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;