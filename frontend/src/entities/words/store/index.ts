import { atom } from "jotai";

import {
  WordsSearchFilterCorrectRate,
  WordsSearchFilterDifficulty,
} from "../types";

export const wordsSearchFilterDifficultyDefaultValues = {
  All: true,
  N5: false,
  N4: false,
  N3: false,
  N2: false,
  N1: false,
};

export const wordsSearchFilterCorrectRateDefaultValues = {
  All: true,
  High: false,
  Mid: false,
  Low: false,
};

export const wordsSearchFilterDifficulty = atom<
  Record<WordsSearchFilterDifficulty, boolean>
>(wordsSearchFilterDifficultyDefaultValues);

export const wordsSearchFilterCorrectRate = atom<
  Record<WordsSearchFilterCorrectRate, boolean>
>(wordsSearchFilterCorrectRateDefaultValues);
