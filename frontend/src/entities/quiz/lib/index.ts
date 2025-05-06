import { toast } from "react-toastify";

import { QuizHintSpeakSetting } from "../types";

// quizHint

export const SSULangJapanese = "ja-JP";
export const defaultSpeakSetting = {
  selectedVoice: "",
  lang: "ja-JP",
  rate: 0.5,
  pitch: 1,
  volume: 1,
};

export const findVoiceIndex = (
  voiceList: SpeechSynthesisVoice[],
  voiceName: string
) => {
  if (!voiceList || voiceList.length === 0) {
    return -1;
  }

  let index = 0;
  voiceList.forEach((voice, i) => {
    if (voice.name === voiceName) {
      index = i;
    }
  });
  return index;
};

export function playTTS(
  speakSetting: QuizHintSpeakSetting,
  voiceList: SpeechSynthesisVoice[],
  text: string,
  reset: () => void,
  onEnd = () => {}
) {
  function alertError() {
    toast.error(
      "The TTS input settings are invalid. Resetting to the default settings."
    );
    reset();
  }

  if (!validateSpeakSetting(speakSetting)) {
    alertError();
    return;
  }

  setTimeout(() => {
    try {
      const utterance = new window.SpeechSynthesisUtterance();
      utterance.voice =
        voiceList[findVoiceIndex(voiceList, speakSetting.selectedVoice)];
      utterance.pitch = speakSetting.pitch;
      utterance.volume = speakSetting.volume;
      utterance.rate = speakSetting.rate;
      utterance.text = text;
      utterance.lang = speakSetting.lang;

      if (onEnd) {
        utterance.onend = onEnd;
      }

      // 음성이 겹치지 않도록 취소
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } catch {
      alertError();
    }
  }, 300);
}

export function validateSpeakSetting(speakSetting: QuizHintSpeakSetting) {
  // 테스트를 위해 외부에서 주입하는 형태가 좋은가? 아니면 내부에서 선언하는 형태가 좋은가?
  const defaultSpeakSetting = {
    selectedVoice: "",
    lang: "ja-JP",
    rate: 0.5,
    pitch: 1,
    volume: 1,
  };

  if (speakSetting === null || typeof speakSetting !== "object") {
    return false;
  }

  const allowedKeys = Object.keys(defaultSpeakSetting);
  const keysMatch =
    Object.keys(speakSetting).length === allowedKeys.length &&
    Object.keys(speakSetting).every((key) => allowedKeys.includes(key));

  if (!keysMatch) {
    return false;
  }

  const isSelectVoiceValid = typeof speakSetting.selectedVoice === "string";
  const isLangValid =
    typeof speakSetting.lang === "string" && speakSetting.lang === "ja-JP";
  const isRateValid =
    typeof speakSetting.rate === "number" &&
    speakSetting.rate >= 0.1 &&
    speakSetting.rate <= 10;
  const isPitchValid =
    typeof speakSetting.pitch === "number" &&
    speakSetting.pitch >= 0 &&
    speakSetting.pitch <= 2;
  const isVolumeValid =
    typeof speakSetting.volume === "number" &&
    speakSetting.volume >= 0 &&
    speakSetting.volume <= 1;

  return (
    isSelectVoiceValid &&
    isLangValid &&
    isRateValid &&
    isPitchValid &&
    isVolumeValid
  );
}

export function validateSpeakSettingAtom(): QuizHintSpeakSetting {
  const isServer = typeof window === "undefined";
  const stored = isServer ? "{}" : localStorage.getItem("speakSetting") || "{}";

  // {null} 과 같은 입력은 JSON.parse에서 에러가 발생한다.
  let parsed;

  try {
    parsed = JSON.parse(stored);
  } catch {
    parsed = null;
  }

  if (!parsed) {
    return defaultSpeakSetting;
  }

  if (!validateSpeakSetting(parsed)) {
    return defaultSpeakSetting;
  }

  return parsed;
}

export function validateShowQuizUserGuideAtom(): boolean {
  const isServer = typeof window === "undefined";

  if (isServer) {
    return true;
  } else {
    const item = localStorage.getItem("showQuizUserGuide");
    if (item) {
      // showQuizUserGuide가 있다면 => "false"인지 ? false : true
      return item !== "false";
    }

    // showQuizUserGuide가 없다면 => true
    return true;
  }
}
