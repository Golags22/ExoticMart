import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  LogOut, 
  Heart, 
  Package, 
  Settings, 
  ChevronDown,
  UserCircle,
  ShoppingBag,
  Award,
  HelpCircle,
  Moon,
  Sun
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AccountMenu() {
  const { user, userProfile, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setOpen(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (userProfile?.displayName) {
      return userProfile.displayName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const getUserName = () => {
    if (userProfile?.displayName) return userProfile.displayName;
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  if (!user) {
    return (
      <Link
        to="/login"
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 group"
      >
        <User size={18} className="text-white group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium text-white hidden sm:inline">Login</span>
      </Link>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Account Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg
          transition-all duration-300
          ${open 
            ? "bg-white/20 shadow-lg" 
            : "hover:bg-white/10"
          }
        `}
      >
        {/* Avatar */}
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center shadow-md">
            <span className="text-white text-sm font-semibold">
              {getUserInitials()}
            </span>
          </div>
          {/* Online indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        </div>

        {/* User Name & Role */}
        <div className="hidden lg:block text-left">
          <p className="text-sm font-medium text-white">{getUserName()}</p>
                  </div>

        <ChevronDown 
          size={16} 
          className={`text-white transition-transform duration-300 hidden lg:block ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slideDown z-50">
          {/* User Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <UserCircle size={28} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold">{getUserName()}</p>
                <p className="text-white/80 text-xs">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {/* Stats Section */}
            <div className="px-5 py-3 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div className="text-center flex-1">
                  <p className="text-lg font-bold text-gray-800">0</p>
                  <p className="text-xs text-gray-500">Orders</p>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="text-center flex-1">
                  <p className="text-lg font-bold text-gray-800">0</p>
                  <p className="text-xs text-gray-500">Wishlist</p>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="text-center flex-1">
                  <p className="text-lg font-bold text-gray-800">0</p>
                  <p className="text-xs text-gray-500">Reviews</p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="py-2">
              <Link
                to="/account/orders"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group"
              >
                <Package size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                <span className="flex-1 text-sm">My Orders</span>
                <span className="text-xs text-gray-400">View all</span>
              </Link>

              <Link
                to="/account/wishlist"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group"
              >
                <Heart size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                <span className="flex-1 text-sm">Wishlist</span>
                <span className="text-xs text-gray-400">Saved items</span>
              </Link>

              <Link
                to="/account/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group"
              >
                <User size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                <span className="flex-1 text-sm">Profile Settings</span>
              </Link>

              <Link
                to="/account/addresses"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-5 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group"
              >
                <ShoppingBag size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                <span className="flex-1 text-sm">Addresses</span>
              </Link>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-1" />

          

            {/* Divider */}
            <div className="border-t border-gray-100 my-1" />

            {/* Logout Button */}
            <div className="py-1">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-2.5 text-red-600 hover:bg-red-50 transition-colors group"
              >
                <LogOut size={18} className="text-red-500 group-hover:scale-110 transition-transform" />
                <span className="flex-1 text-left text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Footer Note */}
          <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Exotic Mart — Premium Shopping Experience
            </p>
          </div>
        </div>
      )}

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}