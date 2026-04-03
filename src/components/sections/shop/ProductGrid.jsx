import { useEffect, useState } from "react";
import { db } from "../../../backend/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import ProductCard from "./ProductCard";

export default function ProductGrid({ category, search, min, max }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let q = collection(db, "products");

        // ✅ Firestore filter (category)
        if (category) {
          q = query(q, where("category", "==", category));
        }

        const snapshot = await getDocs(q);

        let data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // ✅ Search filter (safe)
        if (search) {
          const searchLower = search.toLowerCase();
          data = data.filter(p =>
            p.name?.toLowerCase().includes(searchLower)
          );
        }

        // ✅ Price filter (safe)
        if (min && max) {
          const minVal = Number(min);
          const maxVal = Number(max);

          data = data.filter(p =>
            p.price >= minVal && p.price <= maxVal
          );
        }

        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, search, min, max]);

  // 🔄 Loading
  if (loading) {
    return (
      <div className="text-center py-10">
        <p>Loading products...</p>
      </div>
    );
  }

  // ❌ Error state
  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        {error}
      </div>
    );
  }

  // ❌ Empty state (IMPROVED UX)
  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg font-semibold mb-2">
          No products found
        </p>

        <p className="text-gray-500 mb-4">
          {category && `in "${category}"`}{" "}
          {search && `for "${search}"`}
        </p>

        <p className="text-sm text-gray-400">
          Try removing filters or searching something else
        </p>
      </div>
    );
  }

  // ✅ Products
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}