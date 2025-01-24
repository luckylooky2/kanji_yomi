import Chip, { ChipProps } from "@mui/material/Chip";

import { useResponsiveSize } from "@/shared/hooks/useResponsiveSize";

const ResponsiveChip = (props: ChipProps) => {
  const size = useResponsiveSize();

  return <Chip size={size} {...props} />;
};

export default ResponsiveChip;
