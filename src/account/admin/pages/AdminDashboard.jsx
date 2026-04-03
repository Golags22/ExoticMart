// src/account/admin/pages/AdminDashboard.jsx
import { useAuth } from "../../../context/AuthContext";
import { useDashboardData } from "../../../hooks/useDashboardData";
import StatCard from "../../../components/StatCard";
import RecentOrdersTable from "../../../components/RecentOrdersTable";
import TopProductsList from "../../../components/TopProductsList";
import QuickActions from "../pages/QuickActions";
import DashboardLoader from "../pages/DashboardLoader";
import DashboardError from "../pages/DashboardError";

export default function AdminDashboard() {
  const { userProfile } = useAuth();
  const { stats, recentOrders, topProducts, loading, error, refresh } = useDashboardData();

  if (loading) return <DashboardLoader />;
  if (error) return <DashboardError onRetry={refresh} />;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {userProfile?.fullName }</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Revenue" value={`$${stats.totalSales}`} />
        <StatCard title="Total Orders" value={stats.totalOrders} />
        <StatCard title="Total Products" value={stats.totalProducts} />
        <StatCard title="Total Customers" value={stats.totalUsers} />
        <StatCard title="Average Order Value" value={`$${stats.averageOrderValue.toFixed(2)}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentOrdersTable orders={recentOrders} />
        <TopProductsList products={topProducts} stats={stats} />
      </div>

      <QuickActions />
    </div>
  );
}