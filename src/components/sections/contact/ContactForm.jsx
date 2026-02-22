import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="mb-8">
              <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
                Get in Touch
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Send Us a Message</h2>
              <p className="text-gray-600 mt-2">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </div>

            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <CheckCircle size={20} />
                <span>Thank you for reaching out! We'll get back to you within 24 hours.</span>
              </div>
            )}
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition bg-white"
                  required
                />
              </div>
              
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition bg-white"
                  required
                />
              </div>
              
              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition bg-white resize-none"
                  required
                ></textarea>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {/* Privacy Note */}
              <p className="text-xs text-gray-500 text-center mt-4">
                By submitting this form, you agree to our{" "}
                <a href="/privacy" className="text-red-600 hover:underline">Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl">
          <img 
            src="https://cdn.pixabay.com/photo/2025/08/04/05/50/ai-generated-9753235_1280.jpg" 
            alt="Customer support team" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-red-600/90 via-red-600/40 to-transparent flex items-end p-8">
            <div>
              <div className="bg-white/20 backdrop-blur-sm inline-block px-4 py-1 rounded-full mb-4">
                <span className="text-white text-sm font-medium">Exotic Mart Support</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">We're Here to Help</h3>
              <p className="text-white/90 max-w-md">
                Our dedicated team is ready to assist you with any questions or concerns you may have about our products.
              </p>
              
              {/* Quick Stats */}
              <div className="flex gap-4 mt-6">
                <div>
                  <div className="text-white font-bold text-xl">24/7</div>
                  <div className="text-white/80 text-sm">Support</div>
                </div>
                <div className="w-px h-8 bg-white/30"></div>
                <div>
                  <div className="text-white font-bold text-xl">&lt;24h</div>
                  <div className="text-white/80 text-sm">Response</div>
                </div>
                <div className="w-px h-8 bg-white/30"></div>
                <div>
                  <div className="text-white font-bold text-xl">100%</div>
                  <div className="text-white/80 text-sm">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}