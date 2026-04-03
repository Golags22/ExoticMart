import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import AccountMenu from "./AccountMenu";
import CartIcon from "./CartIcon";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  if (location.pathname.startsWith("/admin")) return null;

  return (
    <nav className="bg-red-600 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center h-16">

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
          >
            ☰
          </button>

          <Logo />

          <NavLinks />

          <div className="flex items-center gap-3">
            <SearchBar />
            <AccountMenu />
            <CartIcon />
          </div>
        </div>

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

      </div>
    </nav>
  );
}