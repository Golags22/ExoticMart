import { FiPackage, FiTag } from "react-icons/fi";
import { categories } from "../../../../../data/categories";

export default function ProductBasicInfo({ data, setData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  // Find the selected category object
  const selectedCategory = categories.find(c => c.slug === data.category);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <FiPackage className="text-white" />
          Basic Information
        </h2>
      </div>

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all outline-none"
            />
          </div>

          {/* Main Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={data.category}
              onChange={(e) => {
                setData(prev => ({
                  ...prev,
                  category: e.target.value,
                  subcategory: "" // reset subcategory on main category change
                }));
              }}
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
        </div>

        {/* Subcategory (dynamic) */}
        {selectedCategory?.subcategories?.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategory
            </label>
            <select
              name="subcategory"
              value={data.subcategory}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all outline-none bg-white"
            >
              <option value="">Select a subcategory</option>
              {selectedCategory.subcategories.map(sub => (
                <option key={sub.slug} value={sub.slug}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand
          </label>
          <div className="relative">
            <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="brand"
              value={data.brand}
              onChange={handleChange}
              placeholder="Enter brand name"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter product description..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-200 transition-all resize-none outline-none"
          />
        </div>
      </div>
    </div>
  );
}