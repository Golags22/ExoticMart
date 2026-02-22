import React from "react";
import { Shield, CheckCircle, Lock, ThumbsUp, Star, Truck } from "lucide-react";

const TrustStatement = () => {
  const trustPoints = [
    {
      icon: <Shield className="w-5 h-5" />,
      text: "100% Authentic Products"
    },
    {
      icon: <Lock className="w-5 h-5" />,
      text: "Secure Payments"
    },
    {
      icon: <Truck className="w-5 h-5" />,
      text: "Fast & Reliable Shipping"
    },
    {
      icon: <ThumbsUp className="w-5 h-5" />,
      text: "30-Day Returns"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-red-600 to-red-700 rounded-3xl overflow-hidden shadow-2xl">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24"></div>
          </div>

          <div className="relative p-8 md:p-12 lg:p-16 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Star size={16} className="text-white" />
              <span className="text-white text-sm font-medium">Trusted by 50,000+ customers</span>
            </div>

            {/* Main trust statement - exactly as requested */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white max-w-4xl mx-auto leading-relaxed mb-8">
              "We are committed to delivering authentic products and a seamless shopping experience you can trust."
            </h2>

            {/* Trust points grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
              {trustPoints.map((point, index) => (
                <div key={index} className="flex items-center justify-center gap-2 text-white/90">
                  <span className="text-white">{point.icon}</span>
                  <span className="text-sm font-medium">{point.text}</span>
                </div>
              ))}
            </div>

            {/* Security badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6 border-t border-white/20">
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle size={16} />
                <span className="text-sm">256-bit SSL Encryption</span>
              </div>
              <div className="w-px h-4 bg-white/20"></div>
              <div className="flex items-center gap-2 text-white/80">
                <Shield size={16} />
                <span className="text-sm">Buyer Protection</span>
              </div>
              <div className="w-px h-4 bg-white/20 hidden md:block"></div>
              <div className="flex items-center gap-2 text-white/80">
                <ThumbsUp size={16} />
                <span className="text-sm">Verified Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStatement;