import { useState, useEffect } from "react";
import AddAddressForm from "./AddAddressForm";
import { CheckCircle, Plus } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../backend/firebase";

export default function ShippingAddress({ user, selectedAddress, setSelectedAddress }) {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  const fetchAddresses = async () => {
    if (!user) return;

    try {
      const ref = collection(db, "customers", user.uid, "addresses");
      const snapshot = await getDocs(ref);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAddresses(data);
      setSelectedAddress(data[0] || null);
      if (data.length === 0) setShowForm(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [user]);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-red-50 to-white px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
            1
          </div>
          <h2 className="font-semibold text-gray-900">Shipping Address</h2>
        </div>
      </div>

      <div className="p-6">
        {loadingAddresses ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-2 border-red-200 border-t-red-500 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {addresses.length > 0 && (
              <div className="space-y-3 mb-4">
                {addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`
                      flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer
                      transition-all duration-200
                      ${selectedAddress?.id === addr.id
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-red-200"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      checked={selectedAddress?.id === addr.id}
                      onChange={() => setSelectedAddress(addr)}
                      className="mt-1 w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{addr.fullName}</p>
                      <p className="text-sm text-gray-600 mt-1">{addr.address}</p>
                      <p className="text-sm text-gray-600">{addr.city}, {addr.postalCode}</p>
                      {addr.phone && <p className="text-sm text-gray-500 mt-1">{addr.phone}</p>}
                    </div>
                    {selectedAddress?.id === addr.id && (
                      <CheckCircle className="text-red-500 flex-shrink-0" size={20} />
                    )}
                  </label>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors font-medium"
            >
              <Plus size={18} />
              {showForm ? "Cancel" : "Add New Address"}
            </button>

            {showForm && (
              <div className="mt-4">
                <AddAddressForm
                  onAddressAdded={() => {
                    fetchAddresses();
                    setShowForm(false);
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}