import MUIBackdrop, { type BackdropProps } from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import type { FC } from "react";

export const Backdrop:FC<BackdropProps> = ({ open }) => {
  return (
    <MUIBackdrop
      sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
      open={open}
    >
      <CircularProgress sx={(theme)=>({color:theme.palette.common.white})}  />
    </MUIBackdrop>
  );
};
