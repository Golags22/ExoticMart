import React from "react";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowLeft, 
  CreditCard,
  Tag,
  Truck,
  AlertCircle,
  X
} from "lucide-react";

export default function Carts() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  if (!cart.items.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-white rounded-full p-6 inline-block mb-6 shadow-lg">
            <ShoppingBag className="text-red-400" size={64} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet</p>
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
                Shopping Cart
              </h1>
              <p className="text-gray-500 mt-1">{cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart</p>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <ArrowLeft size={20} />
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                  {/* Product Image */}
                  <div className="sm:w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || "https://via.placeholder.com/96"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-800 hover:text-red-600 transition-colors">
                          <Link to={`/product/${item.productId}`}>
                            {item.name}
                          </Link>
                        </h3>
                        {item.category && (
                          <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full inline-block mt-1">
                            {item.category}
                          </span>
                        )}
                        <p className="text-sm text-gray-500 mt-1">Unit Price: ${item.price.toFixed(2)}</p>
                      </div>
                      
                      {/* Price and Remove */}
                      <div className="text-right">
                        <p className="font-bold text-red-600 text-lg">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors mt-1 text-sm"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus size={14} className="text-gray-600" />
                        </button>
                        <span className="w-10 text-center font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <Plus size={14} className="text-gray-600" />
                        </button>
                      </div>
                      <span className="text-xs text-gray-400">
                        {item.quantity} × ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Free Shipping Banner */}
            {subtotal < 50 && subtotal > 0 && (
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
                <div className="flex items-center gap-3">
                  <Truck className="text-red-500" size={20} />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Add ${(50 - subtotal).toFixed(2)} more to get free shipping!
                    </p>
                    <div className="w-full bg-red-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(subtotal / 50) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                  <h2 className="text-white font-semibold text-lg">Order Summary</h2>
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
                    
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-red-600">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="pt-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code"
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                      />
                      <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => navigate("/checkout")}
                    className="
                      w-full mt-4
                      flex items-center justify-center gap-2
                      px-6 py-3
                      bg-gradient-to-r from-red-500 to-red-600
                      text-white font-semibold
                      rounded-xl
                      hover:shadow-lg
                      transform hover:scale-105
                      transition-all duration-300
                    "
                  >
                    <CreditCard size={20} />
                    Proceed to Checkout
                  </button>

                  {/* Secure Checkout Note */}
                  <div className="text-center pt-2">
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                      <AlertCircle size={12} />
                      <span>Secure checkout • 256-bit encryption</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="text-center p-2">
                  <div className="text-green-500 text-sm">✓</div>
                  <p className="text-xs text-gray-500">Secure</p>
                </div>
                <div className="text-center p-2">
                  <div className="text-green-500 text-sm">🔄</div>
                  <p className="text-xs text-gray-500">30-day returns</p>
                </div>
                <div className="text-center p-2">
                  <div className="text-green-500 text-sm">🚚</div>
                  <p className="text-xs text-gray-500">Fast delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}