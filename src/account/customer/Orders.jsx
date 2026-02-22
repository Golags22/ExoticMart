// pages/account/Orders.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Package, 
  ChevronRight, 
  Clock, 
  Truck, 
  CheckCircle, 
  XCircle,
  RefreshCw,
  Eye,
  Star,
  ShoppingBag,
  Calendar,
  MapPin,
  CreditCard,
  Filter,
  Search,
  Download,
  Printer,
  MessageCircle,
  AlertCircle,
  HelpCircle
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../context/OrderContext";
import { toast } from "react-toastify";

export default function Orders() {
  const { user } = useAuth();
  const { orders, loading, getUserOrders, reorder } = useOrders();
  const navigate = useNavigate();
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [reordering, setReordering] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (user) {
      getUserOrders();
    }

    // In your Orders.jsx, update the useEffect:
  console.log("1. Orders component mounted");
  console.log("2. Current user:", user);
  console.log("3. User UID:", user?.uid);
  
  if (user) {
    console.log("4. Fetching orders for user:", user.uid);
    
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getUserOrders();
        console.log("5. Fetched orders from context:", fetchedOrders);
        console.log("6. Orders in state after fetch:", orders);
      } catch (error) {
        console.error("7. Error fetching orders:", error);
      }
    };
    
    fetchOrders();
  } else {
    console.log("8. No user logged in");
  }

  }, [user]);

  // Redirect if not logged in
  if (!user) {
    navigate("/users/login", { state: { from: "/account/orders" } });
    return null;
  }

  // Filter orders based on status and search
  const filteredOrders = orders.filter(order => {
    if (filter !== "all" && order.status !== filter) return false;
    if (searchTerm) {
      return order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
             order.items?.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return true;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case "delivered":
        return <CheckCircle size={20} className="text-green-600" />;
      case "shipped":
        return <Truck size={20} className="text-blue-600" />;
      case "processing":
      case "pending":
        return <Clock size={20} className="text-yellow-600" />;
      case "cancelled":
        return <XCircle size={20} className="text-red-600" />;
      default:
        return <Package size={20} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "processing":
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleTrackOrder = (tracking, carrier) => {
    if (tracking) {
      window.open(`https://www.google.com/search?q=track+${carrier}+${tracking}`, '_blank');
    }
  };

  const handleReorder = async (order) => {
    setReordering(true);
    try {
      await reorder(order);
      toast.success("Items added to cart!");
      navigate("/cart");
    } catch (error) {
      console.error("Reorder error:", error);
      toast.error("Failed to reorder items");
    } finally {
      setReordering(false);
    }
  };

  const handleWriteReview = (item) => {
    navigate(`/product/${item.id}/review`, { 
      state: { product: item }
    });
  };

  const handleContactSupport = (orderId) => {
    navigate("/contact", { 
      state: { orderId, subject: `Question about order ${orderId}` }
    });
  };

  const handleDownloadInvoice = (orderId) => {
    toast.success(`Invoice for order ${orderId} downloaded`);
    // Implement actual invoice download logic
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
            <Package className="w-8 h-8 text-red-600 absolute top-6 left-1/2 transform -translate-x-1/2" />
          </div>
          <p className="text-gray-600 font-medium">Loading your orders...</p>
          <p className="text-sm text-gray-400 mt-2">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link to="/account" className="hover:text-red-600 transition-colors">Account</Link>
              <ChevronRight size={14} />
              <span className="text-gray-900 font-medium">My Orders</span>
            </div>
            <Link 
              to="/help/orders" 
              className="text-sm text-gray-500 hover:text-red-600 flex items-center gap-1"
            >
              <HelpCircle size={16} />
              <span className="hidden sm:inline">Order Help</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Package className="w-8 h-8 text-red-600" />
                My Orders
              </h1>
              <p className="text-gray-500 mt-1">
                Track, manage, and reorder your purchases
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by order ID or product..."
                className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              <p className="text-xs text-gray-500">Total Orders</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {orders.filter(o => o.status === "shipped").length}
              </p>
              <p className="text-xs text-blue-600">In Transit</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {orders.filter(o => o.status === "delivered").length}
              </p>
              <p className="text-xs text-green-600">Delivered</p>
            </div>
            
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">
                ${orders.reduce((acc, o) => acc + (o.total || 0), 0).toFixed(2)}
              </p>
              <p className="text-xs text-purple-600">Total Spent</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">Filter Orders</h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-sm text-gray-500 hover:text-red-600 flex items-center gap-1 lg:hidden"
            >
              <Filter size={16} />
              {showFilters ? "Hide" : "Show"} Filters
            </button>
          </div>
          
          <div className={`flex flex-wrap gap-2 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === "all"
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setFilter("processing")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === "processing"
                  ? "bg-yellow-600 text-white shadow-md"
                  : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
              }`}
            >
              Processing ({orders.filter(o => o.status === "processing" || o.status === "pending").length})
            </button>
            <button
              onClick={() => setFilter("shipped")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === "shipped"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
            >
              Shipped ({orders.filter(o => o.status === "shipped").length})
            </button>
            <button
              onClick={() => setFilter("delivered")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === "delivered"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-green-50 text-green-700 hover:bg-green-100"
              }`}
            >
              Delivered ({orders.filter(o => o.status === "delivered").length})
            </button>
            <button
              onClick={() => setFilter("cancelled")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === "cancelled"
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-red-50 text-red-700 hover:bg-red-100"
              }`}
            >
              Cancelled ({orders.filter(o => o.status === "cancelled").length})
            </button>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {searchTerm 
                ? "We couldn't find any orders matching your search. Try adjusting your search terms."
                : "You haven't placed any orders yet. Start shopping to see your orders here!"}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
            >
              <ShoppingBag size={18} />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {/* Order Header */}
                <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Package size={18} className="text-gray-500" />
                        <span className="font-semibold text-gray-900">{order.id}</span>
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                      {order.status === "delivered" && (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          Delivered on {formatDate(order.updatedAt)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(order.createdAt)}
                      </span>
                      <span className="text-gray-900 font-semibold">
                        ${order.total?.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items?.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg bg-gray-100 border border-gray-200"
                        />
                        <div className="flex-1">
                          <Link 
                            to={`/product/${item.id}`}
                            className="font-medium text-gray-900 hover:text-red-600 transition-colors"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">
                            Qty: {item.quantity} × ${item.price?.toFixed(2)}
                          </p>
                          {item.options && Object.keys(item.options).length > 0 && (
                            <div className="flex gap-2 mt-1">
                              {item.options.color && (
                                <div className="flex items-center gap-1">
                                  <span className="text-xs text-gray-400">Color:</span>
                                  <div 
                                    className="w-4 h-4 rounded-full border border-gray-300"
                                    style={{ backgroundColor: item.options.color }}
                                    title={item.options.color}
                                  />
                                </div>
                              )}
                              {item.options.size && (
                                <div className="flex items-center gap-1">
                                  <span className="text-xs text-gray-400">Size:</span>
                                  <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                                    {item.options.size}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          {order.status === "delivered" && !item.reviewed && (
                            <button
                              onClick={() => handleWriteReview(item)}
                              className="text-xs text-red-600 hover:text-red-700 mt-1 flex items-center gap-1"
                            >
                              <Star size={12} />
                              Write Review
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Shipping Info */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Truck size={14} />
                          <span>{order.shipping?.method || "Standard Shipping"}</span>
                        </div>
                        {order.trackingNumber && (
                          <button
                            onClick={() => handleTrackOrder(order.trackingNumber, order.carrier)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                          >
                            <Truck size={14} />
                            Track Package
                          </button>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                          <Eye size={16} />
                          {selectedOrder === order.id ? "Hide Details" : "View Details"}
                        </button>
                        <button
                          onClick={() => handleReorder(order)}
                          disabled={reordering}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                        >
                          <RefreshCw size={16} className={reordering ? "animate-spin" : ""} />
                          Reorder
                        </button>
                        <button
                          onClick={() => handleDownloadInvoice(order.id)}
                          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                          <Download size={16} />
                          <span className="hidden sm:inline">Invoice</span>
                        </button>
                        <button
                          onClick={() => handleContactSupport(order.id)}
                          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                          <MessageCircle size={16} />
                          <span className="hidden sm:inline">Help</span>
                        </button>
                      </div>
                    </div>

                    {/* Expanded Order Details */}
                    {selectedOrder === order.id && (
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Shipping Address */}
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                              <MapPin size={14} className="text-red-600" />
                              Shipping Address
                            </h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p className="font-medium">{order.shippingAddress?.fullName || order.shippingAddress?.name}</p>
                              <p>{order.shippingAddress?.addressLine1 || order.shippingAddress?.line1}</p>
                              {order.shippingAddress?.addressLine2 && (
                                <p>{order.shippingAddress.addressLine2}</p>
                              )}
                              <p>
                                {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode || order.shippingAddress?.zip}
                              </p>
                              <p className="text-gray-400 text-xs mt-2">
                                Ordered on {formatDateTime(order.createdAt)}
                              </p>
                            </div>
                          </div>

                          {/* Payment Info */}
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                              <CreditCard size={14} className="text-red-600" />
                              Payment Details
                            </h4>
                            <p className="text-sm text-gray-600">{order.paymentMethod || "Credit Card"}</p>
                            <div className="mt-2 space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal:</span>
                                <span className="font-medium">${order.subtotal?.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Shipping:</span>
                                <span className="font-medium">${order.shippingCost?.toFixed(2) || "0.00"}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Tax:</span>
                                <span className="font-medium">${order.tax?.toFixed(2)}</span>
                              </div>
                              <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold">
                                <span>Total:</span>
                                <span className="text-red-600">${order.total?.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Tracking Info */}
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-1">
                              <Truck size={14} className="text-red-600" />
                              Tracking Information
                            </h4>
                            {order.trackingNumber ? (
                              <div className="text-sm text-gray-600 space-y-1">
                                <p><span className="text-gray-500">Carrier:</span> {order.carrier || "Standard"}</p>
                                <p><span className="text-gray-500">Tracking #:</span> {order.trackingNumber}</p>
                                {order.estimatedDelivery && (
                                  <p><span className="text-gray-500">Est. Delivery:</span> {formatDate(order.estimatedDelivery)}</p>
                                )}
                                <button
                                  onClick={() => handleTrackOrder(order.trackingNumber, order.carrier)}
                                  className="text-red-600 hover:text-red-700 text-xs font-medium mt-2 inline-flex items-center gap-1"
                                >
                                  <Truck size={12} />
                                  Track Package →
                                </button>
                              </div>
                            ) : (
                              <div className="text-center py-4">
                                <AlertCircle size={24} className="text-gray-300 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">Tracking information will be available soon</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Need Help */}
                        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                            <HelpCircle size={12} />
                            Need help with this order?{" "}
                            <Link to="/contact" className="text-red-600 hover:underline font-medium">
                              Contact Support
                            </Link>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}