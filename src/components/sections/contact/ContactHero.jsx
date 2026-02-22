import React from "react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-600 rounded-full blur-3xl"></div>
      </div>
      
      {/* Animated dots pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{ 
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-sm border border-red-500/30 px-4 py-2 rounded-full mb-6">
              <MessageCircle size={16} className="text-red-400" />
              <span className="text-red-200 font-medium text-sm uppercase tracking-wider">
                Get in Touch
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              We're Here to{" "}
              <span className="relative">
                <span className="text-red-500">Help</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-red-600/30 -z-10"></span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
              Have questions about our products? Need assistance with an order? 
              Our team is ready to help you with anything you need.
            </p>

            {/* Quick Contact Options */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:support@exoticmart.com"
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <Mail size={18} className="group-hover:scale-110 transition-transform" />
                support@exoticmart.com
              </a>
              <a
                href="tel:+2349034829264"
                className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 border border-gray-700 group"
              >
                <Phone size={18} className="group-hover:scale-110 transition-transform" />
                +234 903 482 9264
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 mt-10 pt-6 border-t border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">24/7 Support</span>
              </div>
              <div className="w-px h-4 bg-gray-800"></div>
              <div className="flex items-center gap-2">
                <MessageCircle size={14} className="text-red-500" />
                <span className="text-sm text-gray-400">Avg response: 2h</span>
              </div>
              <div className="w-px h-4 bg-gray-800"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">50k+ happy customers</span>
              </div>
            </div>
          </div>

          {/* Right Content - Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email Card */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 group">
              <div className="bg-red-600/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-1">Email Us</h3>
              <p className="text-gray-300 text-sm mb-3">Get support via email</p>
              <a href="mailto:support@exoticmart.com" className="text-red-400 text-sm font-medium hover:text-red-300 inline-flex items-center gap-1">
                support@exoticmart.com
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 group">
              <div className="bg-red-600/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-1">Call Us</h3>
              <p className="text-gray-300 text-sm mb-3">Mon-Fri, 9am-6pm</p>
              <a href="tel:+2349034829264" className="text-red-400 text-sm font-medium hover:text-red-300 inline-flex items-center gap-1">
                +4591418498
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Visit Card - spans full width on mobile, half on desktop */}
            <div className="sm:col-span-2 bg-gradient-to-br from-red-600/20 to-red-800/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-6 hover:from-red-600/30 hover:to-red-800/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-red-600/40 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Visit Our Store</h3>
                  <p className="text-gray-300 text-sm mb-2">Koldingvej 152A, 7100 Vejle</p>
                  <a 
                    href="https://www.google.com/maps/place/Idi-aba,+Abeokuta,+Ogun+State,+Nigeria" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-400 text-sm font-medium hover:text-red-300 inline-flex items-center gap-1"
                  >
                    Get Directions
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Divider (optional) */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-auto text-white" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 50L60 55C120 60 240 70 360 70C480 70 600 60 720 50C840 40 960 30 1080 30C1200 30 1320 40 1380 45L1440 50V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="currentColor"/>
          </svg>
        </div>
      </div>
    </section>
  );
}