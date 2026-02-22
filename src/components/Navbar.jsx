import React, { useState } from "react";
import { Search, ShoppingBag, Menu, X, ChevronDown, User, LogOut, Heart, Package, MapPin, Settings } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

// Import routes and categories
import { routes} from "../routes";
import { categories } from "../data/data";

export default function Navbar (){
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  const { user, userProfile, logout } = useAuth();
  const { getCartCount } = useCart();

  const handleDropdownEnter = (id) => {
    setActiveDropdown(id);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getNavRoutes = () => {
    return routes.filter((r) => r.showInNav === true && r.title);
  };

  const navRoutes = getNavRoutes();
  const cartCount = getCartCount();

  return (
    <nav className="bg-red-600 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-white/80 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 flex justify-center lg:justify-start lg:flex-none">
            <Link to="/" className="flex items-center">
              <img 
                src="/logos/logo.svg" 
                alt="Exotic Mart" 
                className="h-12 sm:h-14 md:h-16 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1 xl:space-x-2">
            {navRoutes.map((r) => (
              <Link
                key={r.path}
                to={r.path}
                className={`relative group flex items-center text-white hover:text-white/90 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  location.pathname === r.path ? "bg-red-700" : "hover:bg-red-700"
                }`}
              >
                {r.title}
              </Link>
            ))}
            
            {/* Category dropdowns */}
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(category.id)}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className="flex items-center px-3 py-2 text-sm font-medium text-white hover:text-white/90 rounded-md hover:bg-red-700 transition-colors"
                  onClick={() => navigate(category.href)}
                >
                  {category.name}
                  <ChevronDown
                    size={16}
                    className={`ml-1 transition-all ${
                      activeDropdown === category.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === category.id && (
                  <div className="absolute top-full left-0 w-56 bg-white rounded-md shadow-lg py-2 border border-gray-100 animate-fadeIn">
                    {category.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            {/* Search bar */}
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-40 md:w-56 lg:w-64 pl-9 pr-3 py-1.5 text-sm bg-white/10 border border-white/30 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all"
              />
              <button type="submit" className="absolute left-2.5 top-1/2 transform -translate-y-1/2">
                <Search size={18} className="text-white/80" />
              </button>
            </form>
            
            {/* Mobile search icon */}
            <button
              className="text-white hover:text-white/80 p-1 sm:hidden transition-colors"
              aria-label="Search"
              onClick={() => navigate('/search')}
            >
              <Search size={20} />
            </button>
            
            {/* User account dropdown */}
            <div className="hidden sm:relative sm:block">
              {user ? (
                <div className="relative group">
                  <button
                    className="text-white hover:text-white/80 p-1 flex items-center gap-1"
                    aria-label="Account"
                  >
                    <User size={20} />
                    <span className="text-sm hidden lg:inline">
                      {userProfile?.displayName || user.email?.split('@')[0]}
                    </span>
                  </button>
                  
                  {/* Account menu - essential only */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                      My Account
                    </div>
                    
                    <Link
                      to="/account/orders"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                    >
                      <Package size={16} />
                      My Orders
                    </Link>
                    
                    <Link
                      to="/account/wishlist"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                    >
                      <Heart size={16} />
                      Wishlist
                    </Link>
                    
                    <Link
                      to="/account/addresses"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                    >
                      <MapPin size={16} />
                      Saved Addresses
                    </Link>
                    
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                    >
                      <Settings size={16} />
                      Profile Settings
                    </Link>
                    
                    <div className="border-t border-gray-100 my-1"></div>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/users/login"
                  className="text-white hover:text-white/80 p-1 hidden sm:block transition-colors"
                  aria-label="Login"
                >
                  <User size={20} />
                </Link>
              )}
            </div>

            {/* Cart button */}
            <Link
              to="/Cart"
              className="text-white hover:text-white/80 p-1 relative transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-red-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
        
        {/* Mobile search bar */}
        <div className="sm:hidden pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-white/10 border border-white/30 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all"
            />
            <button type="submit" className="absolute left-2.5 top-1/2 transform -translate-y-1/2">
              <Search size={18} className="text-white/80" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden bg-white border-t border-gray-200 overflow-y-auto max-h-[calc(100vh-4rem)] transition-all duration-300 ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3 space-y-1">
          {navRoutes.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          
          {categories.map((category) => (
            <MobileCategory
              key={category.id}
              category={category}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              closeMenu={() => setIsMobileMenuOpen(false)}
            />
          ))}
          
          {user ? (
            <>
              <div className="px-3 py-3 text-sm font-medium text-gray-500 border-b border-gray-100">
                Logged in as: {userProfile?.displayName || user.email}
              </div>
              
              <Link
                to="/account/orders"
                className="flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Package size={18} />
                My Orders
              </Link>
              
              <Link
                to="/account/wishlist"
                className="flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart size={18} />
                Wishlist
              </Link>
              
              <Link
                to="/account/addresses"
                className="flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MapPin size={18} />
                Saved Addresses
              </Link>
              
              <Link
                to="/account/profile"
                className="flex items-center gap-3 px-3 py-3 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings size={18} />
                Profile Settings
              </Link>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/users/login"
                className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={18} className="mr-3" />
                Login
              </Link>
              <Link
                to="/users/signup"
                className="block px-3 py-3 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors border border-red-200 mt-2 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};

// Mobile category component (unchanged)
const MobileCategory = ({ category, activeDropdown, setActiveDropdown, closeMenu }) => {
  const isOpen = activeDropdown === category.id;

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => {
          setActiveDropdown(isOpen ? null : category.id);
        }}
        className="flex items-center justify-between w-full px-3 py-3 text-base font-medium text-gray-800 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
      >
        <span>{category.name}</span>
        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pl-4 pb-2 space-y-1">
          <Link
            to={category.href}
            className="block px-3 py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-md"
            onClick={closeMenu}
          >
            Shop All {category.name}
          </Link>
          {category.items.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md"
              onClick={closeMenu}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};