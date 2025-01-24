// TODO: 타입에는 Type postfix를 붙이자
export type DifficultyType = "N5" | "N4" | "N3" | "N2" | "N1";
export type CorrectRatioType = "High" | "Mid" | "Low";
export type MUIChipColorType =
  | "primary"
  | "secondary"
  | "default"
  | "error"
  | "info"
  | "success"
  | "warning";

export type WordInfo = {
  id: number;
  word: string;
  meanings: MeaningInfo[];
  correctRatio: number;
};

export type MeaningInfo = {
  meaning: string;
  difficulty: DifficultyType;
};
