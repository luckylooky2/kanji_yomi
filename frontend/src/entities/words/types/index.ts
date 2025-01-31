import { CorrectRatioType, DifficultyType } from "@/shared/types";

export const SearchInputKey = "search";
export type WordsSearchInputType = {
  search: string;
};

export type WordsSearchFilterDifficultyType = DifficultyType | "All";
export type WordsSearchFilterCorrectRatioType = CorrectRatioType | "All";
export type WordsViewType = "list" | "grid";
