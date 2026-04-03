import { useState } from "react";

export default function OrderItemsList({ cart }) {
  return (
    <div className="space-y-3 max-h-64 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-red-200">
      {cart.items.map((item) => (
        <div key={item.productId} className="flex justify-between text-sm">
          <span className="text-gray-600">
            {item.name} <span className="text-gray-400">x{item.quantity}</span>
          </span>
          <span className="font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}