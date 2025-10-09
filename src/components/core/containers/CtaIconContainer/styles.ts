import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const StyledCtaIconContainer = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 20px hsl(220, 100%, 45%, 0.3)",
}));
