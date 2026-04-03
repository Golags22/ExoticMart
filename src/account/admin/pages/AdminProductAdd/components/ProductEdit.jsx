// src/account/admin/pages/ProductEdit.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../../../../backend/firebase";
import {
  FiArrowLeft,
  FiSave,
  FiPackage,
  FiDollarSign,
  FiTag,
  FiLoader,
  FiTrash2,
  FiAlertCircle,
} from "react-icons/fi";
import ProductImages from "./ProductImages"; // Import your image component
import { categories } from "../../../../../data/categories";

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subcategory: "",
    price: "",
    originalPrice: "",
    stock: "",
    brand: "",
    images: [],
    featured: false,
  });

  useEffect(() => {
    if (id) {
      fetchProduct();
    } else {
      toast.error("No product ID provided");
      navigate("/admin/products");
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const productRef = doc(db, "products", id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const productData = productSnap.data();
        setFormData({
          name: productData.name || "",
          description: productData.description || "",
          category: productData.category || "",
          subcategory: productData.subcategory || "",

          price: productData.price || "",
          originalPrice: productData.originalPrice || "",
          stock: productData.stock || "",
          brand: productData.brand || "",
          images: productData.images || [], // ✅ Existing images load here
          featured: productData.featured || false,
        });
      } else {
        toast.error("Product not found");
        navigate("/admin/products");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (!formData.category) {
      toast.error("Please select a category");
      return;
    }
    if (!formData.price || formData.price <= 0) {
      toast.error("Valid price is required");
      return;
    }
    if (!formData.stock || formData.stock < 0) {
      toast.error("Valid stock quantity is required");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Product description is required");
      return;
    }
    if (formData.images.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }

    setSaving(true);

    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, {
        name: formData.name.trim(),
        description: formData.description.trim(),
        category: formData.category.toLowerCase(),
        price: Number(formData.price),
        originalPrice: formData.originalPrice
          ? Number(formData.originalPrice)
          : 0,
        stock: Number(formData.stock),
        brand: formData.brand?.trim() || "",
        images: formData.images, // ✅ Updated images (including removals and additions)
        featured: formData.featured,
        updatedAt: new Date().toISOString(),
      });

      toast.success("Product updated successfully!");
      setTimeout(() => {
        navigate("/admin/products");
      }, 1500);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/products")}
            className="group flex items-center gap-2 text-red-600 hover:text-red-700 mb-4 transition-all duration-300 hover:translate-x-[-4px]"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Products</span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Edit Product
              </h1>
              <p className="text-gray-600">Update product information</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-lg shadow-sm border border-red-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Editing: {formData.name}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <FiPackage className="text-white" />
                Basic Information
              </h2>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                  />
                </div>

                <div>
                  
                 {/* Category */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Category <span className="text-red-500">*</span>
  </label>
  <select
    name="category"
    value={formData.category}
    onChange={(e) =>
      setFormData(prev => ({
        ...prev,
        category: e.target.value,
        subcategory: "" // reset subcategory when main category changes
      }))
    }
    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all outline-none bg-white"
  >
    <option value="">Select a category</option>
    {categories.map(cat => (
      <option key={cat.slug} value={cat.slug}>
        {cat.name}
      </option>
    ))}
  </select>
</div>

{/* Subcategory */}
{categories.find(c => c.slug === formData.category)?.subcategories?.length > 0 && (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Subcategory <span className="text-red-500">*</span>
    </label>
    <select
      name="subcategory"
      value={formData.subcategory}
      onChange={(e) =>
        setFormData(prev => ({ ...prev, subcategory: e.target.value }))
      }
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all outline-none bg-white"
    >
      <option value="">Select a subcategory</option>
      {categories.find(c => c.slug === formData.category).subcategories.map(sub => (
        <option key={sub.slug} value={sub.slug}>
          {sub.name}
        </option>
      ))}
    </select>
  </div>
)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <div className="relative">
                  <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Enter brand name"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all resize-none outline-none"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Stock Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <FiDollarSign className="text-white" />
                Pricing & Stock
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Price ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Product Images Component - This handles both existing and new images */}
          <ProductImages data={formData} setData={setFormData} />

          {/* Featured Checkbox */}
          <div className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden">
            <div className="p-6">
              <label className="flex items-start cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded-md transition-all ${
                      formData.featured
                        ? "bg-red-600 border-red-600"
                        : "border-gray-300 peer-hover:border-red-400"
                    }`}
                  >
                    {formData.featured && (
                      <svg
                        className="w-4 h-4 text-white absolute top-0.5 left-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="ml-3">
                  <span
                    className={`text-sm font-medium transition-colors ${
                      formData.featured
                        ? "text-red-600"
                        : "text-gray-700 group-hover:text-red-600"
                    }`}
                  >
                    Mark as Featured Product
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    Featured products will be displayed prominently on the
                    homepage
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-red-100 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-red-300 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-medium hover:from-red-700 hover:to-red-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
              >
                {saving ? (
                  <>
                    <FiLoader className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="rounded-xl shadow-lg border-l-4 border-red-500"
      />
    </div>
  );
};

export default ProductEdit;
