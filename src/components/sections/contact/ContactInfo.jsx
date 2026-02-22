import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfo() {
  const contactMethods = [
    { 
      icon: <Mail className="w-8 h-8 text-red-600" />,
      title: "Email Us",
      value: "support@exoticmart.com",
      action: "mailto:support@exoticmart.com",
      description: "Get quick responses within 24 hours"
    },
    { 
      icon: <Phone className="w-8 h-8 text-red-600" />,
      title: "Call Us",
      value: "+234 903 482 9264",
      action: "tel:+2349034829264",
      description: "Mon-Fri, 9am-6pm • Sat, 10am-4pm"
    },
    { 
      icon: <MapPin className="w-8 h-8 text-red-600" />,
      title: "Visit Us",
      value: "Koldingvej 152A, 7100 Vejle",
      action: "",
      description: ""
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Contact Information
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Multiple ways to reach out to our team
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {contactMethods.map((method, index) => (
            <a 
              key={index} 
              href={method.action}
              target={method.icon.type === MapPin ? "_blank" : undefined}
              rel={method.icon.type === MapPin ? "noopener noreferrer" : undefined}
              className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center border border-gray-100"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5 group-hover">
                <div className="text-red-600 group-hover:text-white transition-colors duration-300">
                  {method.icon}
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-gray-700 font-medium mb-3">{method.value}</p>
              <p className="text-gray-500 text-sm">{method.description}</p>

              {/* Hover Indicator */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-red-600 text-sm font-medium inline-flex items-center gap-1">
                  {method.icon.type === MapPin ? "Get Directions" : "Click to contact"}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Additional Contact Note */}
        <div className="text-center mt-10 pt-6 border-t border-gray-100">
          <p className="text-gray-500 text-sm">
            <span className="font-medium text-gray-700">Response time:</span> Within 24 hours on weekdays
          </p>
        </div>
      </div>
    </section>
  );
}