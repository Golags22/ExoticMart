// pages/checkout/Checkout.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ChevronRight, 
  MapPin, 
  CreditCard, 
  Truck, 
  ShoppingBag,
  Lock,
  Shield,
  CheckCircle,
  Edit,
  Plus,
  AlertCircle,
  X,
  Check,
  Package,
  Home,
  FileText
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrderContext";
import { toast } from "react-toastify";

export default function Checkout() {
  const { user, userProfile } = useAuth();
  const { cart, getCartSubtotal, clearCart } = useCart();
  const { placeOrder, loading: orderLoading } = useOrders();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);

  // Shipping form state
  const [shippingForm, setShippingForm] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    phone: "",
    email: user?.email || "",
    saveAddress: false
  });

  // Edit form state for inline editing
  const [editForm, setEditForm] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    phone: "",
    email: ""
  });

  // Billing form state
  const [billingForm, setBillingForm] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US"
  });

  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    saveCard: false
  });

  // Form errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }

    if (userProfile?.addresses) {
      setSavedAddresses(userProfile.addresses);
      const defaultAddress = userProfile.addresses.find(addr => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
        setShippingForm(defaultAddress);
        setBillingForm(defaultAddress);
      }
    }
  }, [cart, userProfile, navigate]);

  if (!user) {
    navigate("/users/login", { state: { from: "/checkout" } });
    return null;
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some items to your cart before checkout.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const validateShipping = () => {
    const newErrors = {};
    
    if (!shippingForm.fullName?.trim()) newErrors.fullName = "Full name is required";
    if (!shippingForm.addressLine1?.trim()) newErrors.addressLine1 = "Address is required";
    if (!shippingForm.city?.trim()) newErrors.city = "City is required";
    if (!shippingForm.state?.trim()) newErrors.state = "State is required";
    if (!shippingForm.zipCode?.trim()) newErrors.zipCode = "ZIP code is required";
    if (!shippingForm.phone?.trim()) newErrors.phone = "Phone number is required";
    if (!shippingForm.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(shippingForm.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateBilling = () => {
    if (sameAsShipping) return true;
    
    const newErrors = {};
    
    if (!billingForm.fullName?.trim()) newErrors.billingFullName = "Full name is required";
    if (!billingForm.addressLine1?.trim()) newErrors.billingAddressLine1 = "Address is required";
    if (!billingForm.city?.trim()) newErrors.billingCity = "City is required";
    if (!billingForm.state?.trim()) newErrors.billingState = "State is required";
    if (!billingForm.zipCode?.trim()) newErrors.billingZipCode = "ZIP code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};

    if (paymentMethod === "card") {
      if (!paymentForm.cardNumber?.trim()) {
        newErrors.cardNumber = "Card number is required";
      } else if (paymentForm.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = "Invalid card number";
      }
      
      if (!paymentForm.cardName?.trim()) newErrors.cardName = "Name on card is required";
      if (!paymentForm.expiry?.trim()) {
        newErrors.expiry = "Expiry date is required";
      } else if (!/^\d{2}\/\d{2}$/.test(paymentForm.expiry)) {
        newErrors.expiry = "Invalid format (MM/YY)";
      }
      
      if (!paymentForm.cvv?.trim()) {
        newErrors.cvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(paymentForm.cvv)) {
        newErrors.cvv = "Invalid CVV";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (validatePayment()) {
      setStep(3);
      window.scrollTo(0, 0);
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateBilling()) {
      toast.error("Please check billing information");
      return;
    }

    setIsProcessing(true);
    
    try {
      const orderItems = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        brand: item.brand,
        options: item.options || {}
      }));

      const subtotal = getCartSubtotal();
      
      const orderData = await placeOrder(
        orderItems,
        subtotal,
        {
          shipping: shippingForm,
          billing: sameAsShipping ? shippingForm : billingForm
        },
        paymentMethod,
        paymentMethod === "card" ? {
          last4: paymentForm.cardNumber.slice(-4),
          cardType: detectCardType(paymentForm.cardNumber)
        } : null
      );

      await clearCart();
      navigate(`/order-confirmation/${orderData.id}`);
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error(error.message || "Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const detectCardType = (number) => {
    const clean = number.replace(/\s/g, '');
    if (/^4/.test(clean)) return "Visa";
    if (/^5[1-5]/.test(clean)) return "Mastercard";
    if (/^3[47]/.test(clean)) return "Amex";
    if (/^6(?:011|5)/.test(clean)) return "Discover";
    return "Card";
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setShippingForm(address);
    if (sameAsShipping) {
      setBillingForm(address);
    }
    setEditingAddressId(null);
  };

  const handleEditAddress = (address) => {
    setEditingAddressId(address.id);
    setEditForm(address);
  };

  const handleCancelEdit = () => {
    setEditingAddressId(null);
  };

  const handleSaveEdit = (addressId) => {
    // Validate edit form
    if (!editForm.fullName?.trim() || !editForm.addressLine1?.trim() || 
        !editForm.city?.trim() || !editForm.state?.trim() || 
        !editForm.zipCode?.trim() || !editForm.phone?.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Update the address in savedAddresses
    const updatedAddresses = savedAddresses.map(addr => 
      addr.id === addressId ? { ...addr, ...editForm } : addr
    );
    
    setSavedAddresses(updatedAddresses);
    
    // If this is the selected address, update shippingForm
    if (selectedAddress?.id === addressId) {
      setShippingForm({ ...selectedAddress, ...editForm });
      if (sameAsShipping) {
        setBillingForm({ ...selectedAddress, ...editForm });
      }
      setSelectedAddress({ ...selectedAddress, ...editForm });
    }
    
    setEditingAddressId(null);
    toast.success("Address updated successfully");
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const subtotal = getCartSubtotal();
  const tax = subtotal * 0.1;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-red-600">Home</Link>
            <ChevronRight size={14} />
            <Link to="/cart" className="hover:text-red-600">Cart</Link>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Checkout</span>
          </div>
        </div>
      </div>

      {/* Checkout Progress with Icons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          {/* Step 1 - Shipping */}
          <div className="flex items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              <Package size={18} />
            </div>
            <div className="ml-3">
              <p className={`text-xs font-medium ${
                step >= 1 ? 'text-red-600' : 'text-gray-500'
              }`}>
                STEP 1
              </p>
              <p className={`text-sm font-semibold ${
                step >= 1 ? 'text-gray-900' : 'text-gray-400'
              }`}>
                Shipping
              </p>
            </div>
          </div>

          {/* Progress Line */}
          <div className={`flex-1 h-0.5 mx-4 ${
            step > 1 ? 'bg-red-600' : 'bg-gray-200'
          }`} />

          {/* Step 2 - Payment */}
          <div className="flex items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              <CreditCard size={18} />
            </div>
            <div className="ml-3">
              <p className={`text-xs font-medium ${
                step >= 2 ? 'text-red-600' : 'text-gray-500'
              }`}>
                STEP 2
              </p>
              <p className={`text-sm font-semibold ${
                step >= 2 ? 'text-gray-900' : 'text-gray-400'
              }`}>
                Payment
              </p>
            </div>
          </div>

          {/* Progress Line */}
          <div className={`flex-1 h-0.5 mx-4 ${
            step > 2 ? 'bg-red-600' : 'bg-gray-200'
          }`} />

          {/* Step 3 - Review */}
          <div className="flex items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              <FileText size={18} />
            </div>
            <div className="ml-3">
              <p className={`text-xs font-medium ${
                step >= 3 ? 'text-red-600' : 'text-gray-500'
              }`}>
                STEP 3
              </p>
              <p className={`text-sm font-semibold ${
                step >= 3 ? 'text-gray-900' : 'text-gray-400'
              }`}>
                Review
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Package size={16} className="text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Shipping Information</h2>
                </div>

                {/* Saved Addresses */}
                {savedAddresses.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Saved Addresses</h3>
                    <div className="space-y-3">
                      {savedAddresses.map((address) => (
                        <div key={address.id}>
                          {editingAddressId === address.id ? (
                            // Inline Edit Mode
                            <div className="border-2 border-red-600 rounded-lg p-4 bg-red-50">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="md:col-span-2">
                                  <input
                                    type="text"
                                    value={editForm.fullName}
                                    onChange={(e) => setEditForm({...editForm, fullName: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                    placeholder="Full Name"
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <input
                                    type="text"
                                    value={editForm.addressLine1}
                                    onChange={(e) => setEditForm({...editForm, addressLine1: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                    placeholder="Address Line 1"
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <input
                                    type="text"
                                    value={editForm.addressLine2}
                                    onChange={(e) => setEditForm({...editForm, addressLine2: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                    placeholder="Address Line 2 (Optional)"
                                  />
                                </div>
                                <div>
                                  <input
                                    type="text"
                                    value={editForm.city}
                                    onChange={(e) => setEditForm({...editForm, city: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                    placeholder="City"
                                  />
                                </div>
                                <div>
                                  <input
                                    type="text"
                                    value={editForm.state}
                                    onChange={(e) => setEditForm({...editForm, state: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                    placeholder="State"
                                  />
                                </div>
                                <div>
                                  <input
                                    type="text"
                                    value={editForm.zipCode}
                                    onChange={(e) => setEditForm({...editForm, zipCode: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                    placeholder="ZIP Code"
                                  />
                                </div>
                                <div>
                                  <select
                                    value={editForm.country}
                                    onChange={(e) => setEditForm({...editForm, country: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                  >
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="AU">Australia</option>
                                  </select>
                                </div>
                                <div>
                                  <input
                                    type="tel"
                                    value={editForm.phone}
                                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                    placeholder="Phone"
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <input
                                    type="email"
                                    value={editForm.email}
                                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                    placeholder="Email"
                                  />
                                </div>
                              </div>
                              <div className="flex justify-end gap-2 mt-3">
                                <button
                                  onClick={handleCancelEdit}
                                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1"
                                >
                                  <X size={14} />
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleSaveEdit(address.id)}
                                  className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-1"
                                >
                                  <Check size={14} />
                                  Save
                                </button>
                              </div>
                            </div>
                          ) : (
                            // View Mode
                            <div
                              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                selectedAddress === address
                                  ? 'border-red-600 bg-red-50'
                                  : 'border-gray-200 hover:border-red-300'
                              }`}
                              onClick={() => handleSelectAddress(address)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">{address.fullName}</p>
                                  <p className="text-sm text-gray-600 mt-1">{address.addressLine1}</p>
                                  {address.addressLine2 && (
                                    <p className="text-sm text-gray-600">{address.addressLine2}</p>
                                  )}
                                  <p className="text-sm text-gray-600">
                                    {address.city}, {address.state} {address.zipCode}
                                  </p>
                                  <p className="text-sm text-gray-600">{address.country}</p>
                                  <p className="text-sm text-gray-600 mt-2">{address.phone}</p>
                                  <p className="text-sm text-gray-600">{address.email}</p>
                                </div>
                                <div className="flex items-start gap-2">
                                  {address.isDefault && (
                                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                      Default
                                    </span>
                                  )}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditAddress(address);
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                  >
                                    <Edit size={16} className="text-gray-500" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {/* Add new address logic */}}
                      className="mt-3 text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                    >
                      <Plus size={16} />
                      Add New Address
                    </button>
                  </div>
                )}

                {/* Billing Address Option */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="sameAsShipping"
                      checked={sameAsShipping}
                      onChange={(e) => setSameAsShipping(e.target.checked)}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <label htmlFor="sameAsShipping" className="ml-2 text-sm text-gray-600">
                      Billing address same as shipping
                    </label>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <Link
                    to="/cart"
                    className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Back to Cart
                  </Link>
                  <button
                    onClick={() => {
                      if (selectedAddress) {
                        setStep(2);
                        window.scrollTo(0, 0);
                      } else {
                        toast.error("Please select a shipping address");
                      }
                    }}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <CreditCard size={16} className="text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                </div>

                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  {/* Payment Method Selection */}
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-red-600 focus:ring-red-500"
                      />
                      <div className="ml-3 flex items-center gap-2">
                        <CreditCard size={20} className="text-gray-400" />
                        <span className="font-medium text-gray-900">Credit / Debit Card</span>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-red-600 focus:ring-red-500"
                      />
                      <div className="ml-3 flex items-center gap-2">
                        <img 
                          src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
                          alt="PayPal" 
                          className="h-6"
                        />
                        <span className="font-medium text-gray-900">PayPal</span>
                      </div>
                    </label>
                  </div>

                  {/* Card Details Form */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          value={paymentForm.cardNumber}
                          onChange={(e) => setPaymentForm({
                            ...paymentForm,
                            cardNumber: formatCardNumber(e.target.value)
                          })}
                          maxLength="19"
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent ${
                            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && (
                          <p className="text-xs text-red-600 mt-1">{errors.cardNumber}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          value={paymentForm.cardName}
                          onChange={(e) => setPaymentForm({...paymentForm, cardName: e.target.value})}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent ${
                            errors.cardName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="John Doe"
                        />
                        {errors.cardName && (
                          <p className="text-xs text-red-600 mt-1">{errors.cardName}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            id="expiry"
                            value={paymentForm.expiry}
                            onChange={(e) => setPaymentForm({
                              ...paymentForm,
                              expiry: formatExpiry(e.target.value)
                            })}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent ${
                              errors.expiry ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="MM/YY"
                            maxLength="5"
                          />
                          {errors.expiry && (
                            <p className="text-xs text-red-600 mt-1">{errors.expiry}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV *
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            value={paymentForm.cvv}
                            onChange={(e) => setPaymentForm({...paymentForm, cvv: e.target.value})}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent ${
                              errors.cvv ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="123"
                            maxLength="4"
                          />
                          {errors.cvv && (
                            <p className="text-xs text-red-600 mt-1">{errors.cvv}</p>
                          )}
                        </div>
                      </div>

                      {/* Save Card Checkbox */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="saveCard"
                          checked={paymentForm.saveCard}
                          onChange={(e) => setPaymentForm({...paymentForm, saveCard: e.target.checked})}
                          className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        />
                        <label htmlFor="saveCard" className="ml-2 text-sm text-gray-600">
                          Save card for future purchases
                        </label>
                      </div>
                    </div>
                  )}

                  {/* PayPal Note */}
                  {paymentMethod === "paypal" && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-700 flex items-center gap-2">
                        <AlertCircle size={16} />
                        You'll be redirected to PayPal to complete your payment.
                      </p>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      Back to Shipping
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <FileText size={16} className="text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Review Your Order</h2>
                </div>

                {/* Shipping Address */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 flex items-center gap-1">
                      <MapPin size={18} className="text-red-600" />
                      Shipping Address
                    </h3>
                    <button
                      onClick={() => setStep(1)}
                      className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{shippingForm.fullName}</p>
                    <p>{shippingForm.addressLine1}</p>
                    {shippingForm.addressLine2 && <p>{shippingForm.addressLine2}</p>}
                    <p>{shippingForm.city}, {shippingForm.state} {shippingForm.zipCode}</p>
                    <p>{shippingForm.country}</p>
                    <p className="mt-2">{shippingForm.phone}</p>
                    <p>{shippingForm.email}</p>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 flex items-center gap-1">
                      <CreditCard size={18} className="text-red-600" />
                      Payment Method
                    </h3>
                    <button
                      onClick={() => setStep(2)}
                      className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                  </div>
                  {paymentMethod === "card" ? (
                    <div className="text-sm text-gray-600">
                      <p>{detectCardType(paymentForm.cardNumber)} ending in {paymentForm.cardNumber.slice(-4)}</p>
                      <p>{paymentForm.cardName}</p>
                      <p>Expires {paymentForm.expiry}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">PayPal</p>
                  )}
                </div>

                {/* Order Items */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-1">
                    <ShoppingBag size={18} className="text-red-600" />
                    Order Items
                  </h3>
                  <div className="space-y-3">
                    {cart.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                          {item.options?.size && (
                            <p className="text-xs text-gray-500">Size: {item.options.size}</p>
                          )}
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing || orderLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing || orderLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      Place Order • ${total.toFixed(2)}
                    </>
                  )}
                </button>

                {/* Security Note */}
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Shield size={14} className="text-green-600" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-96">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name.length > 25 ? item.name.substring(0, 25) + '...' : item.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
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
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-red-600 text-xl">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Free Shipping Progress */}
              {subtotal < 50 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700">
                    Add ${(50 - subtotal).toFixed(2)} more for FREE shipping!
                  </p>
                  <div className="w-full bg-blue-200 rounded-full h-1.5 mt-2">
                    <div 
                      className="bg-blue-600 h-1.5 rounded-full" 
                      style={{ width: `${(subtotal / 50) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Trust Badges */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Lock size={14} className="text-green-600" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Truck size={14} className="text-red-600" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle size={14} className="text-green-600" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}