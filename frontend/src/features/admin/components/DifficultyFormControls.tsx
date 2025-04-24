import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ChangeEvent } from "react";

import ChipByDifficulty from "./ChipByDifficulty";

interface Props {
  value: string;
  onChange: ({
    target,
  }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  name: string;
  ariaLabel: string;
}

const DifficultyFormControls = ({
  value,
  onChange,
  name,
  ariaLabel,
}: Props) => {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby={ariaLabel}
        name={name}
        value={value}
        onChange={onChange}
      >
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
      </RadioGroup>
    </FormControl>
  );
};

export default DifficultyFormControls;
