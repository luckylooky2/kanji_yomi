import { useEffect, useState } from "react";

export function useDelayFetching(isFetching: boolean) {
  const [delay, setDelay] = useState(false);
  const delayTime = 300;

  useEffect(() => {
    if (isFetching) {
      const timer = setTimeout(() => setDelay(true), delayTime);

      return () => {
        setDelay(false);
        clearTimeout(timer);
      };
    }
  }, [isFetching]);

  // isFetching는 미리 바뀌어도 delay가 바뀔 때까지 기다림
  return delay && isFetching;
}
