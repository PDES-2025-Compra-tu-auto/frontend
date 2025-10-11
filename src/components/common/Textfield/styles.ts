import { styled, TextField } from "@mui/material";

export const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: "0 4px 12px hsl(220, 100%, 45%, 0.1)",
    },
    "&.Mui-focused": {
      boxShadow: "0 4px 12px hsl(220, 100%, 45%, 0.2)",
    },
  },
}));
