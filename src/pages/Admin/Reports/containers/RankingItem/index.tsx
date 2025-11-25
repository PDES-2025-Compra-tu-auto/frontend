import { Box, Typography } from "@mui/material";
import type { FC, ReactNode } from "react";

export interface RankingItemProps {
  pos: number;
  left: ReactNode;
  right: ReactNode;
  subtitle?: string;
}

export const RankingItem: FC<RankingItemProps> = ({
  pos,
  left,
  right,
  subtitle,
}) => {
  const isTopThree = pos <= 3;

  const getMedalColor = (position: number) => {
    switch (position) {
      case 1:
        return "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)"; // Oro
      case 2:
        return "linear-gradient(135deg, #C0C0C0 0%, #808080 100%)"; // Plata
      case 3:
        return "linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)"; // Bronce
      default:
        return "#e2e8f0";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2.5,
        bgcolor: isTopThree ? "rgba(0, 102, 255, 0.04)" : "white",
        borderRadius: 2,
        border: isTopThree ? "2px solid #0066ff" : "1px solid #e2e8f0",
        boxShadow: isTopThree
          ? "0 4px 12px rgba(0, 102, 255, 0.1)"
          : "0 2px 4px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 6px 20px rgba(0, 102, 255, 0.15)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: getMedalColor(pos),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 16,
            color: isTopThree ? "white" : "#64748b",
            flexShrink: 0,
          }}
        >
          {pos}
        </Box>

        <Box>
          <Typography
            variant="body1"
            sx={{ fontWeight: isTopThree ? "bold" : 500 }}
          >
            {left}
          </Typography>
          {subtitle && (
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontSize: 13 }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ textAlign: "right" }}>{right}</Box>
    </Box>
  );
};
