import Button, { ButtonProps } from "@mui/material/Button";

import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { theme } from "@/shared/styles/theme";

const ResponsiveButton = (props: ButtonProps) => {
  const isMobile = useMediaQuery(theme.breakpoints.mobile);

  return <Button size={isMobile ? "small" : "medium"} {...props} />;
};

export default ResponsiveButton;
