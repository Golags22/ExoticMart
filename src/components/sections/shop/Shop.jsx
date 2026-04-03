import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Filter, X, LayoutGrid, List } from "lucide-react";
import FiltersSidebar from "./FiltersSidebar";
import ProductGrid from "./ProductGrid";
import FilterChips from "./FilterChips";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const subcategory = searchParams.get("subcategory");

  // Check if any filters are active
  const hasActiveFilters = category || search || min || max || subcategory;

  return (
    <div className="bg-gradient-to-b from-white to-red-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            Shop Collection
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Discover our curated collection of premium products
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:border-red-300 transition-colors"
          >
            <Filter size={18} />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>
          
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded transition-colors ${
                viewMode === "grid" ? "bg-red-500 text-white" : "text-gray-500 hover:text-red-500"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded transition-colors ${
                viewMode === "list" ? "bg-red-500 text-white" : "text-gray-500 hover:text-red-500"
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Active Filters Chips */}
        {hasActiveFilters && (
          <div className="mb-4">
            <FilterChips 
              category={category} 
              search={search} 
              min={min} 
              max={max}
              subcategory={subcategory}
            />
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-red-600 px-5 py-3">
                  <h2 className="text-white font-semibold flex items-center gap-2">
                    <Filter size={18} />
                    Filters
                  </h2>
                </div>
                <div className="p-4">
                  <FiltersSidebar />
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Desktop View Toggle */}
            <div className="hidden lg:flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                Showing products
              </p>
              <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1.5 rounded text-sm transition-colors ${
                    viewMode === "grid" ? "bg-red-500 text-white" : "text-gray-500 hover:text-red-500"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1.5 rounded text-sm transition-colors ${
                    viewMode === "list" ? "bg-red-500 text-white" : "text-gray-500 hover:text-red-500"
                  }`}
                >
                  List
                </button>
              </div>
            </div>

            {/* Product Grid/List */}
            <ProductGrid
              category={category}
              search={search}
              min={min}
              max={max}
              subcategory={subcategory}
              viewMode={viewMode}
            />
          </div>
        </div>

        {/* Mobile Filters Sidebar */}
        {mobileFiltersOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="fixed right-0 top-0 h-full w-80 bg-white z-50 shadow-xl lg:hidden animate-slideIn">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded-lg hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
                <FiltersSidebar onFilterApply={() => setMobileFiltersOpen(false)} />
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}