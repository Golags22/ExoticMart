import React from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Heart, Send } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Best Sellers", href: "/best-sellers" },
    { name: "Cosmetics", href: "/cosmetics" },
    { name: "Hair Care", href: "/hair" },
    { name: "Jewelry", href: "/jewelry" },
    { name: "Clothing", href: "/clothing" },
    { name: "Accessories", href: "/accessories" },
    { name: "Sale %", href: "/sale" }
  ];

  const customerSupport = [
    { name: "FAQ", href: "/faq" },
    { name: "Shipping Information", href: "/shipping" },
    { name: "Returns & Exchanges", href: "/returns" },
    { name: "Order Tracking", href: "/track-order" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "Gift Cards", href: "/gift-cards" }
  ];

  const policies = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Accessibility", href: "/accessibility" },
    { name: "Do Not Sell My Info", href: "/ccpa" }
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "https://facebook.com/exoticmart", name: "Facebook" },
    { icon: <Twitter size={20} />, href: "https://twitter.com/exoticmart", name: "Twitter" },
    { icon: <Instagram size={20} />, href: "https://instagram.com/exoticmart", name: "Instagram" },
    { icon: <Youtube size={20} />, href: "https://youtube.com/exoticmart", name: "YouTube" }
  ];

  const contactInfo = [
    { icon: <Mail size={18} />, text: "support@exoticmart.com", href: "mailto:support@exoticmart.com" },
    { icon: <Phone size={18} />, text: "+1 (800) 555-0123", href: "tel:+18005550123" },
    { icon: <MapPin size={18} />, text: "123 Fashion Ave, New York, NY 10001", href: "https://maps.google.com" }
  ];

  const paymentIcons = [
    { name: "Visa", icon: "https://placehold.co/40x25/1a1f71/ffffff?text=VISA&font=montserrat" },
    { name: "Mastercard", icon: "https://placehold.co/40x25/eb001b/ffffff?text=MC&font=montserrat" },
    { name: "American Express", icon: "https://placehold.co/40x25/006fcf/ffffff?text=AMEX&font=montserrat" },
    { name: "Discover", icon: "https://placehold.co/40x25/ff6000/ffffff?text=DISCOVER&font=montserrat" },
    { name: "PayPal", icon: "https://placehold.co/40x25/003087/ffffff?text=PAYPAL&font=montserrat" },
    { name: "Apple Pay", icon: "https://placehold.co/40x25/000000/ffffff?text=APPLE&font=montserrat" }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Brand and Newsletter - Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 pb-12 border-b border-gray-800">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-bold text-red-600">Exotic</span>
              <span className="text-2xl font-light text-white">Mart</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Your destination for curated beauty, jewelry, and fashion. Discover your signature style with Exotic Mart.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Heart size={16} className="text-red-600" />
              <span>Made with love for beauty & fashion</span>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-2">Join the Exotic Mart Family</h3>
            <p className="text-sm text-gray-400 mb-4">Subscribe for 10% off your first order + exclusive updates</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
                <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2">
                Subscribe
                <Send size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>

        {/* Links Grid - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-red-600 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Customer Support</h3>
            <ul className="space-y-2">
              {customerSupport.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-red-600 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Policies</h3>
            <ul className="space-y-2">
              {policies.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-red-600 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch & Social */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Get in Touch</h3>
            <ul className="space-y-3 mb-6">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="text-gray-400 hover:text-red-600 transition-colors flex items-center gap-3">
                    <span className="text-red-600">{item.icon}</span>
                    <span className="text-sm">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-white text-sm font-medium mb-3">Follow Us</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-600 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods and Copyright */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Payment Icons */}
            <div>
              <h4 className="text-white text-sm font-medium mb-3">We Accept</h4>
              <div className="flex flex-wrap gap-2">
                {paymentIcons.map((payment) => (
                  <img
                    key={payment.name}
                    src={payment.icon}
                    alt={payment.name}
                    className="h-6 w-auto object-contain bg-white rounded px-1"
                  />
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-500">
              <p>© {currentYear} Exotic Mart. All rights reserved.</p>
              <p className="mt-1">
                <a href="/sitemap" className="hover:text-red-600 transition-colors">Sitemap</a>
                {" • "}
                <a href="/privacy" className="hover:text-red-600 transition-colors">Privacy</a>
                {" • "}
                <a href="/terms" className="hover:text-red-600 transition-colors">Terms</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;