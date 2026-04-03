import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShippingStep from "./ShippingStep";
import PaymentStep from "./PaymentStep";
import ReviewStep from "./ReviewStep";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import CheckoutProgress from "./CheckoutProgress";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState(null);
  const [billingData, setBillingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  // Redirects
  useEffect(() => {
    if (!user) navigate("/login", { state: { from: "/checkout" } });
    if (cart.length === 0) navigate("/cart");
  }, [user, cart, navigate]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  
  return (
    <div className="checkout-container">
      <div className="checkout-container max-w-2xl mx-auto p-4">
    <CheckoutProgress currentStep={step} />
</div>
        {step === 1 && (
        <ShippingStep
          defaultValues={shippingData}
          onSubmit={(data) => {
            setShippingData(data);
            // if billing same as shipping
            if (data.sameAsShipping) setBillingData(data);
            nextStep();
          }}
        />
      )}
      {step === 2 && (
        <PaymentStep
          shippingData={shippingData}
          defaultValues={paymentData}
          onBack={prevStep}
          onSubmit={(data) => {
            setPaymentData(data);
            nextStep();
          }}
        />
      )}
      {step === 3 && (
        <ReviewStep
          shippingData={shippingData}
          billingData={billingData || shippingData}
          paymentData={paymentData}
          cart={cart}
          onBack={prevStep}
        />
      )}
    </div>
  );
};

export default Checkout;