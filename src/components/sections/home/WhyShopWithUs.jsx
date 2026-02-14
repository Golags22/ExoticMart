import React from "react";
import { 
  Shield, 
  Truck, 
  RefreshCw, 
  Award, 
  Heart, 
  Star,
  CheckCircle,
  Clock
} from "lucide-react";

const WhyShopWithUs = () => {
  const trustFeatures = [
    {
      id: 1,
      icon: <Shield className="w-8 h-8 md:w-10 md:h-10" />,
      title: "Secure Payments",
      description: "256-bit SSL encryption & PCI compliant",
      highlight: "100% protected",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      icon: <Truck className="w-8 h-8 md:w-10 md:h-10" />,
      title: "Fast Delivery",
      description: "2-4 business days · Free over $50",
      highlight: "Same-day dispatch",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      icon: <RefreshCw className="w-8 h-8 md:w-10 md:h-10" />,
      title: "Easy Returns",
      description: "30-day hassle-free returns",
      highlight: "Free return shipping",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      icon: <Award className="w-8 h-8 md:w-10 md:h-10" />,
      title: "Quality Guaranteed",
      description: "100% authentic products · Tested & approved",
      highlight: "Certificate of authenticity",
      color: "from-red-500 to-red-600"
    }
  ];

 
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Shop With Confidence
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best shopping experience, from browse to delivery
          </p>
        </div>

        {/* Main trust features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {trustFeatures.map((feature) => (
            <div
              key={feature.id}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              {/* Gradient icon background */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {feature.description}
              </p>
              
              {/* Highlight badge */}
              <div className="inline-block bg-gray-100 rounded-full px-3 py-1">
                <span className="text-xs font-semibold text-gray-700">
                  ✓ {feature.highlight}
                </span>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                <div className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br ${feature.color} opacity-10 transform rotate-45 translate-x-6 -translate-y-6`}></div>
              </div>
            </div>
          ))}
        </div>

        
      </div>

      {/* Background decorative elements */}
      <div className="absolute left-0 right-0 -z-10">
        <div className="relative max-w-7xl mx-auto">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-100 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
        </div>
      </div>
    </section>
  );
};

export default WhyShopWithUs;