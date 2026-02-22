import React from "react";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

export default function MapSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
            Visit Our Store
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Find Us Here
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2 rounded-xl overflow-hidden shadow-lg border border-gray-200 h-[400px] lg:h-[450px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2052.414467541764!2d9.5228780764286!3d55.69629499634254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464c83824a99fb95%3A0xe10460037898d248!2sExotic%20Mart(Afro-Caribbean)!5e1!3m2!1sen!2sdk!4v1771082275322!5m2!1sen!2sdk" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Exotic Mart Location"
              className="w-full h-full"
            />
          </div>

          {/* Location Info */}
          <div className="bg-gray-50 rounded-xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <span className="w-1 h-6 bg-red-600 rounded-full"></span>
              Exotic Mart Flagship Store
            </h3>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start group hover:bg-white p-3 rounded-lg transition-colors">
                <MapPin className="w-5 h-5 text-red-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 font-medium">Exotic Mart(Afro-Caribbean)
</p>
                  <p className="text-gray-600">Koldingvej 152A, 7100 Vejle</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start group hover:bg-white p-3 rounded-lg transition-colors">
                <Phone className="w-5 h-5 text-red-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <a 
                    href="tel:+2349034829264" 
                    className="text-gray-900 font-medium hover:text-red-600 transition-colors"
                  >
                    +4591418498
                  </a>
                  <p className="text-gray-500 text-sm">Mon-Fri, 9am-6pm • Sat, 10am-4pm</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start group hover:bg-white p-3 rounded-lg transition-colors">
                <Clock className="w-5 h-5 text-red-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 font-medium">Store Hours</p>
                  <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
                  <p className="text-gray-600">Saturday: 10am - 4pm</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <a
                  href="https://maps.app.goo.gl/ZUnoWS7BmruSD1aJA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all duration-300 gap-2 shadow-md hover:shadow-lg group"
                >
                  <Navigation size={18} className="group-hover:translate-x-1 transition-transform" />
                  Get Directions
                </a>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}