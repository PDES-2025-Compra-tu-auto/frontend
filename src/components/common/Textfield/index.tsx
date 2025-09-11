import Typography from "@mui/material/Typography";
import type { TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";
import { StyledTextField } from "./styles";
import type { FC } from "react";

type ExtraTexfieldProps = {  header?: string };
type TextFieldProps = MuiTextFieldProps & ExtraTexfieldProps;

export const TextField: FC<TextFieldProps> = ({
  header,
  ...textFieldProps
}) => {
  return (
    <>
      {header && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: "block" }}
        >
          {header}
        </Typography>
      )}
      <StyledTextField {...textFieldProps} />
   
    </>
  );
};
