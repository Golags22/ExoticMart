import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  ChevronLeft, 
  ChevronRight,
  Shield,
  Truck,
  RefreshCw,
  Share2,
  Minus,
  Plus,
  Lock
} from "lucide-react";
import { products } from "../data/data";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { addToCart, toggleWishlist, isInWishlist: checkWishlist } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isInWishlistState, setIsInWishlistState] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  // Mock additional images - only create if product exists
  const productImages = product ? [
    product.image,
    product.image?.replace("?ixlib", "?w=800&ixlib"),
    product.image?.replace("?ixlib", "?w=800&h=800&fit=crop&ixlib"),
    product.image?.replace("?ixlib", "?w=800&h=800&fit=face&ixlib"),
  ] : [];

  useEffect(() => {
    setLoading(true);
    
    // Find product by id
    const foundProduct = products.find(p => p.id === parseInt(id));
    
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors?.[0] || null);
      
      // Check if product is in wishlist (only if user is logged in)
      if (user) {
        setIsInWishlistState(checkWishlist(foundProduct.id));
      }
      
      // Find related products (same category or similar)
      const related = products
        .filter(p => p.id !== foundProduct.id && p.category === foundProduct.category)
        .slice(0, 4);
      setRelatedProducts(related);
    }
    
    setLoading(false);
  }, [id, user, checkWishlist]);

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1);
    } else {
      setQuantity(prev => prev > 1 ? prev - 1 : 1);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.info(
        <div>
          <p className="font-medium mb-2">Please login to add items to cart</p>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/users/login", { 
                state: { from: location.pathname }
              })}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/users/signup")}
              className="border border-red-600 text-red-600 px-3 py-1 rounded text-sm"
            >
              Sign Up
            </button>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: false,
          draggable: false
        }
      );
      return;
    }

    setIsAdding(true);
    try {
      const options = {};
      if (selectedColor) options.color = selectedColor;
      if (selectedSize) options.size = selectedSize;
      
      await addToCart(product, quantity, options);
    } catch (error) {
      if (error === "LOGIN_REQUIRED") {
        navigate("/users/login", { 
          state: { from: location.pathname }
        });
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleWishlist = async () => {
    if (!user) {
      toast.info("Please login to add items to wishlist");
      navigate("/users/login", { 
        state: { from: location.pathname }
      });
      return;
    }

    try {
      await toggleWishlist(product);
      setIsInWishlistState(!isInWishlistState);
    } catch (error) {
      if (error === "LOGIN_REQUIRED") {
        navigate("/users/login", { 
          state: { from: location.pathname }
        });
      }
    }
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
        }`}
      />
    ));
  };

  // Format category name safely
  const formatCategoryName = (category) => {
    if (!category) return "Category";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb - with safety checks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <Link to="/" className="hover:text-red-600">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-red-600">Shop</Link>
          <ChevronRight size={14} />
          {product.category && (
            <>
              <Link 
                to={`/${product.category}`} 
                className="hover:text-red-600"
              >
                {formatCategoryName(product.category)}
              </Link>
              <ChevronRight size={14} />
            </>
          )}
          <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
              <img
                src={productImages[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x800?text=Product+Image";
                }}
              />
            </div>
            
            {/* Thumbnail Gallery - only show if productImages has items */}
            {productImages.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 transition-all ${
                      selectedImage === index ? 'border-red-600' : 'border-transparent hover:border-red-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/200x200?text=Image";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {product.badge && (
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
              {product.brand && (
                <span className="text-gray-500 text-sm">{product.brand}</span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {product.rating && (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-500 text-sm">
                  {product.reviews || 0} reviews
                </span>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price?.toFixed(2) || '0.00'}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Color Options */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Color: <span className="text-red-600">{selectedColor || 'Select'}</span>
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color ? 'border-red-600 scale-110' : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Options */}
            {product.category === 'clothing' && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                <div className="flex gap-2 flex-wrap">
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg border-2 font-medium transition-all ${
                        selectedSize === size
                          ? 'border-red-600 bg-red-50 text-red-600'
                          : 'border-gray-200 hover:border-red-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange('decrement')}
                    className="p-3 hover:bg-gray-50 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange('increment')}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-gray-500">In stock</span>
              </div>
            </div>

            {/* Login Prompt for Guests */}
            {!user && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-100">
                <p className="text-sm text-gray-700 mb-3 flex items-center gap-2">
                  <Lock size={16} className="text-red-600" />
                  Please login to add items to your cart
                </p>
                <div className="flex gap-3">
                  <Link
                    to="/users/login"
                    state={{ from: location.pathname }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium text-center transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/users/signup"
                    className="flex-1 border border-red-600 text-red-600 hover:bg-red-50 py-2 rounded-lg text-sm font-medium text-center transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAdding ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    {user ? "Add to Cart" : "Login to Buy"}
                  </>
                )}
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`sm:w-auto px-6 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 border-2 ${
                  isInWishlistState
                    ? 'border-red-600 bg-red-50 text-red-600'
                    : 'border-gray-300 hover:border-red-600 hover:text-red-600'
                }`}
              >
                <Heart size={20} className={isInWishlistState ? 'fill-red-600' : ''} />
                {isInWishlistState ? 'Saved' : 'Save'}
              </button>
              <button className="sm:w-auto p-4 rounded-lg border-2 border-gray-300 hover:border-red-600 transition-colors">
                <Share2 size={20} className="text-gray-600 hover:text-red-600" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Free Shipping</p>
                <p className="text-xs text-gray-500">on orders $50+</p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Easy Returns</p>
                <p className="text-xs text-gray-500">30-day returns</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Secure</p>
                <p className="text-xs text-gray-500">Checkout</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-b border-gray-200">
          <div className="flex gap-8 overflow-x-auto">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed">
                {product.description || `This premium ${product.name} from ${product.brand || 'our collection'} is designed for those who appreciate quality and style. 
                Made with the finest materials and attention to detail, this piece will elevate your collection.`}
              </p>
              <ul className="list-disc pl-5 mt-4 text-gray-600">
                <li>Premium quality materials</li>
                <li>Designed for long-lasting wear</li>
                <li>Easy to care for and maintain</li>
                <li>Perfect for everyday use</li>
              </ul>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.brand && (
                <div className="border-b border-gray-200 py-3">
                  <span className="text-gray-500">Brand:</span>
                  <span className="float-right text-gray-900 font-medium">{product.brand}</span>
                </div>
              )}
              {product.category && (
                <div className="border-b border-gray-200 py-3">
                  <span className="text-gray-500">Category:</span>
                  <span className="float-right text-gray-900 font-medium">{formatCategoryName(product.category)}</span>
                </div>
              )}
              <div className="border-b border-gray-200 py-3">
                <span className="text-gray-500">Material:</span>
                <span className="float-right text-gray-900 font-medium">Premium quality</span>
              </div>
              <div className="border-b border-gray-200 py-3">
                <span className="text-gray-500">Care Instructions:</span>
                <span className="float-right text-gray-900 font-medium">Gentle care</span>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="text-center py-12">
              <p className="text-gray-500">Customer reviews coming soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((related) => (
              <Link
                key={related.id}
                to={`/product/${related.id}`}
                className="group"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
                  <img
                    src={related.image}
                    alt={related.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x300?text=Product";
                    }}
                  />
                </div>
                <h3 className="font-medium text-gray-900 text-sm mb-1 group-hover:text-red-600 transition-colors line-clamp-2">
                  {related.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">${related.price?.toFixed(2)}</span>
                  {related.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">${related.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}