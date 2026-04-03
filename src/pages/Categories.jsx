import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronRight, 
  Sparkles, 
  TrendingUp, 
  Star,
  Package,
  Truck,
  Shield,
  ArrowRight
} from "lucide-react";

const categoriesData = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format",
    itemCount: 245,
    featured: ["Smartphones", "Laptops", "Accessories"],
    icon: "📱"
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format",
    itemCount: 189,
    featured: ["Men", "Women", "Kids"],
    icon: "👕"
  },
  {
    id: 3,
    name: "Home & Living",
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&auto=format",
    itemCount: 156,
    featured: ["Furniture", "Decor", "Kitchen"],
    icon: "🏠"
  },
  {
    id: 4,
    name: "Sports",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format",
    itemCount: 98,
    featured: ["Equipment", "Footwear", "Apparel"],
    icon: "⚽"
  },
  {
    id: 5,
    name: "Books",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format",
    itemCount: 312,
    featured: ["Fiction", "Non-fiction", "Academic"],
    icon: "📚"
  },
  {
    id: 6,
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format",
    itemCount: 167,
    featured: ["Skincare", "Makeup", "Fragrance"],
    icon: "💄"
  }
];

const featuredCategories = [
  { name: "New Arrivals", color: "bg-red-500", count: 48 },
  { name: "Best Sellers", color: "bg-red-600", count: 124 },
  { name: "Sale Items", color: "bg-red-700", count: 36 }
];

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="bg-gradient-to-b from-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
            <Sparkles size={18} className="text-red-600" />
            <span className="text-red-700 font-medium text-sm">Shop by Category</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Our
            <span className="text-red-600 ml-2">Collections</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover thousands of products across 6 main categories, with new items added daily
          </p>
        </div>

        {/* Featured Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {featuredCategories.map((item, index) => (
            <div
              key={index}
              className="group relative cursor-pointer"
            >
              <div className={`${item.color} text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                <span className="font-semibold">{item.name}</span>
                <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-sm">
                  {item.count}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesData.map((category, index) => (
            <div
              key={category.id}
              className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.5s ease-out forwards'
              }}
            >
              {/* Background Image with Overlay */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Category Icon */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">{category.icon}</span>
                </div>
                
                {/* Item Count Badge */}
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  {category.itemCount} items
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                    {category.name}
                  </h3>
                  <ChevronRight 
                    size={20} 
                    className="text-red-500 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>

                {/* Featured Items */}
                <div className="space-y-2 mb-4">
                  {category.featured.map((item, idx) => (
                    <div key={idx} className="flex items-center text-gray-600 text-sm">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2" />
                      {item}
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <Link
                  to={`/category/${category.name.toLowerCase()}`}
                  className="inline-flex items-center gap-2 text-red-600 font-medium group/btn"
                >
                  Browse All
                  <ArrowRight 
                    size={16} 
                    className="group-hover/btn:translate-x-1 transition-transform" 
                  />
                </Link>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-gradient-to-r from-red-600 to-red-500 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-16 -mb-16" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-2xl">
                <Package size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Can't find what you're looking for?</h3>
                <p className="text-white/80">Browse our complete catalog with 1000+ products</p>
              </div>
            </div>
            <Link
              to="/all-categories"
              className="bg-white text-red-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              View All Categories
            </Link>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { icon: <Truck />, label: "Free Shipping", desc: "On orders over $50" },
            { icon: <Shield />, label: "Secure Payment", desc: "100% protected" },
            { icon: <Star />, label: "Best Prices", desc: "Price match guarantee" },
            { icon: <TrendingUp />, label: "Top Rated", desc: "4.8/5 reviews" }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-red-500 mb-2">{feature.icon}</div>
              <div className="font-semibold text-gray-900">{feature.label}</div>
              <div className="text-sm text-gray-500">{feature.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}