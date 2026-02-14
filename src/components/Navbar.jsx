import React, { useState } from "react";
import { Search, ShoppingBag, Menu, X, ChevronDown, User } from "lucide-react";
import { categories } from "../data/data";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);


  const handleDropdownEnter = (id) => {
    setActiveDropdown(id);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const handleSearch =()=>{
    console.log("searching is working".value)
  }

  return (
    <nav className="bg-red-600 sticky top-0 z-50 shadow-md">
      {/* Main navbar - red background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Mobile menu button - white icon */}
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

          {/* Logo - image */}
          <div className="flex-1 flex justify-center lg:justify-start lg:flex-none p-5">
            <a href="/" className="flex items-center">
              <img 
                src="/logos/logo.svg" 
                alt="GlamHive" 
                className="h-[78px] sm:h-15 md:h- w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop navigation - white text on red */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1 xl:space-x-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(category.id)}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className="flex items-center px-3 py-2 text-sm font-medium text-white hover:text-white/90 rounded-md hover:bg-red-700 transition-colors"
                  onClick={() => (window.location.href = category.href)}
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
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right section - Search bar + icons */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            {/* Search bar - visible on all screens */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search products..."
                className="w-40 md:w-56 lg:w-64 pl-9 pr-3 py-1.5 text-sm bg-white/10 border border-white/30 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all"
              />
              <Search size={18} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-white/80" />
            </div>
            
            {/* Mobile search icon */}
            <button
              className="text-white hover:text-white/80 p-1 sm:hidden transition-colors"
              aria-label="Search"
              onClick={handleSearch}
            >
              <Search size={20} />
            </button>
            
            <button
              className="text-white hover:text-white/80 p-1 hidden sm:block transition-colors"
              aria-label="Account"
            >
              <User size={20} />
            </button>
            <button
              className="text-white hover:text-white/80 p-1 relative transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-white text-red-600 text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-sm">
                3
              </span>
            </button>
          </div>
        </div>
        
        {/* Mobile search bar - below header on mobile */}
        <div className="sm:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-white/10 border border-white/30 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all"
            />
            <Search size={18} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-white/80" />
          </div>
        </div>
      </div>

      {/* Mobile menu - white background with red accents */}
      <div
        className={`lg:hidden bg-white border-t border-gray-200 overflow-y-auto max-h-[calc(100vh-4rem)] transition-all duration-300 ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3 space-y-1">
          {categories.map((category) => (
            <MobileCategory
              key={category.id}
              category={category}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
          ))}
          <a
            href="/account"
            className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <User size={18} className="mr-3" />
            My Account
          </a>
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

// Mobile category component
const MobileCategory = ({ category, activeDropdown, setActiveDropdown }) => {
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
          <a
            href={category.href}
            className="block px-3 py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-md"
          >
            Shop All {category.name}
          </a>
          {category.items.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;