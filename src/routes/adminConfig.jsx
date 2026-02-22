// config/adminConfig.js
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag 
} from "lucide-react";

// Import components
import AdminDashboard from "../account/admin/pages/AdminDashboard";
import AdminProducts from "../account/admin/pages/AdminProducts";
import AdminOrders from "../account/admin/pages/AdminOrders";

export const adminMenuItems = [
  { 
    path: "/admin/dashboard", 
    icon: <LayoutDashboard size={20} />, 
    label: "Dashboard",
    component: AdminDashboard
  },
  { 
    path: "/admin/products", 
    icon: <Package size={20} />, 
    label: "Products",
    component: AdminProducts
  },
  { 
    path: "/admin/orders", 
    icon: <ShoppingBag size={20} />, 
    label: "Orders",
    component: AdminOrders
  },
];