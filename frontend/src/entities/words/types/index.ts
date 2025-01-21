import { CorrectRatioType, DifficultyType } from "@/shared/types";

export type WordsSearchInputType = {
  target: string;
};

export type WordsSearchFilterDifficultyType = DifficultyType | "All";
export type WordsSearchFilterCorrectRatioType = CorrectRatioType | "All";
export type WordsViewType = "list" | "grid";
