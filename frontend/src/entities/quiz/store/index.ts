import { atom } from "jotai";

import { QuizQuestionResponseDTO, QuizStatus } from "../types";

export const quizCurrentRoundState = atom(0);
export const quizIsStartedState = atom<QuizStatus>(QuizStatus.OPTION);
export const quizCurrentKanjiState = atom<QuizQuestionResponseDTO | null>(null);
