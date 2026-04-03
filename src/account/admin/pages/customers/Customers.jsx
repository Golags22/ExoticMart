import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, where, doc, updateDoc } from 'firebase/firestore';
import { FiSearch, FiFilter, FiMail, FiPhone, FiCalendar, FiDollarSign, FiUser, FiDownload, FiStar, FiUsers, FiAlertCircle } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../../../backend/firebase';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeCustomers: 0,
    totalRevenue: 0,
    averageSpent: 0
  });

  // Fetch customers from Firestore
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching users from Firestore...");
      
      // Try different approaches to get users
      const usersRef = collection(db, "customers");
      
      // First, try to get all users without any filters to see what's in the collection
      const allUsersQuery = query(usersRef);
      const allUsersSnapshot = await getDocs(allUsersQuery);
      
      console.log("Total users in collection:", allUsersSnapshot.size);
      
      if (allUsersSnapshot.size === 0) {
        setError("No users found in the database. Please add some users first.");
        setLoading(false);
        return;
      }
      
      // Now try with role filter
      const q = query(usersRef, where("role", "in", ["user", "customer"]));
      const querySnapshot = await getDocs(q);
      
      console.log("Users with role 'user' or 'customer':", querySnapshot.size);
      
      const customersData = [];
      
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        console.log("User data:", doc.id, userData);
        
        customersData.push({
          id: doc.id,
          name: userData.displayName || userData.name || userData.fullName || "Anonymous User",
          email: userData.email || "",
          phone: userData.phone || userData.phoneNumber || userData.mobile || "Not provided",
          totalSpent: userData.totalSpent || userData.totalPurchases || 0,
          orders: userData.totalOrders || userData.orderCount || 0,
          joinDate: userData.createdAt?.toDate?.() || new Date(userData.createdAt) || new Date(),
          status: userData.status || userData.isActive === false ? "inactive" : "active",
          avatar: userData.photoURL || `https://ui-avatars.com/api/?background=dc2626&color=fff&name=${encodeURIComponent(userData.displayName || userData.name || "User")}`,
          address: userData.address || userData.shippingAddress || "",
          lastLogin: userData.lastLogin?.toDate?.() || userData.lastLogin || null,
          role: userData.role || "user"
        });
      });
      
      console.log("Processed customers:", customersData.length);
      
      if (customersData.length === 0) {
        // If no users with role filter, try showing all users
        console.log("No users with role filter, showing all users...");
        allUsersSnapshot.forEach((doc) => {
          const userData = doc.data();
          customersData.push({
            id: doc.id,
            name: userData.displayName || userData.name || userData.fullName || "Anonymous User",
            email: userData.email || "",
            phone: userData.phone || userData.phoneNumber || "Not provided",
            totalSpent: userData.totalSpent || 0,
            orders: userData.totalOrders || 0,
            joinDate: userData.createdAt?.toDate?.() || new Date(userData.createdAt) || new Date(),
            status: userData.status || "active",
            avatar: userData.photoURL || `https://ui-avatars.com/api/?background=dc2626&color=fff&name=${encodeURIComponent(userData.displayName || userData.name || "User")}`,
            address: userData.address || "",
            lastLogin: userData.lastLogin?.toDate?.() || null,
            role: userData.role || "user"
          });
        });
        
        console.log("All users loaded:", customersData.length);
        
        if (customersData.length === 0) {
          setError("No users found in the database.");
          setLoading(false);
          return;
        }
      }
      
      // Sort in JavaScript
      customersData.sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate));
      
      setCustomers(customersData);
      
      // Calculate statistics
      const totalCustomers = customersData.length;
      const activeCustomers = customersData.filter(c => c.status === "active").length;
      const totalRevenue = customersData.reduce((sum, c) => sum + (Number(c.totalSpent) || 0), 0);
      const averageSpent = totalCustomers > 0 ? (totalRevenue / totalCustomers).toFixed(2) : 0;
      
      setStats({
        totalCustomers,
        activeCustomers,
        totalRevenue,
        averageSpent
      });
      
      toast.success(`Loaded ${customersData.length} customers successfully!`);
      
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError(error.message);
      toast.error("Failed to load customers: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update customer status
  const updateCustomerStatus = async (customerId, newStatus) => {
    try {
      const userRef = doc(db, "users", customerId);
      await updateDoc(userRef, {
        status: newStatus,
        updatedAt: new Date()
      });
      
      // Update local state
      setCustomers(prev => prev.map(customer => 
        customer.id === customerId 
          ? { ...customer, status: newStatus }
          : customer
      ));
      
      // Update stats
      setStats(prev => ({
        ...prev,
        activeCustomers: newStatus === "active" 
          ? prev.activeCustomers + 1 
          : prev.activeCustomers - 1
      }));
      
      toast.success(`Customer ${newStatus === "active" ? "activated" : "deactivated"} successfully`);
    } catch (error) {
      console.error("Error updating customer status:", error);
      toast.error("Failed to update customer status");
    }
  };

  // Filter customers based on search and status
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5"></span>
        Inactive
      </span>
    );
  };

  const handleExport = () => {
    try {
      if (filteredCustomers.length === 0) {
        toast.error("No customers to export");
        return;
      }
      
      const exportData = filteredCustomers.map(customer => ({
        ID: customer.id,
        Name: customer.name,
        Email: customer.email,
        Phone: customer.phone,
        'Total Spent': customer.totalSpent,
        Orders: customer.orders,
        'Join Date': formatDate(customer.joinDate),
        Status: customer.status,
        Address: customer.address
      }));
      
      const csvContent = "data:text/csv;charset=utf-8," 
        + Object.keys(exportData[0]).join(",") + "\n"
        + exportData.map(row => Object.values(row).map(value => `"${value}"`).join(",")).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `customers_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`Exported ${filteredCustomers.length} customers successfully!`);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export data");
    }
  };

  const handleSendEmail = (email) => {
    if (!email || email === "Not provided") {
      toast.error("No email address available for this customer");
      return;
    }
    window.location.href = `mailto:${email}`;
    toast.info(`Opening email client for ${email}`);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    try {
      if (date.toDate) return date.toDate().toLocaleDateString();
      return new Date(date).toLocaleDateString();
    } catch (e) {
      return "Invalid Date";
    }
  };

  const formatCurrency = (amount) => {
    return `$${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Error State
  if (error && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full border border-red-100">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiAlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Customers</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchCustomers}
            className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Customers
              </h1>
              <p className="text-gray-600">Manage and view all your store customers</p>
            </div>
            <button
              onClick={handleExport}
              disabled={filteredCustomers.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiDownload className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Customers</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCustomers}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Active Customers</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeCustomers}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FiUser className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <FiDollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Average Spent</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.averageSpent)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FiStar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all outline-none"
              />
            </div>
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all outline-none bg-white appearance-none cursor-pointer"
              >
                <option value="all">All Customers</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-red-600 to-red-500">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Total Spent</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Orders</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Join Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-red-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={customer.avatar}
                          alt={customer.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{customer.name}</p>
                          <p className="text-sm text-gray-500">ID: {customer.id.slice(0, 8)}...</p>
                          {customer.role && (
                            <p className="text-xs text-gray-400">Role: {customer.role}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <FiMail className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate max-w-[200px]">{customer.email || "No email"}</span>
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <FiPhone className="w-3 h-3" />
                          {customer.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(customer.totalSpent)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{customer.orders}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <FiCalendar className="w-3 h-3" />
                        {formatDate(customer.joinDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(customer.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const newStatus = customer.status === 'active' ? 'inactive' : 'active';
                            updateCustomerStatus(customer.id, newStatus);
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${
                            customer.status === 'active'
                              ? 'text-red-600 hover:bg-red-100'
                              : 'text-green-600 hover:bg-green-100'
                          }`}
                          title={customer.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          {customer.status === 'active' ? '🔴' : '🟢'}
                        </button>
                        <button
                          onClick={() => handleSendEmail(customer.email)}
                          className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Send Email"
                          disabled={!customer.email || customer.email === "Not provided"}
                        >
                          <FiMail className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredCustomers.length === 0 && customers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="w-10 h-10 text-red-500" />
              </div>
              <p className="text-gray-500 text-lg">No customers found</p>
              <p className="text-gray-400 text-sm mt-1">There are no users in your database yet</p>
            </div>
          )}
          
          {filteredCustomers.length === 0 && customers.length > 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSearch className="w-10 h-10 text-red-500" />
              </div>
              <p className="text-gray-500 text-lg">No matching customers</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="rounded-xl shadow-lg border-l-4 border-red-500"
      />
    </div>
  );
};

export default Customers;