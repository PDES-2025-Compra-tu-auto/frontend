import { Button } from "@/components/common/Button";
import { Refresh } from "@mui/icons-material";
import { Card, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type {  JSX, ReactElement } from "react";
import type { RankingItem } from "../RankingItem";

interface RankingCardProps<T>{
    title:string 
    icon: JSX.Element
    isLoading:boolean 
    data?: T[] 
    error: string|null|undefined 
    renderItem:(data:T,pos:number)=>ReactElement<typeof RankingItem>
    reload:()=>void 
}

export const RankingCard =<T,>({
  title,
  icon,
  isLoading, 
  data=[],
  error,
  renderItem,
  reload,
}:RankingCardProps<T>) => {

  return (
    <Card
      sx={{
        p: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        border: "2px solid #e6f2ff",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        minHeight: 280,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "primary.main",
        }}
      >
        {icon}
        {title}
      </Typography>
      {isLoading && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={40} />
        </Box>
      )}
      {error && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={reload}
            size="small"
          >
            Reintentar
          </Button>
        </Box>
      )}
      {!isLoading && !error && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {data.map(renderItem)}
        </Box>
      )}
    </Card>
  );
};
