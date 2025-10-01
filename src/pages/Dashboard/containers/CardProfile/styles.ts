import { styled } from "@mui/material/styles";
import { Card, Box, Typography } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: 0,
  padding: theme.spacing(2),
  paddingBottom: 0,
  display: "flex",
  flexDirection: "column",
  height: "100%",
  borderRadius: theme.spacing(1),
  backgroundColor: "#ffffff",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)",
    transform: "translateY(-4px)",
  },
}));

export const ContentWrapper = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const IconBox = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: theme.spacing(0.5),
  backgroundColor: "rgb(230, 242, 255)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: "#1f1f1f",
  marginBottom: theme.spacing(1),
}));

export const Description = styled(Typography)(( ) => ({
  color: "#6b7280",
  lineHeight: 1.6,
}));

export const ArrowWrapper = styled(Box)(({ theme }) => ({
  alignSelf: "center",
  marginLeft: theme.spacing(2),
  display: "flex",
  alignItems: "center",
}));
