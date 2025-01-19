import { CorrectRate, Difficulty } from "@/shared/types";

export type WordsSearchInputType = {
  target: string;
};

export type WordsSearchFilterDifficulty = Difficulty | "All";

export type WordsSearchFilterCorrectRate = CorrectRate | "All";
