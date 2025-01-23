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
} from "@/entities/words/store";
import { WordsSearchInputType } from "@/entities/words/types";
import WordsCurrentWord from "@/features/words/components/WordsCurrentWord";
import WordsDisplay from "@/features/words/components/WordsDisplay";
import WordsSearchFilter from "@/features/words/components/WordsSearchFilter";
import WordsUtilityBar from "@/features/words/components/WordsUtilityBar";
import { theme } from "@/shared/styles/theme";
import { WordInfo } from "@/shared/types";
import ResponsiveIcon from "@/widgets/Responsive/ResponsiveIcon";

const wordsDefaultValue: WordInfo[] = [
  {
    id: 0,
    word: "秋",
    meanings: [
      {
        meaning: "あき",
        difficulty: "N5",
      },
    ],
    correctRatio: 0,
  },
  {
    id: 1,
    word: "開く",
    meanings: [
      {
        meaning: "あく",
        difficulty: "N5",
      },
      {
        meaning: "ひらく",
        difficulty: "N4",
      },
    ],
    correctRatio: 50,
  },
  {
    id: 2,
    word: "朝御飯",
    meanings: [
      {
        meaning: "あさごはん",
        difficulty: "N5",
      },
    ],
    correctRatio: 90,
  },
  {
    id: 3,
    word: "伯母さん",
    meanings: [
      {
        meaning: "おばさん",
        difficulty: "N5",
      },
    ],
    correctRatio: 30,
  },
  {
    id: 4,
    word: "お巡りさん",
    meanings: [
      {
        meaning: "おまわりさん",
        difficulty: "N5",
      },
    ],
    correctRatio: 60,
  },
  {
    id: 5,
    word: "待ち合わせる",
    meanings: [
      {
        meaning: "まちあわせる",
        difficulty: "N3",
      },
    ],
    correctRatio: 100,
  },
  {
    id: 6,
    word: "待ち合わせる",
    meanings: [
      {
        meaning: "まちあわせる",
        difficulty: "N3",
      },
    ],
    correctRatio: 100,
  },
  {
    id: 7,
    word: "待ち合わせる",
    meanings: [
      {
        meaning: "まちあわせる",
        difficulty: "N3",
      },
    ],
    correctRatio: 100,
  },
  {
    id: 8,
    word: "待ち合わせる",
    meanings: [
      {
        meaning: "まちあわせる",
        difficulty: "N3",
      },
    ],
    correctRatio: 100,
  },
];

const WordsPage = () => {
  const [isSearchPageOpen, setIsSearchPageOpen] = useState(false);
  const { register, handleSubmit } = useForm<WordsSearchInputType>();
  const [selectedDifficulty] = useAtom(wordsSearchFilterDifficulty);
  const [selectedCorrectRatio] = useAtom(wordsSearchFilterCorrectRatio);
  const [currentWordIndex] = useAtom(wordsCurrentWordIndex);
  const [words] = useState<WordInfo[]>(wordsDefaultValue);
  const isWordSelected = currentWordIndex !== null;

  const onSubmit = async ({ target }: WordsSearchInputType) => {
    console.log(target);
    setIsSearchPageOpen(false);
  };

  const determineFilterIcon = () => {
    // if (isSearchPageOpen) {
    //   return ClearIcon;
    // }

    if (selectedDifficulty.All && selectedCorrectRatio.All) {
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
          <WordsSearchFilter toggleHandler={toggleSearchFilter} />
        )}
      </WordsSearchContainer>
      <WordsUtilityBar wordCount={words.length} />
      <WordsDisplay words={words} />
      {isWordSelected && (
        <WordsCurrentWord
          key={currentWordIndex}
          word={words[currentWordIndex]}
        />
      )}
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
