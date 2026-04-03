// src/account/admin/components/RecentOrdersTable.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Clock, RefreshCw, Truck, CheckCircle, XCircle } from "lucide-react";

export default function RecentOrdersTable({ orders = [] }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "processing": return "bg-blue-100 text-blue-700";
      case "shipped": return "bg-purple-100 text-purple-700";
      case "delivered": return "bg-green-100 text-green-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending": return <Clock size={14} />;
      case "processing": return <RefreshCw size={14} />;
      case "shipped": return <Truck size={14} />;
      case "delivered": return <CheckCircle size={14} />;
      case "cancelled": return <XCircle size={14} />;
      default: return <Clock size={14} />;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
    }).format(new Date(date));
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        <Link
          to="/admin/orders"
          className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
        >
          View All
          <ArrowUp size={14} className="rotate-90" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 whitespace-nowrap">
                  <span className="font-mono text-sm font-medium text-gray-900">#{order.id.slice(-8)}</span>
                </td>
                <td className="px-5 py-3 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.shippingAddress?.fullName || "N/A"}</p>
                    <p className="text-xs text-gray-500">{order.shippingAddress?.email}</p>
                  </div>
                </td>
                <td className="px-5 py-3 whitespace-nowrap">
                  <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                </td>
                <td className="px-5 py-3 whitespace-nowrap">
                  <p className="text-sm font-semibold text-gray-900">{formatCurrency(order.total)}</p>
                </td>
                <td className="px-5 py-3 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="px-5 py-8 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}