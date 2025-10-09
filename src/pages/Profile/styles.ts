import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button } from "@/components/common/Button"; // Ajusta si la ruta cambia

export const RootBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

export const MainContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

export const ProfileSummaryPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  border: "1px solid hsl(220, 10%, 90%)",
  background:
    "linear-gradient(135deg, hsl(220, 100%, 98%) 0%, hsl(0, 0%, 100%) 100%)",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
}));

export const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  border: "1px solid hsl(220, 10%, 90%)",
}));

export const DangerZonePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  border: "2px solid hsl(0, 84%, 90%)",
  backgroundColor: "hsl(0, 100%, 99%)",
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
}));

export const DangerTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
  color: theme.palette.error.main,
}));

export const DangerDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
}));

export const SubmitButton = styled(Button)(() => ({
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 32,
  paddingRight: 32,
  background:
    "linear-gradient(135deg, hsl(220, 100%, 45%) 0%, hsl(220, 100%, 35%) 100%)",
  "&:disabled": {
    opacity: 0.6,
  },
}));

export const DeleteButton = styled(Button)(({ theme }) => ({
  paddingTop: 12,
  paddingBottom: 12,
  paddingLeft: 32,
  paddingRight: 32,
  fontSize: "0.9rem",
  backgroundColor: "transparent",
  "&:hover": {
    borderColor: theme.palette.error.main,
    backgroundColor: theme.palette.error.main,
    color: "#fff",
  },
}));
