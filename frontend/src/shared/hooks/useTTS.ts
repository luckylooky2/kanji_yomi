import { useAtom } from "jotai";
import { useEffect } from "react";
import { toast } from "react-toastify";

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
  const MAX_RETRIES = 5;
  const RETRY_DELAY = 100;

  const loadVoices = (onComplete = () => {}, retryCount = 0) => {
    if (typeof window === "undefined") {
      return;
    }

    const allVoices = window.speechSynthesis.getVoices();
    const voices = allVoices.filter((voice) => voice.lang === SSULangJapanese);

    if (voices.length !== 0) {
      setVoiceList(voices);
      onComplete();
      return;
    }

    if (retryCount >= MAX_RETRIES) {
      toast.error("Failed to load voices");
      return;
    }

    const timeoutId = setTimeout(function () {
      loadVoices(onComplete, retryCount + 1);
    }, RETRY_DELAY);

    return () => clearTimeout(timeoutId);
  };

  const resetSpeakSetting = () => {
    setSpeakSetting(defaultSpeakSetting);
    loadVoices();
  };

  const playTTSWrapper = (text: string) => {
    playTTS(speakSetting, voiceList, text, resetSpeakSetting);
  };

  useEffect(() => {
    const cleanup = loadVoices();
    return cleanup;
  }, []);

  return { playTTS: playTTSWrapper };
}
