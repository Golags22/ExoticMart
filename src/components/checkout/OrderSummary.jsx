import { useState } from "react";
import { CreditCard, Shield, Truck, Clock } from "lucide-react";
import PaymentMethod from "./PaymentMethod";

export default function OrderSummary({
  cart,
  subtotal,
  tax,
  shipping,
  total,
  selectedAddress,
  createOrder,
  loading,
}) {
  const [showPayment, setShowPayment] = useState(false);

  const handleProceed = () => {
    if (!selectedAddress) {
      alert("Please select a shipping address");
      return;
    }

    setShowPayment(true);
  };

  const handlePaymentSuccess = async (paymentData) => {
    console.log("Payment Success:", paymentData);

    const orderId = await createOrder({
      address: selectedAddress,
      payment: paymentData,
    });

    if (orderId) {
      alert("Order placed successfully!");
      setShowPayment(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border">
        <div className="bg-red-500 text-white p-4 font-semibold">
          Order Summary
        </div>

        <div className="p-4">
          {/* Items */}
          {cart.items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm">
              <span>{item.name} x {item.quantity}</span>
              <span>{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          {/* Totals */}
          <div className="mt-4 space-y-2 border-t pt-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>{tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span className="text-red-600">
                {(total ?? 0).toFixed(2)} DKK
              </span>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleProceed}
            disabled={loading || !selectedAddress}
            className="w-full mt-6 bg-red-500 text-white py-3 rounded-lg flex justify-center items-center gap-2"
          >
            <CreditCard size={20} />
            Pay {(total ?? 0).toFixed(2)} DKK
          </button>

          {/* Info */}
          <div className="mt-4 text-xs text-gray-500 flex justify-center gap-4">
            <span className="flex items-center gap-1"><Shield size={12}/> Secure</span>
            <span className="flex items-center gap-1"><Truck size={12}/> Fast Delivery</span>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <PaymentMethod
          total={total}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPayment(false)}
        />
      )}
    </>
  );
}