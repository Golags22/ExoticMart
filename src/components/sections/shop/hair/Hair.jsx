import React from 'react';
import { Scissors, Wind, Sparkles, Heart, Shield, Truck } from 'lucide-react';
import Menhair from './Menhair';
import Womenhair from './Womenhair';

export default function Hair() {
  return (
    <div className="bg-gradient-to-b from-white to-red-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Scissors className="text-red-500" size={28} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            Hair Care
          </h1>
          <p className="text-gray-500 mt-2">Premium products for beautiful hair</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Women's Hair Card */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-5 py-3">
              <div className="flex items-center gap-2">
                <Wind className="text-white" size={20} />
                <h2 className="text-white font-semibold">Women's Hair</h2>
              </div>
            </div>
            <div className="p-5">
              <Womenhair />
            </div>
          </div>

          {/* Men's Hair Card */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-5 py-3">
              <div className="flex items-center gap-2">
                <Scissors className="text-white" size={20} />
                <h2 className="text-white font-semibold">Men's Hair</h2>
              </div>
            </div>
            <div className="p-5">
              <Menhair />
            </div>
          </div>

        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="text-center">
            <Heart className="text-red-500 mx-auto mb-2" size={20} />
            <p className="text-xs text-gray-600">Cruelty-Free</p>
          </div>
          <div className="text-center">
            <Shield className="text-red-500 mx-auto mb-2" size={20} />
            <p className="text-xs text-gray-600">Dermatologist Tested</p>
          </div>
          <div className="text-center">
            <Truck className="text-red-500 mx-auto mb-2" size={20} />
            <p className="text-xs text-gray-600">Free Shipping $50+</p>
          </div>
        </div>

      </div>
    </div>
  );
}