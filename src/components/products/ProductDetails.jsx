import { useParams } from "react-router-dom";
import { db } from "../../backend/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Truck, 
  RotateCcw, 
  Shield, 
  Minus, 
  Plus,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Share2,
  CreditCard
} from "lucide-react";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { BestSellers, NewArrivals } from "../sections/home";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          toast.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart({ ...product, quantity });
      toast.success(`${quantity} x ${product.name} added to cart!`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    // Navigate to checkout
    window.location.href = "/checkout";
  };

  const handleWishlist = () => {
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
          size={18}
          className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-red-100 border-t-red-500 rounded-full animate-spin" />
          </div>
          <p className="mt-4 text-gray-500 animate-pulse">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 rounded-full p-4 mb-4 inline-block">
            <AlertCircle className="text-red-500" size={48} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <ArrowLeft size={20} />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];
  const discount = product.discount || 0;
  const originalPrice = product.originalPrice || product.price;
  const finalPrice = discount ? originalPrice * (1 - discount / 100) : product.price;

  return (
    <div className="bg-gradient-to-b from-white to-red-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-red-500 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <img
                src={images[selectedImage] || "https://via.placeholder.com/600"}
                alt={product.name}
                className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`
                      flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all
                      ${selectedImage === index ? "border-red-500 shadow-md" : "border-gray-200"}
                    `}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Category Badge */}
            {product.category && (
              <span className="inline-block text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
                {product.category}
              </span>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderRating(product.rating)}
                </div>
                <span className="text-gray-500">({product.reviews || 0} reviews)</span>
                <span className="text-gray-300">|</span>
                <span className="text-green-600 text-sm">In Stock</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-red-600">
                ${finalPrice?.toFixed(2)}
              </span>
              {discount > 0 && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ${originalPrice?.toFixed(2)}
                  </span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
                    -{discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors"
                >
                  <Plus size={18} />
                </button>
                <span className="text-sm text-gray-500 ml-2">
                  {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={isAdding || product.stock === 0}
                className={`
                  flex-1 flex items-center justify-center gap-2
                  px-6 py-3 rounded-xl font-semibold
                  transition-all duration-300 transform hover:scale-105
                  ${product.stock === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border-2 border-red-500 text-red-600 hover:bg-red-50"
                  }
                `}
              >
                {isAdding ? (
                  <>
                    <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Add to Cart
                  </>
                )}
              </button>
              
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="
                  flex-1 flex items-center justify-center gap-2
                  px-6 py-3 rounded-xl font-semibold
                  bg-gradient-to-r from-red-500 to-red-600 text-white
                  hover:shadow-lg transition-all duration-300 transform hover:scale-105
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                <CreditCard size={20} />
                Buy Now
              </button>

              <button
                onClick={handleWishlist}
                className="
                  px-4 py-3 rounded-xl border border-gray-300
                  hover:border-red-500 hover:text-red-500
                  transition-all duration-300
                "
              >
                <Heart
                  size={20}
                  className={isWishlisted ? "fill-red-500 text-red-500" : ""}
                />
              </button>
            </div>

            {/* Shipping & Returns Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Truck className="text-red-500" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <RotateCcw className="text-red-500" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-900">30-Day Returns</p>
                  <p className="text-xs text-gray-500">Money back guarantee</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Shield className="text-red-500" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                  <p className="text-xs text-gray-500">256-bit encryption</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="text-red-500" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-900">Authentic Products</p>
                  <p className="text-xs text-gray-500">100% genuine</p>
                </div>
              </div>
            </div>

            {/* Share Button */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Link copied to clipboard!");
                }}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                <Share2 size={16} />
                Share this product
              </button>
            </div>
          </div>
        </div>
        <NewArrivals/>
      </div>
    </div>
  );
}