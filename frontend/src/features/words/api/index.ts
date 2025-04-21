import {
  WordsCreateNewWordRequestDTO,
  WordsSearchFilterCorrectRatioType,
  WordsSearchFilterDifficultyType,
  WordsUpdateWordRequestDTO,
} from "@/entities/words/types";
import { API_URL, BASE_OPTIONS, responseInterceptor } from "@/shared/model";

function createQueryStringWithFilters(
  search: string,
  difficulty: Record<WordsSearchFilterDifficultyType, boolean>,
  correctRatio: Record<WordsSearchFilterCorrectRatioType, boolean>,
  pageParams: number | null = null
) {
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
  if (pageParams !== null) {
    qs.append("offset", pageParams.toString());
    qs.append("limit", "50");
  }

  return qs.toString() ? `?${qs.toString()}` : "";
}

export const WordsService = {
  searchWords: async (
    search: string,
    difficulty: Record<WordsSearchFilterDifficultyType, boolean>,
    correctRatio: Record<WordsSearchFilterCorrectRatioType, boolean>,
    pageParams: number
  ) => {
    const queryString = createQueryStringWithFilters(
      search,
      difficulty,
      correctRatio,
      pageParams
    );
    return responseInterceptor(`${API_URL}/words${queryString}`);
  },

  searchWordsCount: async (
    search: string,
    difficulty: Record<WordsSearchFilterDifficultyType, boolean>,
    correctRatio: Record<WordsSearchFilterCorrectRatioType, boolean>
  ) => {
    const queryString = createQueryStringWithFilters(
      search,
      difficulty,
      correctRatio
    );
    return responseInterceptor(`${API_URL}/words/count${queryString}`);
  },

  createNewWord: async (body: WordsCreateNewWordRequestDTO) => {
    return responseInterceptor(`${API_URL}/words`, {
      method: "POST",
      body: JSON.stringify(body),
      ...BASE_OPTIONS,
    });
  },

  updateWord: async (body: WordsUpdateWordRequestDTO) => {
    return responseInterceptor(`${API_URL}/words/${body.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      ...BASE_OPTIONS,
    });
  },

  deleteWord: async (id: number) => {
    return responseInterceptor(`${API_URL}/words/${id}`, {
      method: "DELETE",
      ...BASE_OPTIONS,
    });
  },
};
