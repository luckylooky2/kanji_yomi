import { SvgIconComponent } from "@mui/icons-material";

import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { theme } from "@/shared/styles/theme";

interface Props {
  icon: SvgIconComponent;
}

const ResponsiveIcon = ({ icon }: Props) => {
  const isMobile = useMediaQuery(theme.breakpoints.mobile);
  const Icon = icon;

  return <Icon fontSize={isMobile ? "small" : "medium"} />;
};

export default ResponsiveIcon;
