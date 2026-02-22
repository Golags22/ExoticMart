import React from "react";
import { Sparkles, Heart, Gem, Shirt, CheckCircle } from "lucide-react";

const WhatWeOffer = () => {
  const offers = [
    {
      id: 1,
      icon: <Sparkles className="w-6 h-6 md:w-7 md:h-7" />,
      title: "Carefully selected cosmetics",
      description: "Curated makeup and skincare from trusted brands",
      color: "from-pink-500 to-rose-500"
    },
    {
      id: 2,
      icon: <Heart className="w-6 h-6 md:w-7 md:h-7" />,
      title: "Quality hair care essentials",
      description: "Nourishing treatments and styling products",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      icon: <Gem className="w-6 h-6 md:w-7 md:h-7" />,
      title: "Elegant jewelry pieces",
      description: "Timeless designs for every occasion",
      color: "from-amber-500 to-orange-500"
    },
    {
      id: 4,
      icon: <Shirt className="w-6 h-6 md:w-7 md:h-7" />,
      title: "Trend-forward clothing & accessories",
      description: "Stay stylish with our curated fashion edits",
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
            Our Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            What We Offer
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Discover our carefully curated selection of beauty and fashion essentials
          </p>
        </div>

        {/* Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              {/* Icon with gradient background */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${offer.color} text-white mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {offer.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
                <CheckCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                <span>{offer.title}</span>
              </h3>
              
              <p className="text-sm text-gray-500 pl-6">
                {offer.description}
              </p>

              {/* Decorative element */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href="/shop"
            className="inline-flex items-center gap-2 text-red-600 font-medium hover:text-red-700 group"
          >
            <span>Explore All Categories</span>
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

      {/* Decorative background elements */}
      <div className="absolute left-0 right-0 -z-10">
        <div className="relative max-w-7xl mx-auto">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-100 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-100 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;