import React from "react";
import type { SxProps, Theme } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  StyledCard,
  IconBox,
  Title,
  Description,
  ArrowWrapper,
  ContentWrapper,
} from "./styles";

interface ProfileCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
  cardSx?: SxProps<Theme>;
  iconBoxSx?: SxProps<Theme>;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  title,
  description,
  icon,
  onClick,
  cardSx = {},
  iconBoxSx = {},
}) => {
  return (
    <StyledCard onClick={onClick} sx={cardSx}>
      <ContentWrapper>
        <div>
          <IconBox sx={iconBoxSx}>{icon}</IconBox>
          <Title variant="h6">{title}</Title>
          <Description variant="body2">{description}</Description>
        </div>
        <ArrowWrapper>
          <ChevronRightIcon fontSize="small" sx={{ color: "#9ca3af" }} />
        </ArrowWrapper>
      </ContentWrapper>
    </StyledCard>
  );
};

export default ProfileCard;
