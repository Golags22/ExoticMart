import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Keep existing params
    const params = new URLSearchParams(searchParams);

    // Update search
    params.set("search", query);

    navigate(`/shop?${params.toString()}`);
    setQuery("");
  };

  return (
    <form onSubmit={handleSearch} className="hidden sm:block relative">
      
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-8 pr-3 py-1 rounded-full text-sm"
      />
      <Search size={16} className="absolute left-2 top-2 text-gray-500" />
    </form>
  );
}