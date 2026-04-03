import { 
  ShoppingBag, 
  CreditCard, 
  CheckCircle, 
  Package, 
  Truck, 
  MapPin,
  Shield,
  Clock
} from "lucide-react";

const steps = [
  { 
    label: "Shipping", 
    icon: Truck, 
    activeIcon: MapPin,
    description: "Delivery address",
    completedDescription: "Address confirmed"
  },
  { 
    label: "Payment", 
    icon: CreditCard, 
    activeIcon: Shield,
    description: "Payment method",
    completedDescription: "Payment secured"
  },
  { 
    label: "Review", 
    icon: Package, 
    activeIcon: CheckCircle,
    description: "Confirm order",
    completedDescription: "Ready to place"
  }
];

const CheckoutProgress = ({ currentStep }) => {
  return (
    <div className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Complete Your Order
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Secure checkout in {steps.length} easy steps
          </p>
        </div>

        {/* Desktop Horizontal Progress */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Background Track */}
            <div className="absolute top-8 left-0 w-full h-1 bg-gray-200 rounded-full" />
            
            {/* Progress Fill */}
            <div 
              className="absolute top-8 left-0 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
            
            {/* Steps */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = currentStep === stepNumber;
                const isCompleted = currentStep > stepNumber;
                const Icon = step.icon;
                const ActiveIcon = step.activeIcon;
                
                return (
                  <div key={step.label} className="flex flex-col items-center">
                    {/* Step Circle */}
                    <div className="relative">
                      <div
                        className={`
                          w-16 h-16 
                          rounded-full 
                          flex items-center justify-center
                          transition-all duration-300
                          ${isCompleted 
                            ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-200" 
                            : isActive 
                              ? "bg-white text-red-600 border-2 border-red-500 shadow-lg shadow-red-100 ring-4 ring-red-50" 
                              : "bg-white text-gray-400 border-2 border-gray-200"
                          }
                        `}
                      >
                        {isCompleted ? (
                          <CheckCircle size={28} className="animate-check" />
                        ) : (
                          <Icon size={28} className={isActive ? "text-red-500" : ""} />
                        )}
                      </div>
                      
                      {/* Active Indicator Dot */}
                      {isActive && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        </div>
                      )}
                    </div>
                    
                    {/* Step Label */}
                    <div className="mt-4 text-center">
                      <p className={`
                        font-semibold text-sm
                        transition-colors duration-300
                        ${isActive || isCompleted ? "text-gray-900" : "text-gray-400"}
                      `}>
                        {step.label}
                      </p>
                      <p className={`
                        text-xs mt-1
                        transition-colors duration-300
                        ${isActive ? "text-red-600 font-medium" : "text-gray-500"}
                      `}>
                        {isCompleted ? step.completedDescription : step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Vertical Progress */}
        <div className="md:hidden">
          <div className="space-y-6">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = currentStep === stepNumber;
              const isCompleted = currentStep > stepNumber;
              const Icon = step.icon;
              const ActiveIcon = step.activeIcon;
              
              return (
                <div key={step.label} className="relative">
                  <div className="flex items-start gap-4">
                    {/* Step Indicator */}
                    <div className="relative">
                      <div
                        className={`
                          w-12 h-12 
                          rounded-full 
                          flex items-center justify-center
                          transition-all duration-300
                          ${isCompleted 
                            ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md" 
                            : isActive 
                              ? "bg-white text-red-600 border-2 border-red-500 shadow-md ring-4 ring-red-50" 
                              : "bg-white text-gray-400 border-2 border-gray-200"
                          }
                        `}
                      >
                        {isCompleted ? (
                          <CheckCircle size={20} />
                        ) : isActive ? (
                          <ActiveIcon size={20} />
                        ) : (
                          <Icon size={20} />
                        )}
                      </div>
                      
                      {/* Connecting Line */}
                      {index < steps.length - 1 && (
                        <div className={`
                          absolute left-1/2 top-12 w-0.5 h-12 -translate-x-1/2
                          transition-all duration-300
                          ${isCompleted ? "bg-gradient-to-b from-red-500 to-red-600" : "bg-gray-200"}
                        `} />
                      )}
                    </div>
                    
                    {/* Step Info */}
                    <div className="flex-1 pt-2">
                      <div className="flex items-center justify-between">
                        <p className={`
                          font-semibold text-base
                          transition-colors duration-300
                          ${isActive || isCompleted ? "text-gray-900" : "text-gray-400"}
                        `}>
                          {step.label}
                        </p>
                        {isCompleted && (
                          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            Completed
                          </span>
                        )}
                        {isActive && (
                          <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full animate-pulse">
                            In Progress
                          </span>
                        )}
                      </div>
                      <p className={`
                        text-sm mt-1
                        transition-colors duration-300
                        ${isActive ? "text-red-600" : "text-gray-500"}
                      `}>
                        {isCompleted ? step.completedDescription : step.description}
                      </p>
                      
                      {/* Active Step Hint */}
                      {isActive && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                          <Clock size={12} />
                          <span>Complete this step to continue</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Stats */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-gray-600">
                Step {currentStep} of {steps.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-gray-400" />
              <span className="text-gray-500">Secure checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes check {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1) rotate(0);
            opacity: 1;
          }
        }
        
        .animate-check {
          animation: check 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default CheckoutProgress;