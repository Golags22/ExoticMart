import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../account/admin/pages";
import { useState } from "react";

export default function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex" }}>
       <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}