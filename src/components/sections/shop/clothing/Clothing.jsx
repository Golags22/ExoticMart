import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Shirt, Baby, Users, Filter } from 'lucide-react';
import Men from './Men';
import Women from './Women';
import Kids from './Kids';

const Clothing = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, name: "Men", icon: Users, component: Men, description: "Men's fashion collection" },
    { id: 1, name: "Women", icon: Shirt, component: Women, description: "Women's fashion collection" },
    { id: 2, name: "Kids", icon: Baby, component: Kids, description: "Kids' fashion collection" },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-red-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-3">
            Clothing Collection
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Discover our premium clothing collection for the whole family. 
            Quality fabrics, modern designs, and affordable prices.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    group relative flex items-center gap-2 px-4 sm:px-6 py-3 
                    text-sm sm:text-base font-medium transition-all duration-300
                    ${isActive 
                      ? 'text-red-600' 
                      : 'text-gray-500 hover:text-gray-700'
                    }
                  `}
                >
                  <Icon 
                    size={18} 
                    className={`transition-all duration-300 ${
                      isActive ? 'text-red-500 scale-110' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  <span>{tab.name}</span>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {tabs.map((tab) => (
            <div key={tab.id} className={activeTab === tab.id ? 'block animate-fadeIn' : 'hidden'}>
              <div className="mb-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {tab.name}'s Collection
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">{tab.description}</p>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 border border-gray-300 rounded-lg hover:border-red-300 transition-colors">
                    <Filter size={14} />
                    Filter
                  </button>
                </div>
              </div>
              
              {/* Render the component */}
              <tab.component />
            </div>
          ))}
        </div>

        {/* Promotional Banner */}
        <div className="mt-12 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-center">
          <h3 className="text-white text-xl font-bold mb-2">
            Limited Time Offer!
          </h3>
          <p className="text-white/90 text-sm mb-4">
            Get up to 40% off on selected items. Free shipping on orders over $50
          </p>
          <button className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105">
            Shop Now →
          </button>
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
};

export default Clothing;