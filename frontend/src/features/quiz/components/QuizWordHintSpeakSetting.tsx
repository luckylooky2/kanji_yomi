import styled from "@emotion/styled";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Button } from "@mui/material";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import React from "react";

import { findVoiceIndex } from "@/entities/quiz/lib";
import {
  quizHintSpeakSettingState,
  quizHintVoiceListState,
} from "@/entities/quiz/store";
import { useTTS } from "@/shared/hooks/useTTS";
import { theme } from "@/shared/styles/theme";
import ResponsiveIcon from "@/widgets/Responsive/ResponsiveIcon";

import QuizWordHintSlider from "./QuizWordHintSlider";

const QuizWordHintSpeakSetting = () => {
  const [speakSetting, setSpeakSetting] = useAtom(quizHintSpeakSettingState);
  const [voiceList] = useAtom(quizHintVoiceListState);
  const { playTTS } = useTTS();
  const t = useTranslations("speak");

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const voice = e.target.selectedOptions[0].value;
    setSpeakSetting((prev) => ({
      ...prev,
      selectedVoice: voice,
    }));
  };

  const voiceIndex = findVoiceIndex(voiceList, speakSetting.selectedVoice);
  const voiceName = voiceIndex < 0 ? "" : voiceList[voiceIndex].name;

  return (
    <QuizWordHintSpeakSettingContainer>
      <QuizWordHintSpeakSettingBox>
        <QuizWordHintSpeakSettingItem>
          <div id="voice-select">{t("voice")}</div>
          <QuizWordHintSpeakSettingInput>
            <select
              aria-labelledby="voice-select"
              value={voiceName}
              onChange={handleVoiceChange}
            >
              {voiceList.map((voice, index) => (
                <option key={index} value={voice.name}>
                  {voice.name}
                </option>
              ))}
            </select>
            <Button onClick={() => playTTS("こんにちは")}>
              <ResponsiveIcon icon={VolumeUpIcon} />
            </Button>
          </QuizWordHintSpeakSettingInput>
        </QuizWordHintSpeakSettingItem>
        <QuizWordHintSpeakSettingItem>
          <div>{t("rate")}</div>
          <QuizWordHintSpeakSettingInput>
            <QuizWordHintSlider
              min={0.1}
              max={2}
              step={0.1}
              value={speakSetting.rate}
              type="rate"
            />
          </QuizWordHintSpeakSettingInput>
        </QuizWordHintSpeakSettingItem>
        <QuizWordHintSpeakSettingItem>
          <div>{t("pitch")}</div>
          <QuizWordHintSpeakSettingInput>
            <QuizWordHintSlider
              min={0}
              max={2}
              step={0.1}
              value={speakSetting.pitch}
              type="pitch"
            />
          </QuizWordHintSpeakSettingInput>
        </QuizWordHintSpeakSettingItem>
        <QuizWordHintSpeakSettingItem>
          <div>{t("volume")}</div>
          <QuizWordHintSpeakSettingInput>
            <QuizWordHintSlider
              min={0}
              max={1}
              step={0.1}
              value={speakSetting.volume}
              type="volume"
            />
          </QuizWordHintSpeakSettingInput>
        </QuizWordHintSpeakSettingItem>
      </QuizWordHintSpeakSettingBox>
    </QuizWordHintSpeakSettingContainer>
  );
};

export default QuizWordHintSpeakSetting;

const QuizWordHintSpeakSettingContainer = styled.div`
  border: 1px solid rgba(25, 118, 210, 0.5);
  border-radius: 4px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing.small} ${theme.spacing.medium};
`;

const QuizWordHintSpeakSettingBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  gap: var(--spacing-medium);
  margin: var(--spacing-medium) 0;
`;

const QuizWordHintSpeakSettingItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xsmall);

  select {
    width: 100%;
  }
`;

const QuizWordHintSpeakSettingInput = styled.div`
  height: 25px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.small};
`;
