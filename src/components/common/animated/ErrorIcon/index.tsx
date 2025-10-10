import React from "react";
import { IconWrapper, XMark, XLine } from "./styles";

interface ErrorIconProps {
  size?: number;
}

const ErrorIcon: React.FC<ErrorIconProps> = ({ size = 80 }) => {
  return (
    <IconWrapper size={size}>
      <XMark>
        <XLine left />
        <XLine />
      </XMark>
    </IconWrapper>
  );
};

export default ErrorIcon;
