import {
  WordsSearchFilterCorrectRatioType,
  WordsSearchFilterDifficultyType,
} from "@/entities/words/types";
import { API_URL, responseInterceptor } from "@/shared/model";

export const WordsService = {
  searchWords: async (
    search: string,
    difficulty: Record<WordsSearchFilterDifficultyType, boolean>,
    correctRatio: Record<WordsSearchFilterCorrectRatioType, boolean>,
    pageParams: number
  ) => {
    const qs = new URLSearchParams();
    if (search.trim()) {
      qs.append("search", search.trim());
    }
    for (const key in difficulty) {
      if (difficulty[key as WordsSearchFilterDifficultyType]) {
        if (key === "All") {
          continue;
        }
        qs.append("difficulty", key);
      }
    }
    for (const key in correctRatio) {
      if (correctRatio[key as WordsSearchFilterCorrectRatioType]) {
        if (key === "All") {
          continue;
        }
        qs.append("correctRatio", key);
      }
    }
    qs.append("offset", pageParams + "");

    const queryString = qs.toString() ? `?${qs.toString()}` : "";

    return responseInterceptor(await fetch(`${API_URL}/words${queryString}`));
  },
};
