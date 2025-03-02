import styled from "@emotion/styled";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import ReplayIcon from "@mui/icons-material/Replay";
import { IconButton } from "@mui/material";

import { theme } from "@/shared/styles/theme";
import ResponsiveIcon from "@/widgets/Responsive/ResponsiveIcon";

interface Props {
  retryHandler: () => void;
  message: string;
}

const ErrorComponent = ({ retryHandler, message }: Props) => {
  return (
    <ErrorComponentContainer>
      <ErrorComponentLayout>
        <FmdBadIcon />
        {message}
      </ErrorComponentLayout>
      <IconButton aria-label="retry" onClick={retryHandler}>
        <ResponsiveIcon icon={ReplayIcon} />
      </IconButton>
    </ErrorComponentContainer>
  );
};

const ErrorComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 130px;
  gap: ${theme.spacing.small};
  font-size: 25px;

  @media (min-width: 480px) {
    height: 250px;
  }

  div {
    display: flex;
    gap: ${theme.spacing.small};
  }
`;

const ErrorComponentLayout = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 30px;
    height: 30px;
    color: red;
    filter: brightness(90%);
  }
`;

export default ErrorComponent;
