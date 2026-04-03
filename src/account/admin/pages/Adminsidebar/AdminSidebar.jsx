import { useState, useEffect } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarProfile from "./SidebarProfile";
import SidebarNav from "./SidebarNav";
import SidebarFooter from "./SidebarFooter";

export default function AdminSidebar({ collapsed, onToggle }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768 && !collapsed) {
        onToggle();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [collapsed, onToggle]);

  return (
    <>
      {isMobile && !collapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={onToggle}
        />
      )}

      <aside className={`${collapsed ? "w-20" : "w-72"} h-screen flex flex-col bg-white border-r`}>
        <SidebarHeader collapsed={collapsed} onToggle={onToggle} />
       
        <SidebarNav collapsed={collapsed} />
         {!collapsed && <SidebarProfile />}
        <SidebarFooter collapsed={collapsed} />
      </aside>
    </>
  );
}