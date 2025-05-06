import { Chip } from "@mui/material";

import { getDifficultyColor } from "@/shared/lib";
import { DifficultyType } from "@/shared/types";

const ChipByDifficulty = ({ difficulty }: { difficulty: DifficultyType }) => {
  return (
    <Chip
      size="small"
      label={difficulty}
      color={getDifficultyColor(difficulty)}
    />
  );
};

export default ChipByDifficulty;
