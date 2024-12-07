import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";

import { theme } from "@/shared/styles/theme";

interface LoadingProps {
  size?: string;
}

const Loading = ({ size }: LoadingProps) => {
  return (
    <LoadingContainer>
      <CircularProgress size={size} />
      <h2>Loading...</h2>
    </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.large};
`;
