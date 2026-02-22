// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users,
  Package,
  Clock,
  ArrowUp,
  ArrowDown,
  MoreVertical
} from "lucide-react";
import { db } from "../../../backend/firebase";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    pendingOrders: 0,
    lowStock: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Get total orders
      const ordersSnap = await getDocs(collection(db, "orders"));
      const orders = ordersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Get total products
      const productsSnap = await getDocs(collection(db, "products"));
      
      // Get total users
      const usersSnap = await getDocs(collection(db, "users"));
      
      // Calculate stats
      const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0);
      const pendingOrders = orders.filter(o => o.status === "pending").length;
      
      setStats({
        totalSales,
        totalOrders: orders.length,
        totalProducts: productsSnap.size,
        totalUsers: usersSnap.size,
        pendingOrders,
        lowStock: 5 // Mock data - implement real low stock check
      });

      // Get recent orders
      const recentQuery = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc"),
        limit(5)
      );
      const recentSnap = await getDocs(recentQuery);
      setRecentOrders(recentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Sales",
      value: `$${stats.totalSales.toFixed(2)}`,
      icon: <DollarSign size={24} />,
      change: "+12.5%",
      trend: "up",
      color: "bg-green-500"
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <ShoppingBag size={24} />,
      change: "+8.2%",
      trend: "up",
      color: "bg-blue-500"
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: <Package size={24} />,
      change: "+3",
      trend: "up",
      color: "bg-purple-500"
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users size={24} />,
      change: "+15",
      trend: "up",
      color: "bg-yellow-500"
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: <Clock size={24} />,
      change: stats.pendingOrders > 0 ? "+2" : "0",
      trend: stats.pendingOrders > 0 ? "up" : "down",
      color: "bg-orange-500"
    },
    {
      title: "Low Stock Items",
      value: stats.lowStock,
      icon: <Package size={24} />,
      change: "-1",
      trend: "down",
      color: "bg-red-500"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-2 rounded-lg text-white`}>
                {stat.icon}
              </div>
            </div>
            <div className="flex items-center mt-3">
              {stat.trend === "up" ? (
                <ArrowUp size={14} className="text-green-600" />
              ) : (
                <ArrowDown size={14} className="text-red-600" />
              )}
              <span className={`text-xs ml-1 ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {stat.change}
              </span>
              <span className="text-xs text-gray-500 ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <Link
            to="/admin/orders"
            className="text-sm text-red-600 hover:text-red-700"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id.slice(-8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {order.shippingAddress?.fullName || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${order.total?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === "delivered" ? "bg-green-100 text-green-700" :
                      order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                      order.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <button className="text-red-600 hover:text-red-700">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}