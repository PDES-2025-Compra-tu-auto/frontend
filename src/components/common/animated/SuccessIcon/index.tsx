import {
  CheckmarkCheck,
  CheckmarkCircle,
  StyledCheckmark,
  SuccessAnimation,
} from "./styles";

export const SuccessIcon = ({ size = 100 }) => {
  return (
    <SuccessAnimation>
      <StyledCheckmark viewBox="0 0 52 52" size={size}>
        <CheckmarkCircle cx="26" cy="26" r="25" fill="none" />
        <CheckmarkCheck fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </StyledCheckmark>
    </SuccessAnimation>
  );
};
