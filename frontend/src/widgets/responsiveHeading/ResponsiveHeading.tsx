import styled from "@emotion/styled";

import { theme } from "@/shared/styles/theme";

const ResponsiveHeading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: ${theme.spacing.small};
  margin-bottom: ${theme.spacing.large};

  // 메인 페이지 타이틀
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export default ResponsiveHeading;
