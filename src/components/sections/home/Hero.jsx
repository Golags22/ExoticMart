import React, { useState, useEffect } from "react";
import { ArrowRight, Heart, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel data
  const slides = [
    {
      id: 1,
      badge: "Spring Collection 2026",
      title: "Beauty That",
      titleAccent: "Speaks Volumes",
      description: "Discover curated essentials in cosmetics, hair, jewelry, and fashion. Your signature style starts here.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      cta: "Shop New Arrivals",
      products: [
        { name: "Velvet Lipstick", price: "$29", category: "Bestseller", color: "bg-red-600" },
        { name: "Gold Hoops", price: "$89", category: "New", color: "bg-amber-500" },
        { name: "Hair Serum", price: "$45", category: "Premium", color: "bg-purple-500" },
      ]
    },
    {
      id: 2,
      badge: "Summer Edit 2026",
      title: "Radiant Skin",
      titleAccent: "Effortless Glow",
      description: "From dewy foundations to shimmering highlighters. Get that sun-kissed look all year round.",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      cta: "Shop Cosmetics",
      products: [
        { name: "Dewy Foundation", price: "$42", category: "Bestseller", color: "bg-red-600" },
        { name: "Shimmer Highlighter", price: "$34", category: "New", color: "bg-amber-500" },
        { name: "Setting Spray", price: "$28", category: "Essential", color: "bg-purple-500" },
      ]
    },
    {
      id: 3,
      badge: "Fine Jewelry",
      title: "Timeless",
      titleAccent: "Elegance",
      description: "Discover our new collection of handcrafted jewelry. From daily staples to statement pieces.",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      cta: "Shop Jewelry",
      products: [
        { name: "Pearl Earrings", price: "$129", category: "New", color: "bg-red-600" },
        { name: "Tennis Bracelet", price: "$299", category: "Luxury", color: "bg-amber-500" },
        { name: "Signet Ring", price: "$159", category: "Timeless", color: "bg-purple-500" },
      ]
    }
  ];

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const current = slides[currentSlide];

  return (
    <section className="relative bg-gradient-to-br from-white to-red-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-40 left-20 w-56 h-56 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left content - Text */}
          <div className="text-center lg:text-left space-y-6 md:space-y-8">
            {/* Seasonal badge */}
            <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full">
              <Sparkles size={18} className="text-red-600" />
              <span className="text-red-700 font-medium text-sm uppercase tracking-wider">
                {current.badge}
              </span>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {current.title}
              <span className="block text-red-600 mt-2">
                {current.titleAccent}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              {current.description}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-medium text-lg shadow-lg shadow-red-200 transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2">
                {current.cta}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 flex items-center justify-center gap-2">
                <Heart size={20} />
                Wishlist
              </button>
            </div>

            {/* Social proof - stats */}
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-6">
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-500">Happy Customers</div>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">100+</div>
                <div className="text-sm text-gray-500">Premium Brands</div>
              </div>
              <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
              <div className="text-left hidden sm:block">
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-500">Styling Support</div>
              </div>
            </div>
          </div>

          {/* Right content - Visual collage with carousel sync */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
            {/* Main hero image */}
            <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-in-out">
              <img
                src={current.image}
                alt={`Fashion look ${currentSlide + 1}`}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent"></div>
            </div>

            {/* Floating product cards - dynamic based on slide */}
            <div className="absolute bottom-0 left-0 w-40 md:w-48 bg-white rounded-xl shadow-xl p-3 flex items-center gap-3 animate-float">
              <div className={`w-10 h-10 ${current.products[0].color.replace('bg-', 'bg-')}/20 rounded-full flex items-center justify-center`}>
                <div className={`w-4 h-4 ${current.products[0].color} rounded-full`}></div>
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500">{current.products[0].category}</div>
                <div className="font-medium text-gray-900 text-sm">{current.products[0].name}</div>
                <div className="text-red-600 font-bold">{current.products[0].price}</div>
              </div>
            </div>

            <div className="absolute top-20 -left-4 w-36 md:w-40 bg-white rounded-xl shadow-xl p-3 animate-float animation-delay-1000">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 ${current.products[1].color.replace('bg-', 'bg-')}/20 rounded-full flex items-center justify-center`}>
                  <div className={`w-2 h-2 ${current.products[1].color} rounded-full`}></div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">{current.products[1].category}</div>
                  <div className="font-medium text-gray-900 text-sm">{current.products[1].name}</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-20 right-0 w-40 md:w-44 bg-white rounded-xl shadow-xl p-3 animate-float animation-delay-2000">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 ${current.products[2].color.replace('bg-', 'bg-')}/20 rounded-full flex items-center justify-center`}>
                  <div className={`w-3 h-3 ${current.products[2].color} rounded-full`}></div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">{current.products[2].category}</div>
                  <div className="font-medium text-gray-900 text-sm">{current.products[2].name}</div>
                </div>
              </div>
            </div>

            {/* Carousel navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:translate-x-0 bg-white/80 backdrop-blur-sm hover:bg-white p-2 rounded-full shadow-lg transition-all group"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} className="text-gray-800 group-hover:text-red-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-0 bg-white/80 backdrop-blur-sm hover:bg-white p-2 rounded-full shadow-lg transition-all group"
              aria-label="Next slide"
            >
              <ChevronRight size={20} className="text-gray-800 group-hover:text-red-600" />
            </button>

            {/* Slide indicators */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === index 
                      ? "w-8 bg-red-600" 
                      : "w-2 bg-gray-300 hover:bg-red-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Decorative brand logos */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <span className="text-xs font-semibold text-gray-400">ESTĒE</span>
              <span className="text-xs font-semibold text-gray-400">DIOR</span>
              <span className="text-xs font-semibold text-gray-400">CHANEL</span>
              <span className="text-xs font-semibold text-gray-400">GUCCI</span>
            </div>
          </div>
        </div>

        {/* Category quick links */}
        <div className="mt-16 lg:mt-20">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-gray-500 text-sm">Shop by category:</span>
            <a href="/cosmetics" className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all">Cosmetics</a>
            <a href="/hair" className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all">Hair</a>
            <a href="/jewelry" className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all">Jewelry</a>
            <a href="/clothing" className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all">Clothing</a>
            <a href="/accessories" className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all">Accessories</a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Hero;