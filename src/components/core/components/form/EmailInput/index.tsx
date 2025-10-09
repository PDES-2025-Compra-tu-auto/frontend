import InputAdornment from "@mui/material/InputAdornment";
import { Email } from "@mui/icons-material";
import { TextField, type TextFieldProps } from "@/components/common/Textfield";
import type { FC } from "react";

export const EmailInput:FC<TextFieldProps> = ({...props}) => {
  return (
    <TextField
      fullWidth
      label="Correo Electrónico"
      type="email"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Email sx={{ color: "text.secondary" }} />
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
};
