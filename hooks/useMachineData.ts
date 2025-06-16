// hooks/useMachineData.ts
import { useState, useEffect, useRef } from "react";

interface MachineData {
  [key: string]: any;
}

interface ErrorType {
  message: string;
}

export function useMachineData({ url }: { url: string }) {
  const [data, setData] = useState<MachineData | null>(null);
  const [error, setError] = useState<ErrorType | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = async () => {
    if (!url) return;

    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result, "rsult");

      if (result.success) {
        const normalizedData = Array.isArray(result.data)
          ? result.data[0] ?? {}
          : result.data;

        setData(normalizedData);
        setIsConnected(true);
        setError(null);
      } else {
        setError({ message: result.message });
        setIsConnected(false);
      }
    } catch (err: any) {
      console.error("Fetch failed:", err);
      setError({ message: "Fetch error" });
      setIsConnected(false);
    }
  };

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    fetchData(); // fetch once immediately

    intervalRef.current = setInterval(() => {
      fetchData();
    }, 5000); // every 5 seconds

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [url]); // re-run on URL change

  return {
    data,
    error,
    isConnected,
  };
}
