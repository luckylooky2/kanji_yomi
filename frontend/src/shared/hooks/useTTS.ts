import { useAtom } from "jotai";

import {
  defaultSpeakSetting,
  playTTS,
  SSULangJapanese,
} from "@/entities/quiz/lib";
import {
  quizHintSpeakSettingState,
  quizHintVoiceListState,
} from "@/entities/quiz/store";

export function useTTS() {
  const [speakSetting, setSpeakSetting] = useAtom(quizHintSpeakSettingState);
  const [voiceList, setVoiceList] = useAtom(quizHintVoiceListState);

  const loadVoices = (onComplete = () => {}) => {
    if (typeof window === "undefined") {
      return;
    }

    const allVoices = window.speechSynthesis.getVoices();
    const voices = allVoices.filter((voice) => voice.lang === SSULangJapanese);

    if (voices.length !== 0) {
      setVoiceList(voices);
      onComplete();
    } else {
      return setTimeout(function () {
        loadVoices(onComplete);
      }, 100);
    }
  };

  const resetSpeakSetting = () => {
    setSpeakSetting(defaultSpeakSetting);
    loadVoices();
  };

  const playTTSWrapper = (text: string) => {
    playTTS(speakSetting, voiceList, text, resetSpeakSetting);
  };

  return { playTTS: playTTSWrapper, loadVoices };
}
