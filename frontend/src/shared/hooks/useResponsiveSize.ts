import { theme } from "../styles/theme";

import { useMediaQuery } from "./useMediaQuery";

export function useResponsiveSize() {
  const isMobile = useMediaQuery(theme.breakpoints.mobile);

  return isMobile ? "small" : "medium";
}
