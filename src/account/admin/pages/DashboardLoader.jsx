// src/account/admin/components/DashboardLoader.jsx
import React from "react";
import { Package } from "lucide-react";

export default function DashboardLoader() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
          <Package className="w-6 h-6 text-red-600 absolute top-5 left-1/2 transform -translate-x-1/2" />
        </div>
        <p className="text-gray-600 font-medium">Loading dashboard...</p>
        <p className="text-sm text-gray-400 mt-2">Fetching your store data</p>
      </div>
    </div>
  );
}