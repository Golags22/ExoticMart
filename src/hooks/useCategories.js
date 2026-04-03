import { useEffect, useState } from "react";
import { db } from "../backend/firebase";
import { collection, getDocs } from "firebase/firestore";
export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, "categories"));
      const data = snapshot.docs.map(doc => doc.data());
      setCategories(data);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return { categories, loading };
}