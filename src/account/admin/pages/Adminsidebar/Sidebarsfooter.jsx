 import { LogOut } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";

export default function SidebarsFooter({ collapsed }) {
  const { logout } = useAuth();

  return (
    <div className="p-4 border-t">
      <button
        onClick={logout}
        className="flex items-center gap-3 w-full p-3 hover:bg-red-50 rounded-lg"
      >
        <LogOut size={20} />
        {!collapsed && <span>Logout</span>}
      </button>
    </div>
  );
}