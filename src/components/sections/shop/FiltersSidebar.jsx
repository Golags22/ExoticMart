import { useSearchParams } from "react-router-dom";

export default function FiltersSidebar() {
  const [params, setParams] = useSearchParams();

  const updateParam = (key, value) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setParams(params);
  };

  return (
    <div className="space-y-6">

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-2">Categories</h3>

        <button onClick={() => updateParam("category", "cosmetics")}>
          Cosmetics
        </button>

        <button onClick={() => updateParam("category", "jewelry")}>
          Jewelry
        </button>

        <button onClick={() => updateParam("category", "clothing")}>
          Clothing
        </button>

        <button onClick={() => updateParam("category", "hair")}>
          Hair
        </button>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="font-semibold mb-2">Price</h3>

        <button onClick={() => {
          updateParam("min", 0);
          updateParam("max", 50);
        }}>
          Under 50
        </button>

        <button onClick={() => {
          updateParam("min", 50);
          updateParam("max", 200);
        }}>
          50 - 200
        </button>
      </div>

    </div>
  );
}