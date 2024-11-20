"use client";

import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Image from "next/image";
import Link from "next/link";

import { theme } from "@/shared/styles/theme";
import ResponsiveHeading from "@/widgets/responsiveHeading/ResponsiveHeading";

export default function HomePage() {
  return (
    <HomeContainer>
      <HomeMainBannerSection>
        <HomeMainBannerTitle>
          <ResponsiveHeading>
            <h1>Ready to Test Your</h1>
            <h1>Kanji Reading Skills?</h1>
          </ResponsiveHeading>
          <ResponsiveHeading>
            <h2>Your path to better japanese starts here.</h2>
          </ResponsiveHeading>
        </HomeMainBannerTitle>
        <HomeImageWrapper>
          <Image src="/main_banner.gif" fill alt="main_banner" />
        </HomeImageWrapper>
      </HomeMainBannerSection>
      <Button variant="contained">
        <HomeLinkWrapper href="/quiz">Play the Quiz</HomeLinkWrapper>
      </Button>
    </HomeContainer>
  );
}

const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const HomeMainBannerTitle = styled.div`
  width: 200%;

  h1 {
    font-size: 50px;
    font-family: var(--font-open-sans-bold), sans-serif;
  }

  // 메인 페이지 타이틀
  @media (max-width: 1000px) {
    width: 100%;
    h1 {
      font-size: 2em;
    }
  }
`;

const HomeMainBannerSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  gap: ${theme.spacing.medium};

  @media (max-width: 1000px) {
    justify-content: center;
  }
`;

const HomeImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  max-width: 480px;
  max-height: 270px;
`;

const HomeLinkWrapper = styled(Link)`
  width: 100%;
`;
