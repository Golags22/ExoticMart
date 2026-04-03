import { Route } from "react-router-dom";
import { AdminLayout } from "../layouts";
import AdminRoute from "./AdminRoute";
import { AdminDashboard, AdminProducts, AdminOrders } from "../account/admin/pages";
import AdminProductAdd from "../account/admin/pages/AdminProductAdd/AdminProductAdd";
import Customers from "../account/admin/pages/customers/Customers";
import Setting from "../account/admin/pages/AdminSetting/Setting";
import Notification from "../account/admin/pages/Notification";
import ProductEdit from "../account/admin/pages/AdminProductAdd/components/ProductEdit";
import Users from "../account/admin/pages/Adminsidebar/Users";
import NotificationDetails from "../account/admin/pages/NotificationDetails";

const AdminRoutes = (
  <Route
    path="/admin"
    element={
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    }
  >
    <Route path="dashboard" element={<AdminDashboard />} />
    
    {/* Products Routes - Grouped together */}
    <Route path="products" element={<AdminProducts />} />
    <Route path="products/add" element={<AdminProductAdd />} />
    <Route path="products/edit/:id" element={<ProductEdit />} />
    
    {/* Other routes */}
    <Route path="orders" element={<AdminOrders />} />
    <Route path="customers" element={<Customers />} />
    <Route path="setting" element={<Setting />} />
    <Route path="notifications" element={<Notification />} />
    <Route path="users" element={<Users/>} />
    <Route path="notifications/:id" element={<NotificationDetails/>} />
  </Route>
);

export default AdminRoutes;