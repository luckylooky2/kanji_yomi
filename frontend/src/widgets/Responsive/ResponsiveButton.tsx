import Button, { ButtonProps } from "@mui/material/Button";

import { useResponsiveSize } from "@/shared/hooks/useResponsiveSize";

const ResponsiveButton = (props: ButtonProps) => {
  const size = useResponsiveSize();

  return <Button size={size} {...props} />;
};

export default ResponsiveButton;
