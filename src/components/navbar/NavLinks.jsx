import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../../data/navLinks";
import ShopDropdown from "./ShopDropdown";

export default function NavLinks() {
  const location = useLocation();

  return (
    <div className="hidden lg:flex items-center gap-4">

          {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`text-white px-3 py-2 rounded-md text-sm ${
            location.pathname === link.path
              ? "bg-red-700"
              : "hover:bg-red-700"
          }`}
        >
          {link.title}
        </Link>
        
      ))}
        {/* Shop with dropdown */}
      <ShopDropdown />
    </div>
  );
}