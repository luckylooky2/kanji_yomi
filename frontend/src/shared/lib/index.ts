import { settingLanguageType } from "@/entities/setting/types";

import { permittedLocales } from "../model";
import { DifficultyType, MUIChipColorType } from "../types";

export const getMUIColorByCorrectRatio = (ratio: number): MUIChipColorType => {
  if (ratio >= 80) {
    return "success";
  } else if (ratio >= 50) {
    return "warning";
  } else {
    return "error";
  }
};

export const verifyCookie = (
  localeCookie: string | undefined
): settingLanguageType => {
  // fallback 고려
  return localeCookie === undefined ||
    !permittedLocales.includes(localeCookie as settingLanguageType)
    ? "en"
    : (localeCookie as settingLanguageType);
};

export const getDifficultyColor = (difficulty: DifficultyType) => {
  switch (difficulty) {
    case "N5":
      return "secondary";
    case "N4":
      return "primary";
    case "N3":
      return "success";
    case "N2":
      return "warning";
    case "N1":
      return "error";
    default:
      return "primary";
  }
};
