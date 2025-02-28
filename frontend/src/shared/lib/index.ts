import { settingLanguageType } from "@/entities/setting/types";

import { permittedLocales } from "../model";
import { MUIChipColorType } from "../types";

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
  return localeCookie === undefined ||
    !permittedLocales.includes(localeCookie as settingLanguageType)
    ? "en"
    : (localeCookie as settingLanguageType);
};
