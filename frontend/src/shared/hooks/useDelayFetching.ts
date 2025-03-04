import { useEffect, useState } from "react";

export function useDelayFetching(state: boolean) {
  const [delay, setDelay] = useState(false);

  useEffect(() => {
    if (state) {
      const timer = setTimeout(() => setDelay(true), 300);
      return () => {
        setDelay(false);
        clearTimeout(timer);
      };
    }
  }, [state]);

  // state는 미리 바뀌어도 delay가 바뀔 때까지 기다림
  return delay && state;
}
