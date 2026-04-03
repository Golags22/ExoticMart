import { useForm } from "react-hook-form";
import { useState } from "react";
import { 
  CreditCard, 
  Calendar, 
  Lock, 
  ArrowLeft, 
  ArrowRight,
  Shield,
  CreditCard as CardIcon
} from "lucide-react";

const PaymentStep = ({ shippingData, defaultValues, onSubmit, onBack }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: defaultValues || {},
    mode: "onChange"
  });
  
  const [cardType, setCardType] = useState("");
  const cardNumber = watch("cardNumber");

  // Detect card type based on first digits
  const detectCardType = (number) => {
    const cleaned = number?.replace(/\D/g, "");
    if (!cleaned) return "";
    
    if (cleaned.startsWith("4")) return "Visa";
    if (cleaned.startsWith("5")) return "Mastercard";
    if (cleaned.startsWith("3")) return "Amex";
    if (cleaned.startsWith("6")) return "Discover";
    return "";
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const cleaned = value?.replace(/\D/g, "");
    const groups = cleaned?.match(/.{1,4}/g);
    return groups ? groups.join(" ") : cleaned;
  };

  // Format expiry date
  const formatExpiry = (value) => {
    const cleaned = value?.replace(/\D/g, "");
    if (cleaned?.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Details</h2>
          <p className="text-gray-500">Enter your card information to complete the order</p>
        </div>

        {/* Card Number Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <CreditCard size={20} />
            </div>
            <input
              {...register("cardNumber", {
                required: "Card number is required",
                minLength: { value: 16, message: "Must be 16 digits" },
                maxLength: { value: 19, message: "Invalid card number" },
                pattern: {
                  value: /^[0-9\s]+$/,
                  message: "Only numbers allowed"
                },
                onChange: (e) => {
                  const formatted = formatCardNumber(e.target.value);
                  e.target.value = formatted;
                  setCardType(detectCardType(e.target.value));
                }
              })}
              placeholder="1234 5678 9012 3456"
              className={`
                w-full pl-10 pr-12 py-3 
                border rounded-lg 
                focus:ring-2 focus:ring-red-500 focus:border-red-500
                transition-all duration-200
                ${errors.cardNumber ? "border-red-500" : "border-gray-300"}
              `}
              maxLength={19}
            />
            {cardType && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                  {cardType}
                </span>
              </div>
            )}
          </div>
          {errors.cardNumber && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <span className="text-xs">⚠️</span> {errors.cardNumber.message}
            </p>
          )}
        </div>

        {/* Expiry & CVV Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Expiry Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Calendar size={20} />
              </div>
              <input
                {...register("expiry", {
                  required: "Expiry date is required",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                    message: "Invalid format (MM/YY)"
                  },
                  onChange: (e) => {
                    const formatted = formatExpiry(e.target.value);
                    e.target.value = formatted;
                  }
                })}
                placeholder="MM/YY"
                className={`
                  w-full pl-10 py-3 
                  border rounded-lg 
                  focus:ring-2 focus:ring-red-500 focus:border-red-500
                  transition-all duration-200
                  ${errors.expiry ? "border-red-500" : "border-gray-300"}
                `}
                maxLength={5}
              />
            </div>
            {errors.expiry && (
              <p className="text-red-500 text-sm">{errors.expiry.message}</p>
            )}
          </div>

          {/* CVV */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              CVV
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={20} />
              </div>
              <input
                {...register("cvv", {
                  required: "CVV is required",
                  minLength: { value: 3, message: "Must be 3 digits" },
                  maxLength: { value: 4, message: "Must be 3-4 digits" },
                  pattern: {
                    value: /^[0-9]{3,4}$/,
                    message: "Only numbers allowed"
                  }
                })}
                placeholder="123"
                type="password"
                className={`
                  w-full pl-10 py-3 
                  border rounded-lg 
                  focus:ring-2 focus:ring-red-500 focus:border-red-500
                  transition-all duration-200
                  ${errors.cvv ? "border-red-500" : "border-gray-300"}
                `}
                maxLength={4}
              />
            </div>
            {errors.cvv && (
              <p className="text-red-500 text-sm">{errors.cvv.message}</p>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-3">
          <Shield className="text-green-600 flex-shrink-0" size={20} />
          <div className="text-xs text-gray-600">
            <p className="font-medium mb-1">Secure Payment</p>
            <p>Your payment information is encrypted and secure. We accept all major credit cards.</p>
          </div>
        </div>

        {/* Order Summary (optional) */}
        {shippingData && (
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Shipping to: {shippingData.address}, {shippingData.city}</p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="
              flex items-center justify-center gap-2
              px-6 py-3
              border border-gray-300
              rounded-lg
              text-gray-700 font-medium
              hover:bg-gray-50 hover:border-gray-400
              transition-all duration-200
              sm:w-auto w-full
            "
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <button
            type="submit"
            className="
              flex items-center justify-center gap-2
              px-6 py-3
              bg-gradient-to-r from-red-500 to-red-600
              text-white font-medium
              rounded-lg
              hover:from-red-600 hover:to-red-700
              transform hover:scale-105
              transition-all duration-200
              shadow-lg shadow-red-200
              sm:w-auto w-full
            "
          >
            <CardIcon size={20} />
            Proceed to Payment
            <ArrowRight size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentStep;