import { useFakePayment } from "../../hooks/useFakePayment";

export default function PaymentMethod({ total = 0, onSuccess, onClose }) {
  const { processPayment, loading } = useFakePayment();

  const handlePay = async () => {
    const result = await processPayment(total);

    if (result.status === "successful") {
      onSuccess(result);
    } else {
      alert("Payment failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Complete Payment</h2>

        <p className="mb-4">
          Amount: <strong>{(total ?? 0).toFixed(2)} DKK</strong>
        </p>

        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full bg-red-500 text-white py-3 rounded-lg"
        >
          {loading ? "Processing..." : `Pay ${(total ?? 0).toFixed(2)} DKK`}
        </button>

        <button
          onClick={onClose}
          className="mt-3 w-full text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}