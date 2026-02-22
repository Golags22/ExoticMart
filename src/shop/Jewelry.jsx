import React, { useState } from "react";
import { Star, ShoppingBag, Heart, Filter, Gem } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "../data/data";

export default function Jewelry(){
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMaterial, setSelectedMaterial] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState([0, 500]);

  // Filter products to show only jewelry
  const jewelryProducts = products.filter(product => 
    product.category === "jewelry" || 
    product.name.toLowerCase().includes("necklace") ||
    product.name.toLowerCase().includes("earrings") ||
    product.name.toLowerCase().includes("ring") ||
    product.name.toLowerCase().includes("bracelet") ||
    product.name.toLowerCase().includes("chain")
  );

  // Get unique materials/colors for filter
  const materials = [...new Set(jewelryProducts.flatMap(p => p.colors || []))];

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
  const filteredProducts = jewelryProducts.filter(product => {
    if (selectedCategory !== "all") {
      const categoryMatch = 
        (selectedCategory === "necklaces" && product.name.toLowerCase().includes("necklace")) ||
        (selectedCategory === "earrings" && product.name.toLowerCase().includes("earring")) ||
        (selectedCategory === "rings" && product.name.toLowerCase().includes("ring")) ||
        (selectedCategory === "bracelets" && product.name.toLowerCase().includes("bracelet")) ||
        (selectedCategory === "watches" && product.name.toLowerCase().includes("watch"));
      if (!categoryMatch) return false;
    }
    
    if (selectedMaterial !== "all" && product.colors) {
      if (!product.colors.some(color => 
        color.toLowerCase().includes(selectedMaterial.toLowerCase())
      )) return false;
    }
    
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
    { id: "all", name: "All Jewelry", icon: "💎" },
    { id: "necklaces", name: "Necklaces", icon: "📿" },
    { id: "earrings", name: "Earrings", icon: "💫" },
    { id: "rings", name: "Rings", icon: "💍" },
    { id: "bracelets", name: "Bracelets", icon: "🔗" },
    { id: "watches", name: "Watches", icon: "⌚" }
  ];

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center">
            <Gem className="w-12 h-12 mx-auto mb-4 text-amber-200" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Fine Jewelry Collection
            </h1>
            <p className="text-amber-100 max-w-2xl mx-auto">
              Discover timeless elegance with our curated selection of necklaces, earrings, rings, and watches. 
              From everyday essentials to statement pieces.
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
                    setSelectedMaterial("all");
                    setPriceRange([0, 500]);
                  }}
                  className="text-xs text-red-600 hover:text-red-700"
                >
                  Reset All
                </button>
              </div>

              {/* Material/Metal Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Metal/Material</h4>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="all">All Materials</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="rose">Rose Gold</option>
                  <option value="platinum">Platinum</option>
                  <option value="pearl">Pearl</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Min"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Max"
                  />
                </div>
              </div>

              {/* Filter Stats */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  {sortedAndFiltered.length} pieces found
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <p className="text-sm text-gray-500 mb-3 sm:mb-0">
                Showing {sortedAndFiltered.length} {sortedAndFiltered.length === 1 ? 'piece' : 'pieces'}
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
                        <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full">
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

                      {/* Material indicators */}
                      {product.colors && (
                        <div className="absolute bottom-3 left-3 flex gap-1">
                          {product.colors.slice(0, 2).map((color, index) => (
                            <div
                              key={index}
                              className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: color }}
                              title="Material option"
                            />
                          ))}
                          {product.colors.length > 2 && (
                            <div className="w-5 h-5 rounded-full bg-gray-800 border-2 border-white shadow-sm flex items-center justify-center">
                              <span className="text-white text-[8px] font-bold">+{product.colors.length - 2}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600">
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
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
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
                <Gem className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No jewelry pieces found matching your filters.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedMaterial("all");
                    setPriceRange([0, 500]);
                  }}
                  className="mt-4 text-amber-600 font-medium hover:text-amber-700"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Jewelry Care Section */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Jewelry Care Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-amber-600">✨</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Store Properly</h4>
                <p className="text-sm text-gray-600">Keep pieces in separate pouches to prevent scratching</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-amber-600">💧</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Avoid Moisture</h4>
                <p className="text-sm text-gray-600">Remove before swimming, showering, or exercising</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-amber-600">🧼</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Clean Gently</h4>
                <p className="text-sm text-gray-600">Use soft cloth and mild soap for regular cleaning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
