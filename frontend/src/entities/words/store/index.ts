import { atom } from "jotai";

import {
  WordsSearchFilterCorrectRatioType,
  WordsSearchFilterDifficultyType,
  WordsViewType,
} from "../types";

export const wordsSearchFilterDifficultyDefaultValues = {
  All: true,
  N5: false,
  N4: false,
  N3: false,
  N2: false,
  N1: false,
};

export const wordsSearchFilterCorrectRatioDefaultValues = {
  All: true,
  High: false,
  Mid: false,
  Low: false,
};

export const wordsViewDefaultValues = "grid";

export const wordsSearchFilterDifficulty = atom<
  Record<WordsSearchFilterDifficultyType, boolean>
>(wordsSearchFilterDifficultyDefaultValues);

export const wordsSearchFilterCorrectRatio = atom<
  Record<WordsSearchFilterCorrectRatioType, boolean>
>(wordsSearchFilterCorrectRatioDefaultValues);

export const wordsSearchFilterSearchInput = atom<string>("");

export const wordsSearchFilterState = atom((get) => {
  const difficulty = get(wordsSearchFilterDifficulty);
  const correctRatio = get(wordsSearchFilterCorrectRatio);
  const searchInput = get(wordsSearchFilterSearchInput);

  return {
    difficulty,
    correctRatio,
    searchInput,
  };
});

export const wordsCurrentWordIndex = atom<number | null>(null);
export const wordsView = atom<WordsViewType>(wordsViewDefaultValues);
