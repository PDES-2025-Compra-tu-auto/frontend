import { styled } from "@mui/material/styles";
import { AppBar, Toolbar, Box, Typography, Divider, Button } from "@mui/material";

export const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "show",
})<{ show: boolean }>(({ show, theme }) => ({
  display: show ? "visible" : "none",
  backdropFilter: "blur(8px)",
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: "none",
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "space-between",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

export const LogoBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const RoleTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
  fontWeight: 300,
  paddingTop: theme.spacing(0.5),
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  borderLeft: `1px solid ${theme.palette.grey[500]}`,
  justifyContent: "center",
  marginTop: 3,
  marginBottom: 3,
}));

export const UserButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  marginLeft: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(1),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  gap: 8,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const UserButtonInnerBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const MenuPaper = {
  boxShadow: "0 10px 30px -10px rgba(0, 102, 255, 0.3)",
  border: "1px solid #e2e8f0",
  minWidth: 220,
  overflow: "hidden",
};

export const MenuPaperSmall = {
  boxShadow: "0 10px 30px -10px rgba(0, 102, 255, 0.3)",
  border: "1px solid #e2e8f0",
  minWidth: 200,
};

export {Divider}