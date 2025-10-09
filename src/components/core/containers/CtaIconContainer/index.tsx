import type { FC, PropsWithChildren } from "react";
import { StyledCtaIconContainer } from "./styles";

type CtaIconContainerProps = PropsWithChildren;

export const CtaIconContainer: FC<CtaIconContainerProps> = ({ children,...props }) => {
  return <StyledCtaIconContainer {...props}>{children}</StyledCtaIconContainer>;
};
