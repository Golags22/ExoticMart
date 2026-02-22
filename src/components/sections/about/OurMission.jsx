import React from "react";
import { Target, Heart, Star, Banknote,ArrowRight } from "lucide-react";

const OurMission = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-red-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Decorative red gradient background */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-600/5 to-transparent"></div>
          
          {/* Red accent bar */}
          <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
          
          <div className="relative p-8 md:p-12 lg:p-16">
            <div className="max-w-4xl">
              {/* Icon and badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-100 p-3 rounded-full">
                  <Target className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
                  Our Mission
                </span>
              </div>

              {/* Main mission statement - exactly as requested */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-relaxed mb-8">
                "Our mission is to provide stylish, affordable, and quality products 
                that empower confidence and self-expression."
              </h2>

              {/* Supporting values */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-2 rounded-full">
                    <Heart className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-sm text-gray-600">Empowering Confidence</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-2 rounded-full">
                    <Star className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-sm text-gray-600">Quality First</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-2 rounded-full">
                    <Banknote className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-sm text-gray-600">Affordable Luxury</span>
                </div>
              </div>

           
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;