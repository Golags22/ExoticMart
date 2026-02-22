// pages/shop/CategoryPage.jsx
import React, { useState, useEffect } from "react";
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Filter, 
  X,
  ChevronDown,
  Sparkles,
  Gem,
  Flower2,
  Shirt,
  Watch
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { products, categories } from "../routes/routes";

export default function CategoryPage() {
  const { categoryId, subcategoryId } = useParams();
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(subcategoryId || "all");
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Find the current category from navbar data
  const currentCategory = categories.find(cat => cat.id === categoryId);
  
  // Find the current subcategory if it exists
  const currentSubcategory = currentCategory?.items.find(
    item => item.href === `/${categoryId}/${subcategoryId}`
  );

  // Update selected subcategory when URL changes
  useEffect(() => {
    setSelectedSubcategory(subcategoryId || "all");
  }, [subcategoryId]);

  // Category display info with red/white theme
  const categoryInfo = {
    cosmetics: {
      title: "Cosmetics Collection",
      description: "Discover our premium range of face, eye, and lip products.",
      gradient: "from-red-500 to-red-600",
      icon: <Sparkles className="w-12 h-12 text-white" />,
      color: "red",
      secondaryColor: "pink"
    },
    hair: {
      title: "Hair Care Collection",
      description: "Professional-grade products for beautiful, healthy hair.",
      gradient: "from-red-600 to-red-700",
      icon: <Flower2 className="w-12 h-12 text-white" />,
      color: "red",
      secondaryColor: "rose"
    },
    jewelry: {
      title: "Fine Jewelry Collection",
      description: "Timeless elegance with our curated selection of jewelry pieces.",
      gradient: "from-red-500 to-amber-600",
      icon: <Gem className="w-12 h-12 text-white" />,
      color: "red",
      secondaryColor: "amber"
    },
    clothing: {
      title: "Fashion Collection",
      description: "Trend-forward styles for every occasion.",
      gradient: "from-red-600 to-red-800",
      icon: <Shirt className="w-12 h-12 text-white" />,
      color: "red",
      secondaryColor: "slate"
    },
    accessories: {
      title: "Accessories Collection",
      description: "Complete your look with our stylish accessories.",
      gradient: "from-red-500 to-red-600",
      icon: <Watch className="w-12 h-12 text-white" />,
      color: "red",
      secondaryColor: "gray"
    }
  };

  const info = categoryInfo[categoryId] || {
    title: `${currentCategory?.name || "Category"} Collection`,
    description: "Explore our curated selection of products.",
    gradient: "from-red-600 to-red-700",
    icon: <Sparkles className="w-12 h-12 text-white" />,
    color: "red",
    secondaryColor: "pink"
  };

  // Update title based on subcategory
  const pageTitle = currentSubcategory 
    ? `${currentSubcategory.name} - ${info.title}`
    : info.title;

  // Filter products by current category and subcategory
  const categoryProducts = products.filter(product => {
    // First check if product belongs to this category
    const matchesCategory = product.category === categoryId;
    
    // If there's a subcategory, filter further
    if (subcategoryId && matchesCategory) {
      const subcatName = currentSubcategory?.name.toLowerCase() || "";
      return (
        product.name.toLowerCase().includes(subcatName) ||
        (subcatName === "eyes" && product.name.toLowerCase().includes("eye")) ||
        (subcatName === "lips" && product.name.toLowerCase().includes("lip")) ||
        (subcatName === "face" && (
          product.name.toLowerCase().includes("foundation") ||
          product.name.toLowerCase().includes("moisturizer")
        )) ||
        (subcatName === "necklaces" && product.name.toLowerCase().includes("necklace")) ||
        (subcatName === "earrings" && product.name.toLowerCase().includes("earring")) ||
        (subcatName === "rings" && product.name.toLowerCase().includes("ring")) ||
        (subcatName === "bracelets" && product.name.toLowerCase().includes("bracelet")) ||
        (subcatName === "shampoo" && product.name.toLowerCase().includes("shampoo")) ||
        (subcatName === "conditioner" && product.name.toLowerCase().includes("conditioner"))
      );
    }
    
    return matchesCategory;
  });

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

  // Filter products by price
  const filteredProducts = categoryProducts.filter(product => {
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    return true;
  });

  const sortedAndFiltered = sortProducts(filteredProducts);

  const handleAddToCart = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    const product = products.find(p => p.id === productId);
    setCart(prev => [...prev, product]);
    // You can add toast notification here
    console.log(`${product.name} added to cart`);
  };

  const toggleWishlist = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
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

  return (
    <div className="bg-white">
      {/* Hero Banner - Red theme */}
      <div className={`bg-gradient-to-r ${info.gradient} text-white relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {info.icon}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {pageTitle}
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto">
              {currentSubcategory 
                ? `Explore our ${currentSubcategory.name.toLowerCase()} collection`
                : info.description}
            </p>
            
            {/* Breadcrumb - White on red */}
            <div className="flex items-center justify-center gap-2 text-sm text-white/80 mt-6">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to={`/${categoryId}`} className="hover:text-white transition-colors">
                {currentCategory?.name}
              </Link>
              {currentSubcategory && (
                <>
                  <span>/</span>
                  <span className="text-white font-medium">{currentSubcategory.name}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="w-full bg-white border border-gray-200 text-gray-800 py-3 rounded-lg flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md transition-all"
          >
            <Filter size={18} className="text-red-600" />
            {mobileFiltersOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Subcategory Pills - Red theme */}
        {currentCategory && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              to={`/${categoryId}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !subcategoryId
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              All {currentCategory.name}
            </Link>
            {currentCategory.items.map((item) => {
              const itemPath = item.href;
              const isActive = subcategoryId === item.href.split('/').pop();
              return (
                <Link
                  key={item.name}
                  to={itemPath}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-red-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Red accents */}
          <div className={`lg:w-64 flex-shrink-0 ${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button 
                  onClick={() => {
                    setPriceRange([0, 500]);
                    setSortBy("popular");
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-medium"
                >
                  Reset
                </button>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range ($)</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Min"
                    min="0"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Max"
                    min="0"
                  />
                </div>
              </div>

              {/* Sort Options */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Filter Stats */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-900">{sortedAndFiltered.length}</span> products found
                </p>
                <Link
                  to={`/${categoryId}`}
                  className="mt-3 text-xs text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1"
                >
                  Clear All Filters
                  <X size={12} />
                </Link>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count and Mobile Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <p className="text-sm text-gray-500 mb-3 sm:mb-0">
                Showing <span className="font-medium text-gray-900">{sortedAndFiltered.length}</span> {sortedAndFiltered.length === 1 ? 'product' : 'products'}
              </p>
              
              {/* Mobile sort select */}
              <div className="sm:hidden">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

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
                      
                      {/* Badge - Red */}
                      {product.badge && (
                        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                          {product.badge}
                        </div>
                      )}
                      
                      {/* Wishlist button */}
                      <button 
                        onClick={(e) => toggleWishlist(product.id, e)} 
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors z-10"
                        aria-label="Add to wishlist"
                      >
                        <Heart 
                          size={18} 
                          className={wishlist.includes(product.id) ? "fill-red-600 text-red-600" : "text-gray-600"} 
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
                              title="Color option"
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
                      {/* Brand */}
                      <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                      
                      {/* Product Name */}
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-0.5">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-xs text-gray-500">
                          ({product.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-bold text-gray-900">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <>
                            <span className="text-sm text-gray-400 line-through">
                              ${product.originalPrice}
                            </span>
                            <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                              Save ${product.originalPrice - product.price}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Add to Cart Button - Red */}
                      <button 
                        onClick={(e) => handleAddToCart(product.id, e)} 
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                      >
                        <ShoppingBag size={18} /> 
                        Add to Cart
                      </button>
                    </div>

                    {/* Hover border effect */}
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-xl">
                <div className="text-6xl mb-4">🛍️</div>
                <p className="text-gray-500 mb-4">No products found in this category.</p>
                <Link
                  to={`/${categoryId}`}
                  className="inline-flex items-center gap-2 text-red-600 font-medium hover:text-red-700"
                >
                  View all {currentCategory?.name}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}