import React, { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Gem, Flower2 } from "lucide-react";
import { banners } from "../../../data/data";

// Icon mapping component
const Icon = ({ name, className }) => {
  const iconMap = {
    Sparkles: <Sparkles className={className} />,
    Gem: <Gem className={className} />,
    Flower2: <Flower2 className={className} />
  };
  return iconMap[name] || <Sparkles className={className} />;
};

const PromotionalBanner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  // Auto-rotate banners every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  // Don't render if no banners
  if (!banners || banners.length === 0) {
    return null;
  }

  const current = banners[currentBanner];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-red-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main banner */}
        <div className="relative group">
          {/* Banner container */}
          <div className="relative h-[300px] md:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            {/* Background image with overlay */}
            <div className="absolute inset-0">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover transition-transform duration-10000 scale-105 group-hover:scale-110"
                style={{ objectPosition: current.bgPosition || "center" }}
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${current.gradient} opacity-80 mix-blend-multiply`}></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 md:px-12 lg:px-16 max-w-2xl">
                {/* Icon and badge */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white">
                    <Icon name={current.icon} className="w-6 h-6" />
                  </div>
                  <span className="text-white/90 text-sm font-medium uppercase tracking-wider">
                    Limited Edition
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                  {current.title}
                </h2>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-white/90 mb-2">
                  {current.subtitle}
                </p>

                {/* Description */}
                <p className="text-white/80 mb-6 max-w-lg">
                  {current.description}
                </p>

                {/* CTA Button */}
                <a
                  href={current.href}
                  className="inline-flex items-center gap-2 bg-white text-red-600 hover:text-red-700 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 group/btn hover:scale-105"
                >
                  <span>{current.cta}</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute top-10 right-10 hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="text-white font-semibold text-lg">2026</span>
              </div>
            </div>
            
            <div className="absolute bottom-10 right-10 hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="text-white font-semibold text-lg">Exclusive</span>
              </div>
            </div>
          </div>

          {/* Navigation arrows - only show if more than 1 banner */}
          {banners.length > 1 && (
            <>
              <button
                onClick={prevBanner}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                aria-label="Previous banner"
              >
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextBanner}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                aria-label="Next banner"
              >
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;