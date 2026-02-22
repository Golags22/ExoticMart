import React, { useState } from "react";
import { Star, ShoppingBag, Heart, Filter, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "../data/data";

export default function Cosmetics() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState([0, 100]);

  // Filter products to show only cosmetics
  const cosmeticsProducts = products.filter(product => 
    product.category === "cosmetics" || 
    product.name.toLowerCase().includes("lipstick") ||
    product.name.toLowerCase().includes("foundation") ||
    product.name.toLowerCase().includes("eyeshadow") ||
    product.name.toLowerCase().includes("moisturizer") ||
    product.name.toLowerCase().includes("serum")
  );

  // Get unique brands for filter
  const brands = [...new Set(cosmeticsProducts.map(p => p.brand))];

  // Sort products
  const sortProducts = (products) => {
    switch(sortBy) {
      case "price-low":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...products].sort((a, b) => b.price - a.price);
      case "rating":
        return [...products].sort((a, b) => b.rating - a.rating);
      default:
        return products;
    }
  };

  // Filter products
  const filteredProducts = cosmeticsProducts.filter(product => {
    if (selectedCategory !== "all") {
      const categoryMatch = 
        (selectedCategory === "face" && (product.name.toLowerCase().includes("foundation") || product.name.toLowerCase().includes("moisturizer"))) ||
        (selectedCategory === "eyes" && product.name.toLowerCase().includes("eye")) ||
        (selectedCategory === "lips" && product.name.toLowerCase().includes("lip")) ||
        (selectedCategory === "nails" && product.name.toLowerCase().includes("nail"));
      if (!categoryMatch) return false;
    }
    
    if (selectedBrand !== "all" && product.brand !== selectedBrand) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    
    return true;
  });

  const sortedAndFiltered = sortProducts(filteredProducts);

  const handleAddToCart = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    const product = products.find(p => p.id === productId);
    setCart(prev => [...prev, product]);
  };

  const toggleWishlist = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={14}
        className={`${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const categories = [
    { id: "all", name: "All Cosmetics", icon: "💄" },
    { id: "face", name: "Face", icon: "✨" },
    { id: "eyes", name: "Eyes", icon: "👁️" },
    { id: "lips", name: "Lips", icon: "💋" },
    { id: "nails", name: "Nails", icon: "💅" }
  ];

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-pink-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-pink-200" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Cosmetics Collection
            </h1>
            <p className="text-pink-100 max-w-2xl mx-auto">
              Discover our premium range of face, eye, and lip products. 
              From everyday essentials to luxury favorites.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
          >
            <Filter size={18} />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Category Pills - Quick Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button 
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedBrand("all");
                    setPriceRange([0, 100]);
                  }}
                  className="text-xs text-red-600 hover:text-red-700"
                >
                  Reset All
                </button>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Brand</h4>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="all">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range ($)</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Min"
                    min="0"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Max"
                    min="0"
                  />
                </div>
              </div>

              {/* Filter Stats */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  {sortedAndFiltered.length} products found
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <p className="text-sm text-gray-500 mb-3 sm:mb-0">
                Showing {sortedAndFiltered.length} {sortedAndFiltered.length === 1 ? 'product' : 'products'}
              </p>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-500">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {sortedAndFiltered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedAndFiltered.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {product.badge && (
                        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {product.badge}
                        </div>
                      )}
                      
                      <button
                        onClick={(e) => toggleWishlist(product.id, e)}
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors z-10"
                      >
                        <Heart
                          size={18}
                          className={`${
                            wishlist.includes(product.id)
                              ? "fill-red-600 text-red-600"
                              : "text-gray-600"
                          }`}
                        />
                      </button>

                      {/* Color indicators */}
                      {product.colors && product.colors.length > 0 && (
                        <div className="absolute bottom-3 left-3 flex gap-1">
                          {product.colors.slice(0, 3).map((color, index) => (
                            <div
                              key={index}
                              className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: color }}
                              title="Shade option"
                            />
                          ))}
                          {product.colors.length > 3 && (
                            <div className="w-5 h-5 rounded-full bg-gray-800 border-2 border-white shadow-sm flex items-center justify-center">
                              <span className="text-white text-[8px] font-bold">+{product.colors.length - 3}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">{renderStars(product.rating)}</div>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                        {product.originalPrice && (
                          <>
                            <span className="text-sm text-gray-400 line-through">
                              ${product.originalPrice}
                            </span>
                            <span className="text-xs text-green-600 font-medium">
                              Save ${product.originalPrice - product.price}
                            </span>
                          </>
                        )}
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(product.id, e)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                      >
                        <ShoppingBag size={18} />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No products found matching your filters.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedBrand("all");
                    setPriceRange([0, 100]);
                  }}
                  className="mt-4 text-red-600 font-medium hover:text-red-700"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Beauty Tips Section */}
        <div className="mt-16 bg-gradient-to-r from-pink-50 to-red-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Beauty Tips & Tricks</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600">✨</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Prep Your Skin</h4>
                <p className="text-sm text-gray-600">Always start with clean, moisturized skin for better application</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600">🪄</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Less is More</h4>
                <p className="text-sm text-gray-600">Build coverage gradually for a natural, flawless finish</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600">🧴</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Clean Your Tools</h4>
                <p className="text-sm text-gray-600">Wash brushes weekly to prevent bacteria buildup</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}