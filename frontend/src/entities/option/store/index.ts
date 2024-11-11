import { atom } from "jotai";

import { QuizOption } from "../model";

export const quizOptionSourceState = atom<QuizOption["source"]>([]);
export const quizOptionRoundState = atom<QuizOption["round"]>(10);
