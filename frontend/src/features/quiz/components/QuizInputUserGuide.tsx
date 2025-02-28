import styled from "@emotion/styled";
import { Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import { SyntheticEvent, useState } from "react";

import { theme } from "../../../shared/styles/theme";

const [PC, MOBILE] = [0, 1];
const [WINDOWS, MACOS, LINUX] = [0, 1, 2];
const [IOS, ANDROID] = [0, 1];

const QuizInputUserGuide = () => {
  const [platform, setPlatform] = useState(0);
  const [pcOS, setPcOS] = useState(0);
  const [mobileOS, setMobileOS] = useState(0);
  const t = useTranslations("guide");

  const handleValue =
    (setter: (_newValue: number) => void) =>
    (event: SyntheticEvent, newValue: number) => {
      setter(newValue);
    };

  return (
    <div
      ref={(elem) => {
        if (elem) {
          elem.scrollTop = 0;
        }
      }}
    >
      <InputUserGuideTabGroup>
        <InputUserGuideTabs
          value={platform}
          onChange={handleValue(setPlatform)}
          textColor="inherit"
          variant="fullWidth"
          aria-label="platform selection"
        >
          <InputUserGuideTab label="PC" />
          <InputUserGuideTab label="Mobile" />
        </InputUserGuideTabs>
        {platform === PC && (
          <div>
            <InputUserGuideTabs
              value={pcOS}
              onChange={handleValue(setPcOS)}
              textColor="inherit"
              variant="fullWidth"
              aria-label="pc os selection"
            >
              <InputUserGuideTab label="Windows" />
              <InputUserGuideTab label="MacOS" />
              <InputUserGuideTab label="Ubuntu" />
            </InputUserGuideTabs>
          </div>
        )}
        {platform === MOBILE && (
          <div>
            <InputUserGuideTabs
              value={mobileOS}
              onChange={handleValue(setMobileOS)}
              textColor="inherit"
              variant="fullWidth"
              aria-label="mobile os selection"
            >
              <InputUserGuideTab label="iOS" />
              <InputUserGuideTab label="Android" />
            </InputUserGuideTabs>
          </div>
        )}
      </InputUserGuideTabGroup>
      {platform === PC && pcOS === WINDOWS && (
        <InputUserGuideContent>
          <div>
            <span>1. </span>
            {t("step2-Windows1")}
          </div>
          <div>
            <span>2. </span>
            {t("step2-Windows2")}
          </div>
          <div>
            <span>3. </span>
            {t("step2-Windows3")}
          </div>
          <div>
            <span>4. </span>
            {t("step2-Windows4")}
          </div>
        </InputUserGuideContent>
      )}
      {platform === PC && pcOS === MACOS && (
        <InputUserGuideContent>
          <div>
            <span>1. </span>
            {t("step2-MacOS1")}
          </div>
          <div>
            <span>2. </span>
            {t("step2-MacOS2")}
          </div>
          <div>
            <span>3. </span>
            {t("step2-MacOS3")}
          </div>
          <div>
            <span>4. </span>
            {t("step2-MacOS4")}
          </div>
          <div>
            <span>5. </span>
            {t("step2-MacOS5")}
          </div>
        </InputUserGuideContent>
      )}
      {platform === PC && pcOS === LINUX && (
        <InputUserGuideContent>
          <div>
            <span>1. </span>
            {t("step2-Linux1")}
          </div>
          <div>
            <span>2. </span>
            {t("step2-Linux2")}
          </div>
          <div>
            <span>3. </span>
            {t("step2-Linux3")}
          </div>
          <div>
            <span>4. </span>
            {t("step2-Linux4")}
          </div>
          <div>
            <span>5. </span>
            {t("step2-Linux5")}
          </div>
        </InputUserGuideContent>
      )}
      {platform === MOBILE && mobileOS === IOS && (
        <InputUserGuideContent>
          <div>
            <span>1. </span>
            {t("step2-iOS1")}
          </div>
          <div>
            <span>2. </span>
            {t("step2-iOS2")}
          </div>
          <div>
            <span>3. </span>
            {t("step2-iOS3")}
          </div>
          <div>
            <span>4. </span>
            {t("step2-iOS4")}
          </div>
        </InputUserGuideContent>
      )}
      {platform === MOBILE && mobileOS === ANDROID && (
        <InputUserGuideContent>
          <div>
            <span>1. </span>
            {t("step2-Android1")}
          </div>
          <div>
            <div>
              <span>2. </span>
              {t("step2-Android2")}
            </div>
            <div>
              <span>3. </span>
              {t("step2-Android3")}
            </div>
            <div>
              <span>4. </span>
              {t("step2-Android4")}
            </div>
          </div>
        </InputUserGuideContent>
      )}
    </div>
  );
};

export default QuizInputUserGuide;

const InputUserGuideTabGroup = styled.div`
  position: sticky;
  top: 0;
  left: 0;
`;

const InputUserGuideTabs = styled(Tabs)`
  background-color: white;
  min-height: 32px;

  .MuiButtonBase-root {
    min-height: 32px;
  }
`;

const InputUserGuideTab = styled(Tab)`
  padding: 0;
  text-transform: none;
`;

const InputUserGuideContent = styled.div`
  padding: ${theme.spacing.small};
  line-height: 1.7;
  font-size: 0.9rem;

  span {
    color: #1976d2;
  }
`;
