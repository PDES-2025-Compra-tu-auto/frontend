// Congrats.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import SuccessIcon from "@/components/common/";

interface CongratsProps {
  type?: "success" | "error" | "info" | "warning";
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  size?: number; // Para personalizar el tamaño del checkmark opcionalmente
}

export const Congrats: React.FC<CongratsProps> = ({
  type = "success",
  title,
  subtitle,
  children,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
    >
      {type === "success" && <SuccessIcon />}

      <Typography variant="h4" mt={4} gutterBottom>
        {title}
      </Typography>

      {subtitle && (
        <Typography variant="subtitle1" color="textSecondary" mb={2}>
          {subtitle}
        </Typography>
      )}

      {children && <Box mt={2}>{children}</Box>}
    </Box>
  );
};
