// pages/cart/Cart.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight,
  Shield,
  Truck,
  CreditCard,
  Lock,
  Heart,
  ChevronRight
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function Cart() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getCartSubtotal,
    getCartTax,
    getCartTotalWithTax,
    getCartCount,
    moveToWishlist,
    clearCart
  } = useCart();
  
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast.info(
        <div>
          <p className="font-medium mb-2">Please login to checkout</p>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/users/login", { state: { from: "/cart" } })}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/users/signup")}
              className="border border-red-600 text-red-600 px-3 py-1 rounded text-sm"
            >
              Sign Up
            </button>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: false,
          draggable: false
        }
      );
      return;
    }

    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      navigate("/checkout");
      setIsCheckingOut(false);
    }, 1000);
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setPromoApplied(true);
      toast.success("Promo code applied: 10% off!");
    } else if (promoCode.toUpperCase() === "FREESHIP") {
      setPromoApplied(true);
      toast.success("Promo code applied: Free shipping!");
    } else {
      toast.error("Invalid promo code");
    }
    setPromoCode("");
  };

  const handleMoveToWishlist = async (item) => {
    try {
      await moveToWishlist(item);
      toast.success(`${item.name} moved to wishlist`);
    } catch (error) {
      if (error === "LOGIN_REQUIRED") {
        navigate("/users/login", { state: { from: "/cart" } });
      }
    }
  };

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-white flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="bg-red-50 w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-14 h-14 text-red-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added anything to your cart yet. 
            Explore our collections and find something you'll love!
          </p>
          <div className="space-y-3">
            <Link
              to="/"
              className="block w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
            >
              Continue Shopping
            </Link>
            {!user && (
              <Link
                to="/users/login"
                className="block w-full border-2 border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Login to View Saved Items
              </Link>
            )}
          </div>

          {/* Popular categories */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Popular Categories</h3>
            <div className="flex flex-wrap justify-center gap-2">
              <Link to="/cosmetics" className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-red-50 hover:text-red-600 transition-colors">
                Cosmetics
              </Link>
              <Link to="/jewelry" className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-red-50 hover:text-red-600 transition-colors">
                Jewelry
              </Link>
              <Link to="/clothing" className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-red-50 hover:text-red-600 transition-colors">
                Clothing
              </Link>
              <Link to="/accessories" className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-red-50 hover:text-red-600 transition-colors">
                Accessories
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate savings
  const subtotal = getCartSubtotal();
  const tax = getCartTax();
  const total = getCartTotalWithTax();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const finalTotal = total + shipping;

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-red-600">Home</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Shopping Cart
            </h1>
            <p className="text-gray-500 mt-1">
              {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-gray-400 hover:text-red-600 text-sm flex items-center gap-1 transition-colors"
          >
            <Trash2 size={16} />
            Clear Cart
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
              {cart.map((item) => (
                <div key={`${item.id}-${JSON.stringify(item.options)}`} className="p-4 md:p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`} className="sm:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 group">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                          <Link 
                            to={`/product/${item.id}`}
                            className="text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
                          
                          {/* Selected options */}
                          {item.options && Object.keys(item.options).length > 0 && (
                            <div className="flex items-center gap-3 mt-2">
                              {item.options.color && (
                                <div className="flex items-center gap-1">
                                  <span className="text-xs text-gray-500">Color:</span>
                                  <div 
                                    className="w-4 h-4 rounded-full border border-gray-300"
                                    style={{ backgroundColor: item.options.color }}
                                    title={item.options.color}
                                  />
                                </div>
                              )}
                              {item.options.size && (
                                <div className="flex items-center gap-1">
                                  <span className="text-xs text-gray-500">Size:</span>
                                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                                    {item.options.size}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          {item.originalPrice && (
                            <div className="text-sm text-gray-400 line-through">
                              ${item.originalPrice}
                            </div>
                          )}
                          {item.originalPrice && (
                            <div className="text-xs text-green-600 font-medium mt-1">
                              Save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls and Actions */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.options)}
                            className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.options)}
                            className="p-2 hover:bg-gray-50 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleMoveToWishlist(item)}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1"
                            aria-label="Move to wishlist"
                            title="Move to wishlist"
                          >
                            <Heart size={18} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id, item.options)}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1"
                            aria-label="Remove item"
                            title="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping Link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 mt-6 font-medium group"
            >
              <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-xs text-green-600 mt-2">
                    ✓ Promo code applied successfully!
                  </p>
                )}
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({getCartCount()} items)</span>
                  <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
                  )}
                </div>
                
                {subtotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                )}
                
                {promoApplied && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount (10%)</span>
                    <span>-${(subtotal * 0.1).toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-red-600">
                      ${(promoApplied ? finalTotal * 0.9 : finalTotal).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Including ${tax.toFixed(2)} in taxes
                  </p>
                </div>
              </div>

              {/* Free shipping progress */}
              {subtotal < 50 && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700 mb-2">
                    Add ${(50 - subtotal).toFixed(2)} more for FREE shipping!
                  </p>
                  <div className="w-full bg-blue-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full" 
                      style={{ width: `${(subtotal / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                {isCheckingOut ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Proceed to Checkout
                  </>
                )}
              </button>

              {/* Login Prompt */}
              {!user && (
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">
                    Already have an account?
                  </p>
                  <Link
                    to="/users/login"
                    state={{ from: "/cart" }}
                    className="text-red-600 font-medium hover:text-red-700 text-sm"
                  >
                    Sign in for faster checkout
                  </Link>
                </div>
              )}

              {/* Trust Badges */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Shield size={16} className="text-green-600" />
                  <span>Secure checkout - 256-bit SSL encrypted</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Truck size={16} className="text-red-600" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CreditCard size={16} className="text-blue-600" />
                  <span>Pay with Visa, Mastercard, PayPal, Apple Pay</span>
                </div>
              </div>

              {/* Payment Icons */}
              <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-gray-200">
                <img src="https://placehold.co/40x25/1a1f71/ffffff?text=VISA" alt="Visa" className="h-6" />
                <img src="https://placehold.co/40x25/eb001b/ffffff?text=MC" alt="Mastercard" className="h-6" />
                <img src="https://placehold.co/40x25/006fcf/ffffff?text=AMEX" alt="Amex" className="h-6" />
                <img src="https://placehold.co/40x25/003087/ffffff?text=PP" alt="PayPal" className="h-6" />
                <img src="https://placehold.co/40x25/000000/ffffff?text=APL" alt="Apple Pay" className="h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Recently viewed or recommended products */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">You might also like</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Link key={i} to={`/product/${i}`} className="group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                  <img 
                    src={`https://images.unsplash.com/photo-${i === 1 ? '1586495777744-4413f21062fa' : i === 2 ? '1626014303751-0a76b40e38a1' : i === 3 ? '1635767798638-3e25273a8236' : '1572804013427-4d7ca7268217'}?w=300&q=80`} 
                    alt="Product"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="font-medium text-gray-900 text-sm group-hover:text-red-600 transition-colors">
                  Product Name
                </h4>
                <p className="text-sm text-gray-900 font-bold">$29.99</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}