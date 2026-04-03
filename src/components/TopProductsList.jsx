// src/account/admin/components/TopProductsList.jsx
import React from "react";
import { Package } from "lucide-react";

export default function TopProductsList({ products = [], stats }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h2>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <Package size={16} className="text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-600 rounded-full"
                    style={{ width: `${(product.quantity / (products[0]?.quantity || 1)) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{product.quantity} sold</span>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && <p className="text-center text-gray-500 py-4">No products sold yet</p>}
      </div>
    </div>
  );
}