import { useState, useEffect, useCallback } from "react";
import { db } from "../backend/firebase";
import { collection, getDocs, query, orderBy, limit, Timestamp } from "firebase/firestore";

export const useDashboardData = () => {
  const [stats, setStats] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const ordersSnap = await getDocs(collection(db, "orders"));
      const orders = ordersSnap.docs.map(doc => ({ id: doc.id, ...doc.data(), createdAt: doc.data().createdAt?.toDate?.() || new Date() }));

      const productsSnap = await getDocs(collection(db, "products"));
      const products = productsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const usersSnap = await getDocs(collection(db, "users"));

      const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
      const pendingOrders = orders.filter(o => o.status === "pending").length;
      const processingOrders = orders.filter(o => o.status === "processing").length;
      const shippedOrders = orders.filter(o => o.status === "shipped").length;
      const deliveredOrders = orders.filter(o => o.status === "delivered").length;
      const cancelledOrders = orders.filter(o => o.status === "cancelled").length;
      const averageOrderValue = orders.length > 0 ? totalSales / orders.length : 0;

      // Top products
      const productSales = {};
      orders.forEach(o => {
        o.items?.forEach(item => {
          const key = item.id || item.name;
          if (!productSales[key]) productSales[key] = { ...item, quantity: 0, revenue: 0 };
          productSales[key].quantity += item.quantity || 1;
          productSales[key].revenue += (item.price || 0) * (item.quantity || 1);
        });
      });
      const topProductsList = Object.values(productSales).sort((a, b) => b.quantity - a.quantity).slice(0, 5);

      // Recent orders
      const recentQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"), limit(10));
      const recentSnap = await getDocs(recentQuery);
      const recentOrdersList = recentSnap.docs.map(doc => ({ id: doc.id, ...doc.data(), createdAt: doc.data().createdAt?.toDate?.() || new Date() }));

      setStats({
        totalSales,
        totalOrders: orders.length,
        totalProducts: products.length,
        totalUsers: usersSnap.size,
        pendingOrders,
        processingOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,
        averageOrderValue,
        todaySales: 0,
        weekSales: 0,
        monthSales: 0,
      });
      setRecentOrders(recentOrdersList);
      setTopProducts(topProductsList);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error fetching dashboard data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { stats, recentOrders, topProducts, loading, error, refresh: fetchData, refreshing };
};