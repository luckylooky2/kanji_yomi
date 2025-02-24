import styled from "@emotion/styled";
import { Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";

import { theme } from "../../../shared/styles/theme";

const [PC, MOBILE] = [0, 1];
const [WINDOWS, MACOS, LINUX] = [0, 1, 2];
const [IOS, ANDROID] = [0, 1];

const QuizInputUserGuide = () => {
  const [platform, setPlatform] = useState(0);
  const [pcOS, setPcOS] = useState(0);
  const [mobileOS, setMobileOS] = useState(0);

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
            <span>1. </span>Open Settings.
          </div>
          <div>
            <span>2. </span> [ Time & Language ] → [ Language & region ] → [
            Preferred languages ] → [ Add a language ]
          </div>
          <div>
            <span>3. </span> Search for Japanese, and install it.
          </div>
          <div>
            <span>4. </span>Press Windows + Space to switch to Japanese.
          </div>
        </InputUserGuideContent>
      )}
      {platform === PC && pcOS === MACOS && (
        <InputUserGuideContent>
          <div>
            <span>1. </span>Open System Settings.
          </div>
          <div>
            <span>2. </span>[ Keyboard ] → [ Text Input ] → [ Input Sources ] →
            [ Edit ] → [ + ]
          </div>
          <div>
            <span>3. </span>Search for Japanese, and add it.
          </div>
          <div>
            <span>4. </span>Press Control + Space to switch to Japanese.
          </div>
        </InputUserGuideContent>
      )}
      {platform === PC && pcOS === LINUX && (
        <InputUserGuideContent>
          <div>
            <span>1. </span>
            Open Settings.
          </div>
          <div>
            <span>2. </span>[ Region & Language ] → [ System ] → [ Manage
            Installed Languages ] → [ Install / Remove Languages ]
          </div>
          <div>
            <span>3. </span>Select Japanese, and click apply button.
          </div>
          <div>
            <span>4. </span>[ Keyboard ] → [ Add Input Source ] → [ Japanese ] →
            [ Add Japanese(Mozc) ]
          </div>
          <div>
            <span>5. </span>Press Super + Space to switch to Japanese.
          </div>
        </InputUserGuideContent>
      )}
      {platform === MOBILE && mobileOS === IOS && (
        <InputUserGuideContent>
          <div>
            <span>1. </span>Open Settings.
          </div>
          <div>
            <span>2. </span>[ General ] → [ Keyboard ] → [ Keyboard ] → [ Add
            New Keyboard ]
          </div>
          <div>
            <span>3. </span>Search for Japanese, and add it.
          </div>
          <div>
            <span>4. </span>Switch keyboards by tapping the globe icon while
            typing.
          </div>
        </InputUserGuideContent>
      )}
      {platform === MOBILE && mobileOS === ANDROID && (
        <InputUserGuideContent>
          <div>
            <span>1. </span>Open Settings.
          </div>
          <div>
            <div>
              <span>2. </span>[ General ] → [ Languages & input ] → [ Language ]
              → [ Add Language ]
            </div>
            <div>
              <span>3. </span>Search for Japanese, and add it.
            </div>
            <div>
              <span>4. </span>Switch keyboards by tapping the globe icon while
              typing.
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
