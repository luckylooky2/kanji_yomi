"use client";
import styled from "@emotion/styled";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  wordsCurrentWordIndex,
  wordsSearchFilterCorrectRatio,
  wordsSearchFilterDifficulty,
  wordsSearchFilterSearchInput,
} from "@/entities/words/store";
import { WordsSearchInputType } from "@/entities/words/types";
import WordsCurrentWord from "@/features/words/components/WordsCurrentWord";
import WordsDisplay from "@/features/words/components/WordsDisplay";
import WordsSearchFilter from "@/features/words/components/WordsSearchFilter";
import WordsUtilityBar from "@/features/words/components/WordsUtilityBar";
import { theme } from "@/shared/styles/theme";
import ResponsiveIcon from "@/widgets/Responsive/ResponsiveIcon";

const WordsPage = () => {
  const [isSearchPageOpen, setIsSearchPageOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset: resetInput,
  } = useForm<WordsSearchInputType>();
  const [difficulty, setDifficulty] = useAtom(wordsSearchFilterDifficulty);
  const [correctRatio, setCorrectRatio] = useAtom(
    wordsSearchFilterCorrectRatio
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty);
  const [selectedCorrectRatio, setSelectedCorrectRatio] =
    useState(correctRatio);
  const [currentWordIndex, setCurrentWordIndex] = useAtom(
    wordsCurrentWordIndex
  );
  const [, setSearchInput] = useAtom(wordsSearchFilterSearchInput);
  const isWordSelected = currentWordIndex !== null;

  // TODO: API와 함께 구현 필요
  const onSubmit = async ({ target }: WordsSearchInputType) => {
    setDifficulty({ ...selectedDifficulty });
    setCorrectRatio({ ...selectedCorrectRatio });
    setSearchInput(target);
    setIsSearchPageOpen(false);
    setCurrentWordIndex(null);
  };

  const determineFilterIcon = () => {
    if (difficulty.All && correctRatio.All) {
      return FilterAltOutlinedIcon;
    }

    return FilterAltIcon;
  };

  const toggleSearchFilter = () => setIsSearchPageOpen(!isSearchPageOpen);

  return (
    <WordsContainer>
      <WordsSearchContainer>
        <WordsSearchForm onSubmit={handleSubmit(onSubmit)}>
          <WordsSearchInput
            {...register("target")}
            autoComplete="off"
            placeholder="Search words (e.g., 日, ひ)"
          />
        </WordsSearchForm>
        <WordsSearchFilterButton onClick={toggleSearchFilter}>
          <ResponsiveIcon icon={determineFilterIcon()} />
        </WordsSearchFilterButton>
        <WordsSearchButton variant="contained" onClick={handleSubmit(onSubmit)}>
          <ResponsiveIcon icon={SearchIcon} />
        </WordsSearchButton>
        {isSearchPageOpen && (
          <WordsSearchFilter
            toggleHandler={toggleSearchFilter}
            resetInput={resetInput}
            selectedDifficulty={selectedDifficulty}
            selectedCorrectRatio={selectedCorrectRatio}
            setSelectedDifficulty={setSelectedDifficulty}
            setSelectedCorrectRatio={setSelectedCorrectRatio}
          />
        )}
      </WordsSearchContainer>
      <WordsUtilityBar />
      <WordsDisplay />
      {isWordSelected && <WordsCurrentWord key={currentWordIndex} />}
    </WordsContainer>
  );
};

export default WordsPage;

const WordsContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-top: 30px;
  z-index: 0;
`;

const WordsSearchContainer = styled.div`
  display: flex;
  position: sticky;
  margin-bottom: ${theme.spacing.xsmall};
  width: 100%;
  z-index: 100;
`;

const WordsSearchForm = styled.form`
  width: 100%;
`;

const WordsSearchInput = styled.input`
  fontsize: ${theme.spacing.medium};
  width: 100%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
`;

const WordsSearchButton = styled(Button)`
  min-width: 40px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const WordsSearchFilterButton = styled(Button)`
  min-width: 40px;
  border-radius: 0;
  border: 2px solid #1976d2;
  border-left: none;
  border-right: none;
`;
