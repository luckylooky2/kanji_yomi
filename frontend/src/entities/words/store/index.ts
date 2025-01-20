import { atom } from "jotai";

import {
  WordsSearchFilterCorrectRatioType,
  WordsSearchFilterDifficultyType,
} from "../types";

export const wordsSearchFilterDifficultyDefaultValues = {
  All: true,
  N5: false,
  N4: false,
  N3: false,
  N2: false,
  N1: false,
};

export const WordsSearchFilterCorrectRatioDefaultValues = {
  All: true,
  High: false,
  Mid: false,
  Low: false,
};

export const wordsSearchFilterDifficulty = atom<
  Record<WordsSearchFilterDifficultyType, boolean>
>(wordsSearchFilterDifficultyDefaultValues);

export const WordsSearchFilterCorrectRatio = atom<
  Record<WordsSearchFilterCorrectRatioType, boolean>
>(WordsSearchFilterCorrectRatioDefaultValues);

export const wordsCurrentWordIndex = atom<number | null>(null);
