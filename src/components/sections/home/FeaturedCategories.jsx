import { categoriesItems } from "../../../data/data";

const FeaturedCategories = () => {
 

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Shop by department</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Featured Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our most-loved collections, curated just for you
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categoriesItems.map((category) => (
            <a
              key={category.id}
              href={category.href}
              className="group relative block overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image container with overlay */}
              <div className="relative h-80 overflow-hidden">
                {/* Background image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient overlay - changes on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-500`}></div>
                
                {/* Red overlay on hover */}
                <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                
                {/* Content inside image */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/90 mb-2 transform transition-transform duration-500 group-hover:translate-y-[-4px] delay-100">
                    {category.description}
                  </p>
                  <div className="flex items-center text-xs font-medium text-white/80 transform transition-transform duration-500 group-hover:translate-y-[-4px] delay-150">
                    <span>{category.itemCount}</span>
                    <svg 
                      className="w-4 h-4 ml-1 transition-transform duration-500 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Bottom decorative bar */}
              <div className={`h-1 bg-gradient-to-r ${category.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </a>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <a 
            href="/all-categories" 
            className="inline-flex items-center gap-2 text-red-600 font-medium hover:text-red-700 group"
          >
            <span>View All Categories</span>
            <svg 
              className="w-4 h-4 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 right-0 -z-10">
        <div className="relative max-w-7xl mx-auto">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse animation-delay-2000"></div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default FeaturedCategories;