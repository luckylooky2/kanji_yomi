import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import {
  validateShowQuizUserGuideAtom,
  validateSpeakSettingAtom,
} from "../lib";
import {
  QuizHintSpeakSetting,
  QuizStatus,
  QuizTimer,
  QuizUserGuideStepType,
} from "../types";

// Quiz
export const quizStatusState = atom<QuizStatus>(QuizStatus.OPTION);
export const quizCurrentRoundState = atom(0);
export const quizCurrentRetries = atom(0);
export const quizAnswerInputState = atom("");
export const quizTimerState = atom<QuizTimer>({
  quizStartTime: null,
  quizEndTime: null,
});

// QuizHint
export const quizHintVoiceListState = atom<SpeechSynthesisVoice[]>([]);
export const quizHintSpeakSettingState = atomWithStorage<QuizHintSpeakSetting>(
  "speakSetting",
  validateSpeakSettingAtom()
);
export const quizHintMenuOpenState = atom(false);

// QuizUserGuide
export const quizUserGuideStepState = atom<QuizUserGuideStepType>(0);
export const quizUserGuideShowState = atomWithStorage(
  "showQuizUserGuide",
  validateShowQuizUserGuideAtom()
);
