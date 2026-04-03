import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

// Example categories (replace with your data)
const categories = [
  { name: "Cosmetics", slug: "Cosmetics" },
  { name: "Jewelry", slug: "Jewelry" },
  { name: "clothing", slug: "clothing" },
  { name: "Hair", slug: "Hair" },
];

export default function ShopDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = (slug) => {
    navigate(`/shop?category=${slug}`);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center text-white px-3 py-2 hover:bg-red-700 rounded-md"
      >
        Shop <ChevronDown size={16} className="ml-1" />
      </button>

      {open && (
        <div className="absolute bg-white shadow-md rounded-md mt-2 w-52">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryClick(cat.slug)}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-red-50"
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}