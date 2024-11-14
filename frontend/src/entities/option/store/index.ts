import { atom } from "jotai";

import { QuizOption } from "../model";

export const quizOptionDifficultyState = atom<QuizOption["difficulty"]>([]);
export const quizOptionRoundState = atom<QuizOption["round"]>(10);
