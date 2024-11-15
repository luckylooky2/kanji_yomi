import { FormGroupProps } from "@mui/material/FormGroup";
import RadioGroup, { RadioGroupProps } from "@mui/material/RadioGroup";
import { styled } from "@mui/material/styles";

const withRowDirection = <T extends FormGroupProps | RadioGroupProps>(
  Component: React.ComponentType<T>
) =>
  styled(Component)({
    flexDirection: "row",
  });

export const RowRadioGroup = withRowDirection(RadioGroup);
