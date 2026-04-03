import { Store, ChevronLeft, ChevronRight } from "lucide-react";

export default function SidebarHeader({ collapsed, onToggle }) {
  return (
    <div className="flex items-center justify-between p-4 border-b relative">
      <div className="flex items-center gap-2">
        <Store />
        {!collapsed && <span>Exotic Mart</span>}
      </div>

      <button onClick={onToggle}>
        {collapsed ? <ChevronRight /> : <ChevronLeft />}
      </button>
    </div>
  );
}