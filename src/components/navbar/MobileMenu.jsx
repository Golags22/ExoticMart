import { Link } from "react-router-dom";
import { navLinks } from "../../data/navLinks";

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden bg-white mt-2 rounded-md shadow-md p-3 space-y-2">

      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          onClick={onClose}
          className="block py-2 text-gray-700"
        >
          {link.title}
        </Link>
      ))}
      <Link to="/shop" onClick={onClose} className="block py-2">
        Shop
      </Link>
    </div>
  );
}