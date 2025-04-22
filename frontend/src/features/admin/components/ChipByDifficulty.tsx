import { Chip } from "@mui/material";

import { DifficultyType } from "@/shared/types";

const ChipByDifficulty = ({ difficulty }: { difficulty: DifficultyType }) => {
  const determineColor = (difficulty: DifficultyType) => {
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
  return (
    <Chip size="small" label={difficulty} color={determineColor(difficulty)} />
  );
};

export default ChipByDifficulty;
