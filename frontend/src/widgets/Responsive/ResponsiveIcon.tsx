import { SvgIconComponent } from "@mui/icons-material";

import { useResponsiveSize } from "@/shared/hooks/useResponsiveSize";

interface Props {
  icon: SvgIconComponent;
}

const ResponsiveIcon = ({ icon }: Props) => {
  const size = useResponsiveSize();
  const Icon = icon;

  return <Icon fontSize={size} />;
};

export default ResponsiveIcon;
