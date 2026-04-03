// src/account/admin/components/QuickActions.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingBag, Users, TrendingUp } from "lucide-react";

export default function QuickActions() {
  const actions = [
    { title: "Add Product", path: "/admin/products/add", icon: <Package size={20} /> },
    { title: "View Orders", path: "/admin/orders", icon: <ShoppingBag size={20} /> },
    { title: "Manage Users", path: "/admin/users", icon: <Users size={20} /> },
    { title: "View Reports", path: "/admin/reports", icon: <TrendingUp size={20} /> },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, i) => (
          <Link
            key={i}
            to={action.path}
            className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors group"
          >
            {React.cloneElement(action.icon, { className: "text-gray-400 group-hover:text-red-600" })}
            <span className="text-sm font-medium text-gray-700 group-hover:text-red-600">{action.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}