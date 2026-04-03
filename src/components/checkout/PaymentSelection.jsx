import { useState } from "react";
import { CreditCard, CheckCircle } from "lucide-react";

export default function PaymentSelection({ handleCheckout, handleFlutterwavePayment, selectedAddress, total, loading }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard, description: "Pay with Visa, Mastercard, Amex" },
    { id: "flutterwave", name: "Flutterwave", icon: () => <span className="text-lg">💳</span>, description: "Secure payment with Flutterwave" },
  ];

  const handleProceed = () => {
    if (!selectedAddress) return alert("Please select a shipping address");

    if (selectedPaymentMethod === "flutterwave") handleFlutterwavePayment();
    else if (selectedPaymentMethod === "card") handleCheckout();
    else alert("Please select a payment method");
  };

  return (
    <div className="mt-4 space-y-3">
      <p className="text-sm font-medium text-gray-700">Select Payment Method</p>
      <div className="space-y-2">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedPaymentMethod(method.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all
              ${selectedPaymentMethod === method.id ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-red-200"}
            `}
          >
            <method.icon size={20} className={selectedPaymentMethod === method.id ? "text-red-500" : "text-gray-400"} />
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-800">{method.name}</p>
              <p className="text-xs text-gray-500">{method.description}</p>
            </div>
            {selectedPaymentMethod === method.id && <CheckCircle size={16} className="text-red-500" />}
          </button>
        ))}
      </div>

      <button
        onClick={handleProceed}
        disabled={loading || !selectedAddress || !selectedPaymentMethod}
        className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-3
          bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl
          hover:shadow-lg transform hover:scale-105 transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <CreditCard size={20} />
            {selectedPaymentMethod === "flutterwave" ? `Pay ${total.toFixed(2)} DKwwK` : "Proceed to Payment"}
          </>
        )}
      </button>
    </div>
  );
}