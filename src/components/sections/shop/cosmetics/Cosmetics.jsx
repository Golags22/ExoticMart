import React, { useState } from 'react';
import { Sparkles, Droplet,  ChevronRight, Filter, Heart, Star } from 'lucide-react';
import Skincare from './Skincare';
import Makeup from './Makeup';
import { GiLipstick } from "react-icons/gi";
export default function Cosmetics() {
  const [activeSection, setActiveSection] = useState('makeup');

  return (
    <div className="bg-gradient-to-b from-white to-red-50 min-h-screen">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-red-600 to-red-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur">
            <Sparkles className="text-white" size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Cosmetics Collection
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto">
            Discover our premium range of cruelty-free makeup and skincare products
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Section Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-md border border-gray-100">
            <button
              onClick={() => setActiveSection('makeup')}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                ${activeSection === 'makeup' 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-red-600'
                }
              `}
            >
              <GiLipstick  size={16} />
              Makeup
            </button>
            <button
              onClick={() => setActiveSection('skincare')}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                ${activeSection === 'skincare' 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-red-600'
                }
              `}
            >
              <Droplet size={16} />
              Skincare
            </button>
          </div>
        </div>

        {/* Active Section Content */}
        <div className="animate-fadeIn">
          {activeSection === 'makeup' ? <Makeup /> : <Skincare />}
        </div>

        {/* Quick Tips Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
              <Sparkles size={20} className="text-red-500" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Cruelty-Free</h3>
            <p className="text-sm text-gray-500">Never tested on animals. Proudly certified.</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
              <Star size={20} className="text-red-500" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Top Rated</h3>
            <p className="text-sm text-gray-500">4.8/5 from 10,000+ customer reviews</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
              <Heart size={20} className="text-red-500" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Love It Guarantee</h3>
            <p className="text-sm text-gray-500">30-day money-back guarantee</p>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}