import { useEffect, useState } from "react";

export const usePremium = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPremiumStatus = async () => {
      // Replace with your real auth/premium check logic
      try {
        const res = await fetch("/api/user/status");
        const data = await res.json();
        setIsPremium(data.isPremium);
      } catch (err) {
        console.error("Failed to check premium status", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPremiumStatus();
  }, []);

  return { isPremium, loading };
};
