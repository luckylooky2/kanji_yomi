import { atom } from "jotai";
import { atomWithRefresh, atomWithStorage } from "jotai/utils";

import { quizOptionDifficultyState } from "@/entities/quizOption/store";
import { QuizService } from "@/features/quiz/api";

import {
  validateShowQuizUserGuideAtom,
  validateSpeakSettingAtom,
} from "../lib";
import {
  QuizAnswerResponseDTO,
  QuizHintSpeakSetting,
  QuizQuestionResponseDTO,
  QuizStatus,
  QuizTimer,
  QuizUserGuideStepType,
} from "../types";

// Quiz
export const quizStatusState = atom<QuizStatus>(QuizStatus.OPTION);
export const quizCurrentRoundState = atom(0);
export const quizCurrentRetries = atom(0);
export const quizCurrentKanjiState = atomWithRefresh(async (get) => {
  get(quizCurrentRoundState);
  const difficulty = get(quizOptionDifficultyState);
  try {
    const data: QuizQuestionResponseDTO = await QuizService.getQuestion({
      difficulty,
    });
    return { data };
  } catch {
    return { error: { message: "Network Error" } };
  }
});

export const quizTimerState = atom<QuizTimer>({
  quizStartTime: null,
  quizEndTime: null,
});

export const quizAnswerResultState = atom(
  { data: null },
  async (get, _set, ...args) => {
    const { data: kanji } = await get(quizCurrentKanjiState);
    try {
      const data: QuizAnswerResponseDTO = await QuizService.getAnswer({
        id: kanji!.id,
        word: kanji!.word,
        answer: args[0] as string,
      });
      return { data };
    } catch {
      return { error: { message: "Network Error" } };
    }
  }
);

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
