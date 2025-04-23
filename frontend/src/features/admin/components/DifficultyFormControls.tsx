import { FormControlLabel, Radio } from "@mui/material";

import ChipByDifficulty from "./ChipByDifficulty";

const DifficultyFormControls = () => {
  return (
    <>
      <FormControlLabel
        value="N5"
        control={<Radio />}
        label={<ChipByDifficulty difficulty="N5" />}
      />
      <FormControlLabel
        value="N4"
        control={<Radio />}
        label={<ChipByDifficulty difficulty="N4" />}
      />
      <FormControlLabel
        value="N3"
        control={<Radio />}
        label={<ChipByDifficulty difficulty="N3" />}
      />
      <FormControlLabel
        value="N2"
        control={<Radio />}
        label={<ChipByDifficulty difficulty="N2" />}
      />
      <FormControlLabel
        value="N1"
        control={<Radio />}
        label={<ChipByDifficulty difficulty="N1" />}
      />
    </>
  );
};

export default DifficultyFormControls;
