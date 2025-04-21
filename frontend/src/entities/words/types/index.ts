import { CorrectRatioType, DifficultyType, MeaningInfo } from "@/shared/types";

export type WordsSearchFilterDifficultyType = DifficultyType | "All";
export type WordsSearchFilterCorrectRatioType = CorrectRatioType | "All";
export type WordsViewType = "list" | "grid";

export type WordsCreateNewWordRequestDTO = {
  word: string;
  meanings: MeaningInfo[];
};

export type WordsUpdateWordRequestDTO = {
  id: number;
  word: string;
  meanings: MeaningInfo[];
};
