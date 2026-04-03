import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CartIcon() {
  const { cartCount } = useCart();

  return (
    <Link to="/cart" className="relative text-white">
      <ShoppingBag size={20} />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-2 bg-white text-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
  );
}