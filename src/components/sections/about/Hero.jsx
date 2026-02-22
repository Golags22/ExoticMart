import React from "react";
import { Sparkles, Shield, Truck, Award } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-white to-red-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-6">
            <Sparkles size={18} className="text-red-600" />
            <span className="text-red-700 font-medium text-sm uppercase tracking-wider">
              About Exotic Mart
            </span>
          </div>

          {/* Brand Statement - Exactly as requested */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            Your Destination for Premium <br />
            <span className="text-red-600">Beauty & Fashion Essentials</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Exotic Mart is your destination for premium beauty and fashion essentials. 
            We curate high-quality cosmetics, hair products, jewelry, and clothing designed 
            to elevate your everyday style.
          </p>

          {/* Stats / Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">50K+</div>
              <div className="text-sm text-gray-500">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">100+</div>
              <div className="text-sm text-gray-500">Premium Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">5K+</div>
              <div className="text-sm text-gray-500">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">24/7</div>
              <div className="text-sm text-gray-500">Customer Support</div>
            </div>
          </div>

          {/* Feature Icons */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <Shield size={18} className="text-red-600" />
              <span className="text-sm">Secure Payments</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2 text-gray-600">
              <Truck size={18} className="text-red-600" />
              <span className="text-sm">Fast Delivery</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-2 text-gray-600">
              <Award size={18} className="text-red-600" />
              <span className="text-sm">Quality Guaranteed</span>
            </div>
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
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default Hero;