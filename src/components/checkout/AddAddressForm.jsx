import { useState } from "react";
import { db } from "../../backend/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

export default function AddAddressForm({ onAddressAdded }) {
  const { user } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!form.fullName || !form.phone || !form.address) {
      alert("Please fill all fields");
      return;
    }

    if (!user) return;

    setLoading(true);

    try {
      const ref = collection(db, "customers", user.uid, "addresses");

      await addDoc(ref, {
        ...form,
        createdAt: serverTimestamp()
      });

      // reset form
      setForm({
        fullName: "",
        phone: "",
        address: ""
      });

      onAddressAdded(); // refresh parent
    } catch (err) {
      console.error(err);
      alert("Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 mt-3 rounded">
      <h3 className="font-semibold mb-2">Add New Address</h3>

      <input
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <textarea
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : "Save Address"}
      </button>
    </div>
  );
}