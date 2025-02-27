import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import React from "react";

import { findVoiceIndex } from "@/entities/quiz/lib";
import {
  quizHintSpeakSettingState,
  quizHintVoiceListState,
} from "@/entities/quiz/store";
import { theme } from "@/shared/styles/theme";

import QuizWordHintSlider from "./QuizWordHintSlider";

const QuizWordHintSpeakSetting = () => {
  const [speakSetting, setSpeakSetting] = useAtom(quizHintSpeakSettingState);
  const [voiceList] = useAtom(quizHintVoiceListState);
  const t = useTranslations("game");

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const voice = e.target.selectedOptions[0].value;
    setSpeakSetting((prev) => ({
      ...prev,
      selectedVoice: voice,
    }));
  };

  return (
    <QuizWordHintSpeakSettingContainer>
      <QuizWordHintSpeakSettingItem>
        <div id="voice-select">{t("voice")}</div>
        <QuizWordHintSpeakSettingInput>
          <select
            aria-labelledby="voice-select"
            value={
              voiceList[findVoiceIndex(voiceList, speakSetting.selectedVoice)]
                .name
            }
            onChange={handleVoiceChange}
          >
            {voiceList.map((voice, index) => (
              <option key={index} value={voice.name}>
                {voice.name}
              </option>
            ))}
          </select>
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
    </QuizWordHintSpeakSettingContainer>
  );
};

export default QuizWordHintSpeakSetting;

const QuizWordHintSpeakSettingContainer = styled.div`
  position: absolute;
  min-width: 120px;
  border: 1px solid rgba(25, 118, 210, 0.5);
  border-radius: 4px;
  background-color: white;
  left: 0;
  transform: translateX(-100%);
  top: 50%;
  transform: translate(-105%, -50%);
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  gap: ${theme.spacing.small};
`;

const QuizWordHintSpeakSettingItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

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
`;
