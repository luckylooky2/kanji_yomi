"use client";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCellBasic from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  wordsCurrentWordIndex,
  wordsSearchFilterCorrectRatio,
  wordsSearchFilterDifficulty,
  wordsSearchFilterSearchInput,
} from "@/entities/words/store";
import ChipByDifficulty from "@/features/admin/components/ChipByDifficulty";
import WordsToolbar from "@/features/admin/components/WordsToolbar";
import WordMenuTrigger from "@/features/wordMenu/components/WordMenuTrigger";
import WordsSearchFilter from "@/features/words/components/WordsSearchFilter";
import { useFetchWords } from "@/shared/hooks/useFetchWords";
import { useScroll } from "@/shared/hooks/useScroll";
import { theme } from "@/shared/styles/theme";
import { DifficultyType, WordInfo } from "@/shared/types";
import Loading from "@/widgets/Loading/Loading";
import ResponsiveIcon from "@/widgets/Responsive/ResponsiveIcon";

import { AdminService } from "../api";

const NOT_AVAILABLE = "";

type TMeaning = { meaning: string; difficulty: DifficultyType };

interface AdminWordsMeaningProps {
  meaning: TMeaning | null;
}

const AdminWordsMeaning = ({ meaning }: AdminWordsMeaningProps) => {
  return (
    <TableCell align="center">
      {meaning ? (
        <AdminWordsMeaningContainer>
          <ChipByDifficulty difficulty={meaning.difficulty} />
          <TableWordContainer>
            <WordMenuTrigger>
              <strong>{`${meaning.meaning}`}</strong>
            </WordMenuTrigger>
          </TableWordContainer>
        </AdminWordsMeaningContainer>
      ) : (
        NOT_AVAILABLE
      )}
    </TableCell>
  );
};

const AdminWords = () => {
  const [isSearchPageOpen, setIsSearchPageOpen] = useState(false);
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
  const { handleSubmit, register, reset } = useForm<{ search: string }>();
  const { isLoading, isError, words, fetchNextPage } = useFetchWords();
  const { scrollRef } = useScroll(fetchNextPage);
  const router = useRouter();
  const isWordSelected = currentWordIndex !== null;
  const columnsList = ["Word", "Meaning1", "Meaning2", "Meaning3"];

  useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        await AdminService.me();
      } catch {
        router.push("/admin/login");
      }
      return true;
    },
    refetchInterval: 10 * 60 * 1000,
  });

  const onSubmit = ({ search }: { search: string }) => {
    setDifficulty({ ...selectedDifficulty });
    setCorrectRatio({ ...selectedCorrectRatio });
    setSearchInput(search);
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

  const resetInput = () => {
    reset();
    setSearchInput("");
  };

  const handleSelectWord = (index: number) => {
    if (currentWordIndex === index) setCurrentWordIndex(null);
    else setCurrentWordIndex(index);
  };

  const rows = words?.map((word: WordInfo) => ({
    id: word.id,
    word: word.word,
    meaning1: word.meanings[0] ?? null,
    meaning2: word.meanings[1] ?? null,
    meaning3: word.meanings[2] ?? null,
    correctRatio: word.correctRatio,
  }));

  if (isError) {
    return (
      <WordsErrorContainer>
        <h3>단어를 가져오지 못했습니다.</h3>
        <Button
          size="small"
          variant="contained"
          onClick={() => window.location.reload()}
        >
          다시 시도
        </Button>
      </WordsErrorContainer>
    );
  }

  return (
    <WordsContainer>
      <WordsToolbar disabled={!isWordSelected} />
      <WordsSearchContainer>
        <WordsSearchForm onSubmit={handleSubmit(onSubmit)}>
          <WordsSearchInput
            autoFocus
            placeholder="단어를 입력하세요."
            {...register("search")}
          />
        </WordsSearchForm>
        <WordsSearchFilterButton onClick={resetInput}>
          <ResponsiveIcon icon={CloseIcon} />
        </WordsSearchFilterButton>
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
      <WordsScrollContainer ref={scrollRef}>
        {isLoading ? (
          <Loading />
        ) : (
          <Table aria-label="simple table">
            <WordsTableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                {columnsList.map((title) => (
                  <TableCell key={title} align="center">
                    <TableCellContainer>{title}</TableCellContainer>
                  </TableCell>
                ))}
              </TableRow>
            </WordsTableHead>
            {rows.length === 0 && (
              <TableCellNoContent>검색된 단어가 없습니다.</TableCellNoContent>
            )}
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  selected={currentWordIndex === index}
                  key={row.id}
                  onClick={() => handleSelectWord(index)}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    <TableWordContainer>
                      <WordMenuTrigger>
                        <strong>{row.word}</strong>
                      </WordMenuTrigger>
                    </TableWordContainer>
                  </TableCell>
                  <AdminWordsMeaning meaning={row.meaning1} />
                  <AdminWordsMeaning meaning={row.meaning2} />
                  <AdminWordsMeaning meaning={row.meaning3} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </WordsScrollContainer>
    </WordsContainer>
  );
};

export default AdminWords;

const WordsContainer = styled.div`
  width: 90%;
  overflow: hidden;
  padding-top: 64px;
  z-index: 0;
  margin: auto;
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
  font-size: ${theme.spacing.medium};
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

const WordsErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: ${theme.spacing.medium};

  button {
    width: 50%;
  }
`;

const WordsScrollContainer = styled(TableContainer)`
  height: 400px;
`;

const WordsTableHead = styled(TableHead)`
  position: sticky;

  top: 0;
  background-color: white;
`;

const AdminWordsMeaningContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.small};
`;

const TableCell = styled(TableCellBasic)`
  font-size: ${theme.spacing.medium};
`;

const TableCellContainer = styled.div`
  margin: 0 auto;
  width: 150px;
`;

const TableCellNoContent = styled.div`
  width: max-content;
`;

const TableWordContainer = styled.div`
  width: fit-content;
  margin: auto;

  > div {
    padding: 0 10px;
  }
`;
