import { useForm } from "react-hook-form";
import { useState } from "react";
import { 
  User, 
  MapPin, 
  Building2, 
  Mail, 
  Phone, 
  ArrowRight,
  Home,
  CreditCard,
  CheckCircle,Truck
} from "lucide-react";

const ShippingStep = ({ defaultValues, onSubmit, onNext }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: defaultValues || { 
      sameAsShipping: true,
      saveInfo: false
    },
    mode: "onChange"
  });

  const sameAsShipping = watch("sameAsShipping");
  const [showBilling, setShowBilling] = useState(!sameAsShipping);

  // Auto-show billing section when checkbox is unchecked
  const handleSameAsShippingChange = (e) => {
    setShowBilling(!e.target.checked);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Shipping Address</h2>
          <p className="text-gray-500">Enter your shipping information for delivery</p>
        </div>

        {/* Shipping Information Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="border-b border-gray-200 bg-gradient-to-r from-red-50 to-white px-6 py-4">
            <div className="flex items-center gap-2">
              <Truck className="text-red-500" size={20} />
              <h3 className="font-semibold text-gray-900">Shipping Information</h3>
            </div>
          </div>
          
          <div className="p-6 space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={20} />
                </div>
                <input
                  {...register("fullName", { 
                    required: "Full name is required",
                    minLength: { value: 2, message: "Name must be at least 2 characters" }
                  })}
                  placeholder="John Doe"
                  className={`
                    w-full pl-10 pr-4 py-3 
                    border rounded-lg 
                    focus:ring-2 focus:ring-red-500 focus:border-red-500
                    transition-all duration-200
                    ${errors.fullName ? "border-red-500" : "border-gray-300"}
                  `}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span>⚠️</span> {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Street Address *
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Home size={20} />
                </div>
                <input
                  {...register("address", { required: "Street address is required" })}
                  placeholder="123 Main St, Apt 4B"
                  className={`
                    w-full pl-10 pr-4 py-3 
                    border rounded-lg 
                    focus:ring-2 focus:ring-red-500 focus:border-red-500
                    transition-all duration-200
                    ${errors.address ? "border-red-500" : "border-gray-300"}
                  `}
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            {/* City & Postal Code Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  City *
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Building2 size={20} />
                  </div>
                  <input
                    {...register("city", { required: "City is required" })}
                    placeholder="New York"
                    className={`
                      w-full pl-10 pr-4 py-3 
                      border rounded-lg 
                      focus:ring-2 focus:ring-red-500 focus:border-red-500
                      transition-all duration-200
                      ${errors.city ? "border-red-500" : "border-gray-300"}
                    `}
                  />
                </div>
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Postal Code *
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <MapPin size={20} />
                  </div>
                  <input
                    {...register("postalCode", { 
                      required: "Postal code is required",
                      pattern: {
                        value: /^[0-9]{5,6}$/,
                        message: "Invalid postal code format"
                      }
                    })}
                    placeholder="10001"
                    className={`
                      w-full pl-10 pr-4 py-3 
                      border rounded-lg 
                      focus:ring-2 focus:ring-red-500 focus:border-red-500
                      transition-all duration-200
                      ${errors.postalCode ? "border-red-500" : "border-gray-300"}
                    `}
                  />
                </div>
                {errors.postalCode && (
                  <p className="text-red-500 text-sm">{errors.postalCode.message}</p>
                )}
              </div>
            </div>

            {/* Optional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email (Optional)
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail size={20} />
                  </div>
                  <input
                    {...register("email", {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone (Optional)
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Phone size={20} />
                  </div>
                  <input
                    {...register("phone", {
                      pattern: {
                        value: /^[0-9+\-\s]{10,}$/,
                        message: "Invalid phone number"
                      }
                    })}
                    placeholder="(123) 456-7890"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Billing Options */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-6 space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("sameAsShipping")}
                onChange={handleSameAsShippingChange}
                className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <div className="flex-1">
                <span className="font-medium text-gray-900">Billing same as shipping</span>
                <p className="text-sm text-gray-500">Use this address for billing information</p>
              </div>
              {sameAsShipping && (
                <CheckCircle className="text-green-500" size={20} />
              )}
            </label>

            {/* Save Info Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("saveInfo")}
                className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <div className="flex-1">
                <span className="font-medium text-gray-900">Save this information</span>
                <p className="text-sm text-gray-500">Save for faster checkout next time</p>
              </div>
            </label>
          </div>
        </div>

        {/* Billing Information Section (conditional) */}
        {showBilling && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm animate-slideDown">
            <div className="border-b border-gray-200 bg-gradient-to-r from-red-50 to-white px-6 py-4">
              <div className="flex items-center gap-2">
                <CreditCard className="text-red-500" size={20} />
                <h3 className="font-semibold text-gray-900">Billing Information</h3>
              </div>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  {...register("billingFullName", { 
                    required: showBilling ? "Billing name is required" : false 
                  })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                {errors.billingFullName && (
                  <p className="text-red-500 text-sm">{errors.billingFullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Billing Address *
                </label>
                <input
                  {...register("billingAddress", { 
                    required: showBilling ? "Billing address is required" : false 
                  })}
                  placeholder="123 Main St"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                {errors.billingAddress && (
                  <p className="text-red-500 text-sm">{errors.billingAddress.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    City *
                  </label>
                  <input
                    {...register("billingCity", { 
                      required: showBilling ? "City is required" : false 
                    })}
                    placeholder="New York"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  {errors.billingCity && (
                    <p className="text-red-500 text-sm">{errors.billingCity.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Postal Code *
                  </label>
                  <input
                    {...register("billingPostalCode", { 
                      required: showBilling ? "Postal code is required" : false,
                      pattern: {
                        value: /^[0-9]{5,6}$/,
                        message: "Invalid postal code format"
                      }
                    })}
                    placeholder="10001"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  {errors.billingPostalCode && (
                    <p className="text-red-500 text-sm">{errors.billingPostalCode.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Button */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="
              flex items-center justify-center gap-2
              px-8 py-3
              bg-gradient-to-r from-red-500 to-red-600
              text-white font-medium
              rounded-lg
              hover:from-red-600 hover:to-red-700
              transform hover:scale-105
              transition-all duration-200
              shadow-lg shadow-red-200
              min-w-[140px]
            "
          >
            Continue to Payment
            <ArrowRight size={20} />
          </button>
        </div>
      </form>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ShippingStep;