import React, { useState, useEffect, useRef } from "react";
import { ShoppingBag, Clock, Eye, TrendingUp, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const NewArrivals = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });
  
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Countdown timer for urgency
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const newArrivals = [
    {
      id: 1,
      name: "Rose Quartz Facial Roller",
      brand: "GlamHive Spa",
      price: 34,
      originalPrice: 49,
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad5278?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Just In",
      badgeColor: "bg-green-500",
      views: 234,
      soldInLast: "2 hours",
      inStock: 18,
      limitedStock: true,
      href: "/product/rose-quartz-roller"
    },
    {
      id: 2,
      name: "Silk Press Perfection Kit",
      brand: "Luxe Hair Co",
      price: 89,
      originalPrice: 129,
      image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Trending",
      badgeColor: "bg-red-600",
      views: 567,
      soldInLast: "6 hours",
      inStock: 7,
      limitedStock: true,
      href: "/product/silk-press-kit"
    },
    {
      id: 3,
      name: "14K Gold Layering Necklace",
      brand: "GlamHive Jewelry",
      price: 129,
      originalPrice: 189,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Limited Edition",
      badgeColor: "bg-purple-600",
      views: 892,
      soldInLast: "24 hours",
      inStock: 5,
      limitedStock: true,
      href: "/product/gold-necklace"
    },
    {
      id: 4,
      name: "Summer Satin Co-ord Set",
      brand: "GlamHive Studio",
      price: 159,
      originalPrice: 229,
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "New Arrival",
      badgeColor: "bg-blue-600",
      views: 345,
      soldInLast: "12 hours",
      inStock: 12,
      limitedStock: false,
      href: "/product/satin-coord"
    },
    {
      id: 5,
      name: "Vitamin C Brightening Serum",
      brand: "Glow Lab",
      price: 42,
      originalPrice: 58,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Bestseller",
      badgeColor: "bg-amber-600",
      views: 1.2,
      viewsUnit: "k",
      soldInLast: "4 hours",
      inStock: 23,
      limitedStock: false,
      href: "/product/vitamin-c-serum"
    },
    {
      id: 6,
      name: "Crystal Hair Clips (Set of 4)",
      brand: "GlamHive Accessories",
      price: 29,
      originalPrice: 45,
      image: "https://images.unsplash.com/photo-1620618072105-9c45ab30e1c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Viral",
      badgeColor: "bg-pink-600",
      views: 2.1,
      viewsUnit: "k",
      soldInLast: "1 hour",
      inStock: 3,
      limitedStock: true,
      href: "/product/crystal-hair-clips"
    },
    {
      id: 7,
      name: "Hydrating Lip Gloss Set",
      brand: "GlamHive Cosmetics",
      price: 24,
      originalPrice: 36,
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Just In",
      badgeColor: "bg-green-500",
      views: 156,
      soldInLast: "3 hours",
      inStock: 42,
      limitedStock: false,
      href: "/product/lip-gloss-set"
    },
    {
      id: 8,
      name: "Pearl Hair Pins Set",
      brand: "GlamHive Accessories",
      price: 19,
      originalPrice: 28,
      image: "https://images.unsplash.com/photo-1620618072105-9c45ab30e1c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: "Trending",
      badgeColor: "bg-red-600",
      views: 789,
      soldInLast: "2 hours",
      inStock: 15,
      limitedStock: true,
      href: "/product/pearl-hair-pins"
    }
  ];

  const formatNumber = (num, unit = "") => {
    if (unit === "k") return `${num}k`;
    return num.toLocaleString();
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Approximate card width + gap
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });

      // Update arrow visibility after scroll
      setTimeout(() => {
        if (scrollContainerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
          setShowLeftArrow(scrollLeft > 20);
          setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
        }
      }, 300);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header with urgency elements */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                HOT DROP
              </span>
              <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
                Just Landed
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              New Arrivals
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Fresh drops from your favorite brands. Limited quantities available.
            </p>
          </div>

          {/* Urgency countdown timer */}
          <div className="mt-4 md:mt-0 bg-red-600 rounded-lg p-3 shadow-lg">
            <div className="text-white text-xs text-center mb-1">🔥 EARLY BIRD ENDS IN</div>
            <div className="flex items-center gap-2">
              <div className="text-center">
                <div className="bg-white text-red-600 font-bold text-lg px-2 py-1 rounded min-w-[40px]">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-white text-[10px] mt-1">DAYS</div>
              </div>
              <span className="text-white font-bold text-xl">:</span>
              <div className="text-center">
                <div className="bg-white text-red-600 font-bold text-lg px-2 py-1 rounded min-w-[40px]">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-white text-[10px] mt-1">HRS</div>
              </div>
              <span className="text-white font-bold text-xl">:</span>
              <div className="text-center">
                <div className="bg-white text-red-600 font-bold text-lg px-2 py-1 rounded min-w-[40px]">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-white text-[10px] mt-1">MINS</div>
              </div>
              <span className="text-white font-bold text-xl">:</span>
              <div className="text-center">
                <div className="bg-white text-red-600 font-bold text-lg px-2 py-1 rounded min-w-[40px]">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-white text-[10px] mt-1">SECS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal carousel container */}
        <div className="relative group">
          {/* Left navigation arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110 -ml-4 lg:-ml-5"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
          )}

          {/* Right navigation arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110 -mr-4 lg:-mr-5"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} className="text-gray-800" />
            </button>
          )}

          {/* Scrollable product container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-6 pb-4 scroll-smooth hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {newArrivals.map((product) => (
              <a
                key={product.id}
                href={product.href}
                className="flex-none w-[280px] sm:w-[300px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group/card"
              >
                {/* Product image */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover/card:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className={`${product.badgeColor} text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg`}>
                      {product.badge}
                    </span>
                    {product.limitedStock && product.inStock <= 10 && (
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
                        Only {product.inStock} left
                      </span>
                    )}
                  </div>

                  {/* View counter - social proof */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Eye size={12} />
                    <span>{formatNumber(product.views, product.viewsUnit)}</span>
                  </div>

                  {/* Sold in last X hours - urgency */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center justify-center gap-1">
                      <Clock size={12} />
                      <span>{product.soldInLast} ago • {product.inStock} in stock</span>
                    </div>
                  </div>
                </div>

                {/* Product details */}
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover/card:text-red-600 transition-colors">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
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

                  {/* Progress bar for limited stock */}
                  {product.limitedStock && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Selling fast</span>
                        <span>{product.inStock} left</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-600 rounded-full"
                          style={{ width: `${(product.inStock / 30) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Add to cart button */}
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md hover:shadow-lg">
                    <ShoppingBag size={18} />
                    <span>Add to Cart</span>
                  </button>

                  {/* Trending indicator */}
                  {product.badge === "Trending" || product.badge === "Viral" ? (
                    <div className="absolute top-2 right-2">
                      <div className="bg-red-100 p-1 rounded-full animate-bounce">
                        <TrendingUp size={14} className="text-red-600" />
                      </div>
                    </div>
                  ) : null}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator dots (mobile) */}
        <div className="flex justify-center gap-1 mt-4 lg:hidden">
          {newArrivals.map((_, index) => (
            <button
              key={index}
              className="w-1.5 h-1.5 rounded-full bg-gray-300 hover:bg-red-400 transition-colors"
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>

        {/* View all link with urgency message */}
        <div className="text-center mt-8">
          <a
            href="/new-arrivals"
            className="inline-flex items-center gap-2 text-red-600 font-medium hover:text-red-700 group"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="text-sm text-gray-500 mt-2">
            ⚡ 15 new products added this week • Limited quantities
          </p>
        </div>
      </div>

      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default NewArrivals;