import Chip, { ChipProps } from "@mui/material/Chip";

import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { theme } from "@/shared/styles/theme";

const ResponsiveChip = (props: ChipProps) => {
  const isMobile = useMediaQuery(theme.breakpoints.mobile);

  return <Chip size={isMobile ? "small" : "medium"} {...props} />;
};

export default ResponsiveChip;
