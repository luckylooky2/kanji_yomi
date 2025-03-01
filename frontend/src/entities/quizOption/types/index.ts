export type QuizOption = {
  difficulty: QuizOptionDifficulty[];
  round: number;
};

export type QuizOptionDifficulty = "N1" | "N2" | "N3" | "N4" | "N5";
