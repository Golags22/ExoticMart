// components/Loading.jsx
import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slower"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      {/* Floating beauty/fashion icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 text-4xl animate-float-slow opacity-20">💄</div>
        <div className="absolute top-40 right-32 text-4xl animate-float-delayed opacity-20">💎</div>
        <div className="absolute bottom-32 left-40 text-4xl animate-float opacity-20">👗</div>
        <div className="absolute bottom-20 right-20 text-4xl animate-float-slow opacity-20">👜</div>
        <div className="absolute top-1/3 left-1/4 text-4xl animate-float-delayed opacity-20">💇</div>
        <div className="absolute bottom-1/3 right-1/4 text-4xl animate-float opacity-20">👑</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-4">
        {/* Logo with glow effect */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-red-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-red-600 to-red-500 rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <img 
              src="/logos/logo.svg" 
              alt="Exotic Mart" 
              className="w-20 h-20 object-contain filter brightness-0 invert"
            />
          </div>
        </div>

        {/* Animated rings */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-red-600 rounded-full animate-ping opacity-20"></div>
          {/* Middle ring */}
          <div className="absolute inset-2 border-4 border-red-500 rounded-full animate-spin-slow border-t-transparent"></div>
          {/* Inner ring */}
          <div className="absolute inset-4 border-4 border-red-400 rounded-full animate-spin-reverse border-b-transparent"></div>
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading text with animation */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 animate-pulse">
            Exotic Mart
          </h2>
          <div className="flex items-center justify-center gap-1">
            <span className="text-gray-600 text-lg">Loading</span>
            <span className="text-red-600 font-bold text-lg animate-bounce">.</span>
            <span className="text-red-600 font-bold text-lg animate-bounce delay-150">.</span>
            <span className="text-red-600 font-bold text-lg animate-bounce delay-300">.</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-8 max-w-xs mx-auto">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full animate-progress"></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Preparing your beauty experience...</p>
        </div>

        {/* Fashion quotes */}
        <div className="mt-8 text-sm text-gray-500 italic animate-fade-in-out">
          <p>"Elegance is the only beauty that never fades"</p>
        </div>

        {/* Brand dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-red-300 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 2s linear infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 7s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }
        
        @keyframes pulse-slower {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.1);
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }
        
        @keyframes progress {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }
        
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
          width: 0%;
        }
        
        @keyframes fade-in-out {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        
        .animate-fade-in-out {
          animation: fade-in-out 3s ease-in-out infinite;
        }
        
        .delay-150 {
          animation-delay: 150ms;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
}