import { useState } from "react";

export function useFakePayment() {
  const [loading, setLoading] = useState(false);

  const processPayment = async (amount) => {
    setLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);

        resolve({
          id: "TX-" + Date.now(),
          status: "successful",
          amount,
          currency: "DKK",
        });
      }, 2000);
    });
  };

  return { processPayment, loading };
}