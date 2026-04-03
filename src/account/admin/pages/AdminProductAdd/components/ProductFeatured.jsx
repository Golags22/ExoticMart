import { FiStar } from "react-icons/fi";

export default function ProductFeatured({ data, setData }) {
  const handleChange = (e) => {
    const { checked } = e.target;
    setData(prev => ({ ...prev, featured: checked }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <label className="flex items-start cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={data.featured}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className={`w-5 h-5 border-2 rounded-md transition-all ${
              data.featured 
                ? 'bg-red-600 border-red-600' 
                : 'border-gray-300 peer-hover:border-red-400'
            }`}>
              {data.featured && (
                <FiStar className="w-4 h-4 text-white absolute top-0.5 left-0.5" />
              )}
            </div>
          </div>
          <div className="ml-3 flex-1">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium transition-colors ${
                data.featured 
                  ? 'text-red-600' 
                  : 'text-gray-700 group-hover:text-red-600'
              }`}>
                Mark as Featured Product
              </span>
              {data.featured && (
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                  Featured
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Featured products will be displayed prominently on the homepage
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}