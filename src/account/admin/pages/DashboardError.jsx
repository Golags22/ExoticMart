// src/account/admin/components/DashboardError.jsx
import React from "react";
import { AlertCircle } from "lucide-react";

export default function DashboardError({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <div className="bg-red-50 rounded-lg p-8 text-center max-w-md">
        <AlertCircle size={48} className="text-red-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Dashboard</h3>
        <p className="text-gray-600 mb-4">Something went wrong while fetching your dashboard data.</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}