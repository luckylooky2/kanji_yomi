"use client";
import styled from "@emotion/styled";
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
  const { playTTS } = useTTS();
  const router = useRouter();

  const handleSpeakWord = () => {
    playTTS(selectedWord ?? "");
  };

  // copy 완료 UI 적용
  const handleCopyWord = () => {};

  const handleRedirectDictionary = () =>
    window.open(`https://jisho.org/search/${selectedWord}`, "_blank");

  const handleRedirectSetting = () => router.push("/setting");

  return (
    <Popover
      open={Boolean(anchorPosition)}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition ?? { top: 0, left: 0 }}
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
          <ListItemText>Speak</ListItemText>
        </MenuItemContainer>
        <MenuItemContainer onClick={handleCopyWord}>
          <ListItemIcon>
            <ResponsiveIcon icon={ContentCopyIcon} />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
        </MenuItemContainer>
        <MenuItemContainer onClick={handleRedirectDictionary}>
          <ListItemIcon>
            <ResponsiveIcon icon={TravelExploreIcon} />
          </ListItemIcon>
          <ListItemText>Find in Dictionary</ListItemText>
          <OpenInNew />
        </MenuItemContainer>
        <MenuItemContainer onClick={handleRedirectSetting}>
          <ListItemIcon>
            <ResponsiveIcon icon={TuneIcon} />
          </ListItemIcon>
          <ListItemText>Speak Setting</ListItemText>
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
