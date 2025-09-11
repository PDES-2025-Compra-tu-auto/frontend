import { Box, Card, Typography } from "@mui/material";
import type { FC, ReactNode } from "react";

interface LandingCardProps {
  title: string;
  legend: string;
  icon: ReactNode;
}

export const LandingCard: FC<LandingCardProps> = ({ title, legend, icon }) => {
  return (
    <Card
      sx={{
        textAlign: "center",
        p: 4,
        height: "100%",
        boxShadow: "0 4px 20px -4px rgba(0, 102, 255, 0.1)",
        "&:hover": {
          boxShadow: "0 8px 30px -8px rgba(0, 102, 255, 0.2)",
        },
        transition: "box-shadow 0.3s ease",
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          bgcolor: "rgb(230, 242, 255)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 3,
        }}
      >
        {icon}
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        {title}
      </Typography>
      <Typography>{legend}</Typography>
    </Card>
  );
};
