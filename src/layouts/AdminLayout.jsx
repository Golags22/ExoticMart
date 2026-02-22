// layouts/AdminLayout.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, Menu, ChevronDown, Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { adminMenuItems } from "../routes/adminConfig"; // ✅ Import config

export default function AdminLayout() {
  const { user, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Get current component
  const CurrentComponent = adminMenuItems.find(
    item => location.pathname === item.path
  )?.component || adminMenuItems[0].component;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <Link to="/admin/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-red-600">Exotic</span>
            <span className="text-xl font-light text-gray-900">Mart</span>
            <span className="ml-2 text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">Admin</span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          <ul className="space-y-1">
            {adminMenuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 w-full"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-semibold text-gray-800">
              {adminMenuItems.find(item => location.pathname === item.path)?.label || "Dashboard"}
            </h2>
          </div>
        </header>

        {/* Render the current component */}
        <main className="p-4 sm:p-6 lg:p-8">
          <CurrentComponent />
        </main>
      </div>
    </div>
  );
}