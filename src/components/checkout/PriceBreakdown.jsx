import { useState } from "react";

export default function PriceBreakdown({ subtotal, tax, shipping, total }) {
  const [promoCode, setPromoCode] = useState("");

  return (
    <div className="border-t border-gray-200 pt-4 space-y-3">
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
        <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
          {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
        </span>
      </div>

      {/* Promo Code Input */}
      <div className="flex items-center gap-2 pt-2">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Promo code"
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
        />
        <button className="px-4 py-2 text-sm border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors">
          Apply
        </button>
      </div>

      <div className="border-t border-gray-200 pt-3 mt-2">
        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span className="text-red-600">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}