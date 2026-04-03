// pages/NotFound.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Home, 
  ArrowLeft, 
  ShoppingBag, 
  Search,
  AlertCircle
} from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 Illustration */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-red-600 opacity-20">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <AlertCircle size={80} className="text-red-600 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                !
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Search Suggestions */}
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-3">You might be looking for:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link 
              to="/cosmetics" 
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              Cosmetics
            </Link>
            <Link 
              to="/jewelry" 
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              Jewelry
            </Link>
            <Link 
              to="/clothing" 
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              Clothing
            </Link>
            <Link 
              to="/accessories" 
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              Accessories
            </Link>
            <Link 
              to="/best-sellers" 
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              Best Sellers
            </Link>
            <Link 
              to="/new-arrivals" 
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              New Arrivals
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-red-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">Or search for products:</p>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const searchInput = e.target.elements.search.value;
              if (searchInput.trim()) {
                window.location.href = `/search?q=${encodeURIComponent(searchInput)}`;
              }
            }}
            className="max-w-md mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search products..."
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-red-600"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}