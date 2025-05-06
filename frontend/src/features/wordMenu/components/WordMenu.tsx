"use client";
import styled from "@emotion/styled";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import TuneIcon from "@mui/icons-material/Tune";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import {
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
import { useTTS } from "@/shared/hooks/useTTS";
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
  const t = useTranslations("wordMenu");
  const clearTime = 2000;

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
        <MenuItemContainer onClick={handleSpeakWord}>
          <ListItemIcon>
            <ResponsiveIcon icon={VolumeUpIcon} />
          </ListItemIcon>
          <ListItemText>{t("speak")}</ListItemText>
        </MenuItemContainer>
        <MenuItemContainer onClick={() => handleCopyWord(selectedWord ?? "")}>
          <ListItemIcon>
            <ResponsiveIcon icon={copied ? CheckIcon : ContentCopyIcon} />
          </ListItemIcon>
          <ListItemText>{t(copied ? "copied" : "copy")}</ListItemText>
        </MenuItemContainer>
        <MenuItemContainer onClick={handleRedirectDictionary}>
          <ListItemIcon>
            <ResponsiveIcon icon={TravelExploreIcon} />
          </ListItemIcon>
          <ListItemText>{t("findInDictionary")}</ListItemText>
          <OpenInNew />
        </MenuItemContainer>
        <MenuItemContainer onClick={handleRedirectSetting}>
          <ListItemIcon>
            <ResponsiveIcon icon={TuneIcon} />
          </ListItemIcon>
          <ListItemText>{t("speakSetting")}</ListItemText>
        </MenuItemContainer>
      </MenuList>
    </Popover>
  );
};

export default WordMenu;

const MenuItemContainer = styled(MenuItem)`
  min-height: 36px;
`;

const OpenInNew = styled(OpenInNewIcon)`
  font-size: 16px;
  margin-left: var(--spacing-xsmall);
`;
