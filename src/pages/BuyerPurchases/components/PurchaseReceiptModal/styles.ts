import { styled } from "@mui/material/styles";
import { DialogActions } from "@mui/material";

export const DialogActionsNoPrint = styled(DialogActions)(() => ({
  "@media print": {
    display: "none",
  },
}));
