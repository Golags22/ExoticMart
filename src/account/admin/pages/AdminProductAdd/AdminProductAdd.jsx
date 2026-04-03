import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../../context/AuthContext";
import { db } from "../../../../backend/firebase";

import ProductBasicInfo from "./components/ProductBasicInfo";
import ProductPricing from "./components/ProductPricing";
import ProductImages from "./components/ProductImages";
import ProductFeatured from "./components/ProductFeatured";
import ProductActions from "./components/ProductActions";

export default function AdminProductAdd() {
  const { userProfile, claims } = useAuth();
  const navigate = useNavigate();

  // Admin guard
  if (!claims?.admin && userProfile?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full border border-red-100">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <button
            onClick={() => navigate("/admin")}
            className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all shadow-md"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const [productData, setProductData] = useState({
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Comprehensive validation function
  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (!productData.name || productData.name.trim() === "") {
      errors.name = "Product name is required";
    } else if (productData.name.length < 3) {
      errors.name = "Product name must be at least 3 characters";
    }
    
    // Category validation
    if (!productData.category) {
      errors.category = "Please select a category";
    }
    // Category validation
    if (!productData.subcategory) {
      errors.subcategory = "Please select a subcategory";
    }
    
    // Price validation
    if (!productData.price || productData.price === "") {
      errors.price = "Price is required";
    } else if (Number(productData.price) <= 0) {
      errors.price = "Price must be greater than 0";
    }
    
    // Stock validation
    if (productData.stock === "" || productData.stock === null) {
      errors.stock = "Stock quantity is required";
    } else if (Number(productData.stock) < 0) {
      errors.stock = "Stock cannot be negative";
    }
    
    // Description validation
    if (!productData.description || productData.description.trim() === "") {
      errors.description = "Product description is required";
    } else if (productData.description.length < 10) {
      errors.description = "Description must be at least 10 characters";
    }
    
    // Images validation
    if (!productData.images || productData.images.length === 0) {
      errors.images = "Please upload at least one product image";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isValid = validateForm();
    
    if (!isValid) {
      // Create a readable error message
      const errorMessages = Object.values(validationErrors).join(", ");
      toast.error(`❌ ${errorMessages}`);
      
      // Scroll to the first error
      const firstErrorField = Object.keys(validationErrors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const id = Date.now().toString();

      const productToSave = {
        id,
        name: productData.name.trim(),
        description: productData.description.trim(),
        category: productData.category,
        subcategory: productData.subcategory,
        price: Number(productData.price),
        originalPrice: productData.originalPrice ? Number(productData.originalPrice) : 0,
        stock: Number(productData.stock),
        brand: productData.brand?.trim() || "",
        images: productData.images,
        featured: productData.featured,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // fakeRating/Datas
        rating: 5,
        reviews: 10,
        sold: 3,
      };

      await setDoc(doc(db, "products", id), productToSave);
      
      toast.success("✅ Product added successfully!");
      
      // Reset form after successful submission
      setProductData({
        name: "",
        description: "",
        category: "",
        subcategory:"",
        price: "",
        originalPrice: "",
        stock: "",
        brand: "",
        images: [],
        featured: false,
      });
      setValidationErrors({});
      
      // Navigate back after 2 seconds
      setTimeout(() => {
        navigate("/admin/products");
      }, 2000);
      
    } catch (err) {
      console.error("Error adding product:", err);
      toast.error("❌ Failed to add product: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/products")}
            className="group flex items-center gap-2 text-red-600 hover:text-red-700 mb-4 transition-all duration-300 hover:translate-x-[-4px]"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to Products</span>
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Add New Product
              </h1>
              <p className="text-gray-600">Create a new product and add it to your store</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-lg shadow-sm border border-red-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Ready to publish</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <ProductBasicInfo 
            data={productData} 
            setData={setProductData} 
            errors={validationErrors}
          />
          <ProductPricing 
            data={productData} 
            setData={setProductData}
            errors={validationErrors}
          />
          <ProductImages 
            data={productData} 
            setData={setProductData}
            errors={validationErrors}
          />
          <ProductFeatured 
            data={productData} 
            setData={setProductData}
          />
          <ProductActions 
            isSubmitting={isSubmitting} 
          />
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
}