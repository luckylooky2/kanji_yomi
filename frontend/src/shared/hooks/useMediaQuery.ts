import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // SSR 이슈 방지
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  // query가 업데이트 될 일은 거의 없다.
  useEffect(() => {
    // 주어진 미디어 쿼리 문자열의 분석 결과를 나타내는 MediaQueryList 객체를 반환한다.
    // MediaQueryList.matches로 현재 미디어 쿼리가 일치하는지 여부를 확인할 수 있다.
    const matchMedia = window.matchMedia(query);

    handleChange();

    // matchMedia change 이벤트 등록
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}
