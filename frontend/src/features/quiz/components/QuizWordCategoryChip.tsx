import Chip from "@mui/material/Chip";

import { QuizWordCategory } from "@/entities/quiz/types";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { theme } from "@/shared/styles/theme";

interface Props {
  category: QuizWordCategory;
}

const QuizWordCategoryChip = ({ category }: Props) => {
  const isMobile = useMediaQuery(theme.breakpoints.mobile);
  return (
    <Chip
      // variant="outlined"
      color={category.color}
      size={isMobile ? "small" : "medium"}
      label={category.value}
      aria-label={category.value}
    />
  );
};

export default QuizWordCategoryChip;
