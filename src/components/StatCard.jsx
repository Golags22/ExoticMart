
import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function StatCard({ title, value, change, trend = "up", icon, color = "bg-red-600", subtext }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col justify-between">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
        {icon && (
          <div className={`${color} p-2.5 rounded-lg text-white shadow-sm`}>
            {icon}
          </div>
        )}
      </div>

      {change && (
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1">
            {trend === "up" ? (
              <ArrowUp size={14} className="text-green-600" />
            ) : (
              <ArrowDown size={14} className="text-red-600" />
            )}
            <span className={`text-xs font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
              {change}
            </span>
          </div>
          {subtext && <span className="text-xs text-gray-400">{subtext}</span>}
        </div>
      )}
    </div>
  );
}