import styled from "@emotion/styled";
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";
import TableRowsSharpIcon from "@mui/icons-material/TableRowsSharp";
import {
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { MouseEvent } from "react";

import { wordsSearchFilterState, wordsView } from "@/entities/words/store";
import { WordsViewType } from "@/entities/words/types";
import { useFetchWords } from "@/shared/hooks/useFetchWords";
import { theme } from "@/shared/styles/theme";

import { WordsService } from "../api";

const WordsUtilityBar = () => {
  const [view, setView] = useAtom(wordsView);
  const { isLoading } = useFetchWords();

  const handleChange = ({ currentTarget }: MouseEvent<HTMLElement>) => {
    const target = currentTarget as HTMLButtonElement;
    const value = target.value as WordsViewType;
    setView(value);
  };

  const TotalCount = () => {
    const [{ searchInput, difficulty, correctRatio }] = useAtom(
      wordsSearchFilterState
    );
    const { data, isLoading, isError } = useQuery(queryOption());
    const t = useTranslations();

    const convertNumberToThousandSeperated = (num: number) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    function queryOption() {
      return queryOptions({
        queryKey: ["wordsCount", searchInput, difficulty, correctRatio],
        queryFn: async function () {
          return await WordsService.searchWordsCount(
            searchInput,
            difficulty,
            correctRatio
          );
        },
        staleTime: Infinity,
        retry: 2,
      });
    }

    if (isLoading) {
      return (
        <TotalCountLoadingWrapper>
          <CircularProgress size={20} />
        </TotalCountLoadingWrapper>
      );
    }

    if (isError) {
      return <span>{t("count-error")}</span>;
    }

    return (
      <span>
        {convertNumberToThousandSeperated(data.totalCount)} {t("count-total")}
      </span>
    );
  };

  return (
    <WordsUtilityBarContainer>
      <TotalCount />
      {!isLoading && (
        <WordsViewButtonGroup value={view} exclusive onChange={handleChange}>
          <ToggleButton value="grid" aria-label="grid">
            <GridViewSharpIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list">
            <TableRowsSharpIcon fontSize="small" />
          </ToggleButton>
        </WordsViewButtonGroup>
      )}
    </WordsUtilityBarContainer>
  );
};

export default WordsUtilityBar;

const WordsUtilityBarContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${theme.spacing.small};

  .Mui-selected {
    background-color: #1976d2 !important;
    color: white !important;
  }
`;

const WordsViewButtonGroup = styled(ToggleButtonGroup)`
  height: 30px;
  z-index: 1;
`;

const TotalCountLoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
`;
