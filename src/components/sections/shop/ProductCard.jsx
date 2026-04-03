import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { toast } from 'react-toastify';
import { ShoppingCart, Heart, Star, Eye, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || product.image
      });
      toast.success(`${product.name} added to cart!`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    toast.info(isWishlisted ? "Removed from wishlist" : "Added to wishlist", {
      position: "bottom-right",
      autoClose: 1500,
    });
  };

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
          -{product.discount}% OFF
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300"
      >
        <Heart
          size={18}
          className={`transition-all duration-300 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"}`}
        />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block overflow-hidden bg-gray-50">
        <div className="relative h-48 sm:h-56 md:h-64">
          <img
            src={product.images?.[0] || product.image || "https://via.placeholder.com/300"}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          />
          {/* Quick View Overlay */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <div className="bg-white rounded-full p-2 transform transition-all duration-300 hover:scale-110">
              <Eye className="text-red-500" size={20} />
            </div>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        {/* Category Badge */}
        {product.category && (
          <span className="inline-block text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded-full">
            {product.category}
          </span>
        )}

        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 hover:text-red-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Product Description */}
        {product.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        )}

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              {renderRating(product.rating)}
            </div>
            <span className="text-xs text-gray-500">({product.reviews || 0})</span>
          </div>
        )}

        {/* Price Section */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-red-600">${product.price?.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Stock Status */}
        {product.stock !== undefined && (
          <div className="flex items-center gap-1">
            {product.stock > 0 ? (
              <>
                <CheckCircle size={12} className="text-green-500" />
                <span className="text-xs text-green-600">
                  {product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}
                </span>
              </>
            ) : (
              <span className="text-xs text-red-500">Out of Stock</span>
            )}
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAdding}
          className={`
            w-full mt-3 flex items-center justify-center gap-2
            px-4 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105
            ${product.stock === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:shadow-lg"
            }
          `}
        >
          {isAdding ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              <span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
            </>
          )}
        </button>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}