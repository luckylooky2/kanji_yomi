import { useAtom } from "jotai";
import throttle from "lodash/throttle";
import { useCallback, useEffect, useRef } from "react";

import { wordsSearchFilterState } from "@/entities/words/store";

export function useScroll(callback: () => void = () => {}) {
  const throttledCallback = useCallback(throttle(callback, 300), []);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [searchFilter] = useAtom(wordsSearchFilterState);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const scrollPosition = scrollTop + clientHeight;
        const threshold = scrollHeight * 0.9;

        if (scrollPosition >= threshold) {
          throttledCallback();
        }
      }
    };

    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  }, [searchFilter]);

  return { scrollRef };
}
