"use client";
import styled from "@emotion/styled";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import TuneIcon from "@mui/icons-material/Tune";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuItem,
  MenuList,
  Popover,
} from "@mui/material";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

import {
  wordMenuAnchorPositionState,
  wordMenuSelectedWordState,
} from "@/entities/wordMenu/store";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { useTTS } from "@/shared/hooks/useTTS";
import { theme } from "@/shared/styles/theme";
import ResponsiveIcon from "@/widgets/Responsive/ResponsiveIcon";

const WordMenu = () => {
  const [anchorPosition, setAnchorPosition] = useAtom(
    wordMenuAnchorPositionState
  );
  const [selectedWord] = useAtom(wordMenuSelectedWordState);
  const [copied, setCopied] = useState(false);
  const timeId = useRef<NodeJS.Timeout | null>(null);
  const { playTTS } = useTTS();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.mobile);
  const t = useTranslations("wordMenu");
  const clearTime = 1000;

  const handleSpeakWord = () => {
    playTTS(selectedWord ?? "");
  };

  const handleCopyWord = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      if (timeId.current) {
        clearTimeout(timeId.current);
      }

      timeId.current = setTimeout(() => {
        setCopied(false);
        timeId.current = null;
      }, clearTime);
    } catch {
      toast.error(t("copyError"));
    }
  };

  const handleRedirectDictionary = () =>
    window.open(`https://jisho.org/search/${selectedWord}`, "_blank");

  const handleRedirectSetting = () => router.push("/setting");

  return (
    <Popover
      open={Boolean(anchorPosition)}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition ?? { top: 0, left: 0 }}
      disablePortal
      onClose={() => setAnchorPosition(null)}
    >
      <MenuList>
        <ListSubheader>
          <h2>{selectedWord}</h2>
        </ListSubheader>
        <MenuDivider />
        <MenuItemMobileContainer $isMobile={isMobile}>
          <MenuItemContainer onClick={handleSpeakWord} $isMobile={isMobile}>
            <ListItemIcon>
              <ResponsiveIcon icon={VolumeUpIcon} />
            </ListItemIcon>
            {!isMobile && <ListItemText>{t("speak")}</ListItemText>}
          </MenuItemContainer>
          <MenuItemContainer
            onClick={() => handleCopyWord(selectedWord ?? "")}
            $isMobile={isMobile}
          >
            <ListItemIcon>
              <ResponsiveIcon icon={copied ? CheckIcon : ContentCopyIcon} />
            </ListItemIcon>
            {!isMobile && (
              <ListItemText>{t(copied ? "copied" : "copy")}</ListItemText>
            )}
          </MenuItemContainer>
          <MenuItemContainer
            onClick={handleRedirectDictionary}
            $isMobile={isMobile}
          >
            <ListItemIcon>
              <ResponsiveIcon icon={TravelExploreIcon} />
            </ListItemIcon>
            {!isMobile && (
              <>
                <ListItemText>{t("findInDictionary")}</ListItemText>
                <OpenInNew />
              </>
            )}
          </MenuItemContainer>
          <MenuItemContainer
            onClick={handleRedirectSetting}
            $isMobile={isMobile}
          >
            <ListItemIcon>
              <ResponsiveIcon icon={TuneIcon} />
            </ListItemIcon>
            {!isMobile && <ListItemText>{t("speakSetting")}</ListItemText>}
          </MenuItemContainer>
        </MenuItemMobileContainer>
      </MenuList>
    </Popover>
  );
};

export default WordMenu;

const MenuItemContainer = styled(MenuItem)<{ $isMobile: boolean }>`
  min-height: 36px;

  padding: ${({ $isMobile }) => ($isMobile ? "0 12px" : "")};

  > div {
    min-width: ${({ $isMobile }) => ($isMobile ? "20px !important;" : "")};
  }
`;

const MenuItemMobileContainer = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "row" : "column")};
`;

const OpenInNew = styled(OpenInNewIcon)`
  font-size: 16px;
  margin-left: var(--spacing-xsmall);
`;

const MenuDivider = styled(Divider)`
  margin: 0 10px 10px 10px;
`;
