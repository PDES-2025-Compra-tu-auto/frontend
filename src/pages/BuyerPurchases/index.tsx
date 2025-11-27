import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from "@mui/material";
import { DirectionsCar as CarIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common/Button";
import { useCtaQuery } from "@/hooks/useCtaQuery";
import { buyerPurchases } from "@/services/domain/purchase";
import type { PurchaseResponse } from "@/services/domain/purchase/types";
import { useState } from "react";
import { PurchaseReceiptModal } from "./components/PurchaseReceiptModal";
import { PageContainer } from "@/components/core/containers/PageContainer";

const BuyerPurchases = () => {
  const navigate = useNavigate();
  const [purchaseData,setPurchaseData] = useState<null|PurchaseResponse>(null)
  const { data: purchases } = useCtaQuery(buyerPurchases);


  const handlePurchase =(purchase:PurchaseResponse)=>{
    setPurchaseData(purchase)
  }

  const onClose = ()=>{
    setPurchaseData(null)
  }

  const breadcrumbItems = [
    {
      label: "Inicio",
      onClick: () => navigate("/dashboard"),
    },
    { label: "Compras", enabled: true },
  ];

  return (
    <PageContainer title="Mis autos comprados" breadcrumbItems={breadcrumbItems}>
        <Box sx={{ mb: 3, mt:3 }}>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
           {purchases?.length} {purchases?.length===1 ? 'auto encontrado' : 'autos encontrados'}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {purchases?.map((purchase) => (
            <Card
              key={purchase.id}
              sx={{
                position: "relative",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "box-shadow 0.2s",
                "&:hover": {
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                },
              }}
            >
              
              <CardMedia
                component="img"
                height="200"
                image={purchase.saleCar.modelCar.imageUrl}
                alt={`${purchase.saleCar.modelCar.brand} ${purchase.saleCar.modelCar.model}`}
                sx={{ bgcolor: "grey.200" }}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                  {purchase.saleCar.modelCar.brand} {purchase.saleCar.modelCar.model}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {purchase.saleCar.modelCar.description}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "primary.main", fontWeight: "bold" }}
                >
                  ${purchase.saleCar.price.toLocaleString()}
                </Typography>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ flex: 1 }}
                    onClick={() => handlePurchase(purchase)}
                  >
                    Ver Comprobante
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>

        {!purchases?.length && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <CarIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1, color: "text.secondary" }}>
              No se encontraron autos en tu lista de compras
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Apenas realices una compra vas a poder ver el auto en esta sección
            </Typography>
          </Box>
        )}
      <PurchaseReceiptModal purchase={purchaseData} onClose={onClose}/>
    </PageContainer>
  );
};

export default BuyerPurchases;
