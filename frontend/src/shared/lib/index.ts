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
