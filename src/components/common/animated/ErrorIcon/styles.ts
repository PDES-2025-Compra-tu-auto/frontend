import { styled, keyframes } from "@mui/material/styles";

interface IconWrapperProps {
  size: number;
}

const animateErrorIcon = keyframes`
  0% {
    transform: rotateX(100deg);
    opacity: 0;
  }
  100% {
    transform: rotateX(0);
    opacity: 1;
  }
`;

const animateErrorXMark = keyframes`
  0%, 50% {
    margin-top: 1.625em;
    transform: scale(0.4);
    opacity: 0;
  }
  80% {
    margin-top: -0.375em;
    transform: scale(1.15);
  }
  100% {
    margin-top: 0;
    transform: scale(1);
    opacity: 1;
  }
`;

export const IconWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "size",
})<IconWrapperProps>(({ size, theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: size,
  height: size,
  border: "0.25em solid transparent",
  borderRadius: "50%",
  boxSizing: "content-box",
  borderColor: theme.palette.error.main,

  animation: `${animateErrorIcon} 0.3s forwards`,
}));

export const XMark = styled("span")(() => ({
  position: "relative",
  display: "block",
  width: "100%",
  height: "100%",
  // animación de la marca X:
  animation: `${animateErrorXMark} 0.3s forwards`,
}));

export const XLine = styled("span", {
  shouldForwardProp: (prop) => prop !== "left",
})<{ left?: boolean }>(({ left, theme }) => ({
  position: "absolute",
  top: "2.3125em",
  width: "2.9375em",
  height: "0.3125em",
  backgroundColor: theme.palette.error.main,
  borderRadius: "0.125em",
  ...(left
    ? {
        left: "1.0625em",
        transform: "rotate(45deg)",
      }
    : {
        right: "1em",
        transform: "rotate(-45deg)",
      }),
}));
