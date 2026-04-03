import { useSearchParams } from "react-router-dom";

export default function FilterChips({ category, search, min, max }) {
  const [params, setParams] = useSearchParams();

  const removeFilter = (key) => {
    params.delete(key);
    setParams(params);
  };

  const clearAll = () => {
    setParams({});
  };

  if (!category && !search && !min && !max) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4 items-center">

      {category && (
        <div className="bg-gray-200 px-3 py-1 rounded-full text-sm flex gap-2 items-center">
          Category: {category}
          <button onClick={() => removeFilter("category")}>✕</button>
        </div>
      )}

      {search && (
        <div className="bg-gray-200 px-3 py-1 rounded-full text-sm flex gap-2 items-center">
          Search: {search}
          <button onClick={() => removeFilter("search")}>✕</button>
        </div>
      )}

      {min && max && (
        <div className="bg-gray-200 px-3 py-1 rounded-full text-sm flex gap-2 items-center">
          Price: {min} - {max}
          <button onClick={() => {
            removeFilter("min");
            removeFilter("max");
          }}>
            ✕
          </button>
        </div>
      )}

      {/* Clear All */}
      <button
        onClick={clearAll}
        className="text-red-600 text-sm underline ml-2"
      >
        Clear All
      </button>
    </div>
  );
}