import React, { useState } from "react";
import { Star, ShoppingBag, Heart } from "lucide-react";
import { products } from "../../../data/data";

const BestSellers = () => {
  const [wishlist, setWishlist] = useState([]);
  const [AddToCart, setAddToCart] = useState([]);

// Adding to cart function

const handleAddToCart = (productId) => {
  const product = products.find(p => p.id === productId);

  if (product) {
    setAddToCart(prev => [...prev, product]);
    console.log(`${product.name} added successfully`);
  }
};


  const toggleWishlist = (productId) => {
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
        size={16}
        className={`${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        } transition-colors`}
      />
    ));
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
            Trending Now
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Best Sellers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our most-loved products, handpicked by customers like you
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Product image container */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {product.badge}
                  </div>
                )}
                
                {/* Wishlist button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    size={18}
                    className={`${
                      wishlist.includes(product.id)
                        ? "fill-red-600 text-red-600"
                        : "text-gray-600"
                    } transition-colors`}
                  />
                </button>

                {/* Quick color options */}
                {product.colors && (
                  <div className="absolute bottom-3 left-3 flex gap-1">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: color }}
                        title="Color option"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Product details */}
              <div className="p-4">
                {/* Brand */}
                <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                
                {/* Product name */}
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-red-600 transition-colors">
                  <a href={`/product/${product.id}`}>{product.name}</a>
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
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
                      <span className="text-xs text-green-600 font-medium">
                        Save ${product.originalPrice - product.price}
                      </span>
                    </>
                  )}
                </div>

                {/* Add to cart button */}
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md hover:shadow-lg"
                
                 onClick={() => handleAddToCart(product.id)}
                >
                  <ShoppingBag size={18} />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Hover gradient border effect */}
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-red-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <a
            href="/best-sellers"
            className="inline-flex items-center gap-2 text-red-600 font-medium hover:text-red-700 group"
          >
            <span>View All Best Sellers</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;