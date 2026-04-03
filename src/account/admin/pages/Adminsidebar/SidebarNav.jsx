// src/account/admin/components/SidebarNav.jsx
import SidebarLink from "./SidebarLink";
import { LayoutDashboard, Package, Users, Settings, BellRing, ShoppingCart, User } from "lucide-react";
import { useNotifications } from "../../../../hooks/useNotifications";

const links = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Customers", path: "/admin/customers", icon: Users },
  { name: "Notifications", path: "/admin/notifications", icon: BellRing },
  { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { name: "Settings", path: "/admin/setting", icon: Settings },
  // { name: "users", path: "/admin/users", icon: User },
];

export default function SidebarNav({ collapsed }) {
  const { notifications } = useNotifications();

  // Count unread notifications (not deleted)
  const unreadCount = notifications?.filter(n => !n.read && !n.deleted)?.length || 0;

  return (
    <nav className="flex-1 p-4 space-y-2">
      {links.map((link) => (
        <SidebarLink
          key={link.name}
          link={link}
          collapsed={collapsed}
          badgeCount={link.name === "Notifications" ? unreadCount : 0}
        />
      ))}
    </nav>
  );
}