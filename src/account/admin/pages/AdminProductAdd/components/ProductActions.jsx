import { useNavigate } from "react-router-dom";
import { FiSave, FiX, FiLoader } from "react-icons/fi";

export default function ProductActions({ isSubmitting }) {
  const navigate = useNavigate();

  return (
    <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-red-100 p-4 sm:p-6 z-10">
      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate("/admin/products")}
          disabled={isSubmitting}
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-red-300 transition-all font-medium flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiX className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          Cancel
        </button>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-medium hover:from-red-700 hover:to-red-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
        >
          {isSubmitting ? (
            <>
              <FiLoader className="w-4 h-4 animate-spin" />
              Adding Product...
            </>
          ) : (
            <>
              <FiSave className="w-4 h-4" />
              Add Product
            </>
          )}
        </button>
      </div>
    </div>
  );
}