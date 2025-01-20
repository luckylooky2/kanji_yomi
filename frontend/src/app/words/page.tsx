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
  wordsSearchFilterCorrectRatio,
  wordsSearchFilterDifficulty,
} from "@/entities/words/store";
import { WordsSearchInputType } from "@/entities/words/types";
import WordsGrid from "@/features/words/components/WordsGrid";
import WordsSearchFilter from "@/features/words/components/WordsSearchFilter";
import { theme } from "@/shared/styles/theme";
import { WordInfo } from "@/shared/types";
import ResponsiveIcon from "@/widgets/Responsive/ResponsiveIcon";

const words: WordInfo[] = [];

for (let i = 0; i < 100; i += 6) {
  words.push({
    id: i,
    word: "秋",
    meanings: [
      {
        meaning: "あき",
        difficulty: "N5",
      },
    ],
    correctRatio: 0,
  });
  words.push({
    id: i + 1,
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
  });
  words.push({
    id: i + 2,
    word: "朝御飯",
    meanings: [
      {
        meaning: "あさごはん",
        difficulty: "N5",
      },
    ],
    correctRatio: 90,
  });
  words.push({
    id: i + 3,
    word: "伯母さん",
    meanings: [
      {
        meaning: "おばさん",
        difficulty: "N5",
      },
    ],
    correctRatio: 30,
  });
  words.push({
    id: i + 4,
    word: "お巡りさん",
    meanings: [
      {
        meaning: "おまわりさん",
        difficulty: "N5",
      },
    ],
    correctRatio: 60,
  });
  words.push({
    id: i + 5,
    word: "待ち合わせる",
    meanings: [
      {
        meaning: "まちあわせる",
        difficulty: "N3",
      },
    ],
    correctRatio: 100,
  });
}

const WordsPage = () => {
  const [isSearchPageOpen, setIsSearchPageOpen] = useState(false);
  const { register, handleSubmit } = useForm<WordsSearchInputType>();
  const [selectedDifficulty] = useAtom(wordsSearchFilterDifficulty);
  const [selectedCorrectRatio] = useAtom(wordsSearchFilterCorrectRatio);

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
            placeholder="Type in Kanji or Hiragana"
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
      <WordsGrid words={words} />
    </WordsContainer>
  );
};

export default WordsPage;

const WordsContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-top: 30px;
`;

const WordsSearchContainer = styled.div`
  display: flex;
  position: sticky;
  margin-bottom: ${theme.spacing.xsmall};
  width: 100%;
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
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const WordsSearchFilterButton = styled(Button)`
  min-width: 0;
  border-radius: 0;
  border: 2px solid #1976d2;
  border-left: none;
  border-right: none;
`;
