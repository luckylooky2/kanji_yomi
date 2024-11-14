import { useState } from "react";

function useEventAPI(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (options?: RequestInit) => {
    setLoading(true);
    setError(null);

    let result = null;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    return result;
  };

  return { data, loading, error, fetchData };
}

export default useEventAPI;
