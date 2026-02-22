// pages/checkout/OrderConfirmation.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle, Package, Truck, Mail, ShoppingBag } from "lucide-react";
import { useOrders } from "../../context/OrderContext";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      const orderData = await getOrderById(orderId);
      setOrder(orderData);
      setLoading(false);
    };
    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank You for Your Order!</h1>
          <p className="text-gray-600">
            Order #{order?.id} has been placed successfully.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Package size={18} className="text-red-600" />
            Order Summary
          </h2>
          <div className="space-y-3">
            {order?.items?.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${order?.subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">${order?.shipping?.toFixed(2) || "0.00"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">${order?.tax?.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-red-600">${order?.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Truck size={16} className="text-red-600" />
              Shipping Address
            </h3>
            <div className="text-sm text-gray-600">
              <p>{order?.shippingAddress?.fullName}</p>
              <p>{order?.shippingAddress?.addressLine1}</p>
              <p>{order?.shippingAddress?.city}, {order?.shippingAddress?.state} {order?.shippingAddress?.zipCode}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Mail size={16} className="text-red-600" />
              Order Updates
            </h3>
            <p className="text-sm text-gray-600">
              We'll send order updates to:<br />
              {order?.shippingAddress?.email}
            </p>
          </div>
        </div>

        <div className="text-center space-y-4">
          <Link
            to="/account/orders"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View My Orders
          </Link>
          <div>
            <Link
              to="/"
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}