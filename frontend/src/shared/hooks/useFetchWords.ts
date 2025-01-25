import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { wordsSearchFilterState } from "@/entities/words/store";
import { WordsService } from "@/features/words/api";

import { WordInfo } from "../types";

export function useFecthWords() {
  const [{ searchInput, difficulty, correctRatio }] = useAtom(
    wordsSearchFilterState
  );
  const queryClient = useQueryClient();
  const queryKey = ["words", searchInput, difficulty, correctRatio];
  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: fetchWordsFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      if (lastPage.words.length < 50) {
        return undefined;
      }

      return lastPageParam + 50;
    },
  });

  async function fetchWordsFn({ pageParam }: { pageParam: number }) {
    return await WordsService.searchWords(
      searchInput,
      difficulty,
      correctRatio,
      pageParam
    );
  }

  function removeQueryKey() {
    queryClient.removeQueries({ queryKey });
  }

  return {
    isLoading,
    words: data?.pages.map((page) => page.words).flat() as WordInfo[],
    fetchNextPage,
    reset: removeQueryKey,
  };
}
