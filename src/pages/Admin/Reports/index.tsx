import { Box, Grid, Typography } from "@mui/material";
import { DirectionsCar, People, Star, Business } from "@mui/icons-material";
import { RankingItem } from "./containers/RankingItem";
import { RankingCard } from "./containers/RankingCard";
import { useCtaQuery } from "@/hooks/useCtaQuery";
import {
  topBuyers,
  topConcesionaries,
  topRatedCars,
  topSoldCars,
} from "@/services/domain/admin";
import type {
  BuyerStats,
  CarReviewStats,
  CarSalesStats,
  ConcesionaryStats,
} from "@/services/domain/admin/types";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@/components/common/Breadcrumb";

const AdminReports = () => {
  const navigate = useNavigate();
  const {
    data: soldCars,
    refetch: refetchSoldCar,
    isLoading: isLoadingSoldCar,
    error: soldErr,
  } = useCtaQuery(topSoldCars);

  const {
    data: buyers,
    refetch: refetchBuyers,
    isLoading: loadingBuyers,
    error: buyerErr,
  } = useCtaQuery(topBuyers);

  const {
    data: topCars,
    refetch: refetchRated,
    isLoading: isLoadingRated,
    error: carsError,
  } = useCtaQuery(topRatedCars);

  const {
    data: concesionaries,
    refetch: refetchConcesionaries,
    isLoading: isLoadingConcesionaries,
    error: concesionariesError,
  } = useCtaQuery(topConcesionaries);

  const breadcrumbItems = [
    {
      label: "Inicio",
      onClick: () => navigate("/dashboard"),
    },
    { label: "Reportes", enabled: true },
  ];

  return (
       <Grid
      container
      flexDirection="column"
      sx={{
        px: { xs: 3, md: 8 },
        py: { xs: 4, md: 6 },
        bgcolor: "background.default",
      }}
    >
      <Breadcrumbs items={breadcrumbItems} />
      <Typography variant="h5" sx={{ mb: 4,mt:4, fontWeight: "bold" }}>
        Rankings Top 5
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
          gap: 4,
        }}
      >
        <RankingCard
          title="Autos Más Vendidos"
          icon={<DirectionsCar sx={{ fontSize: 28 }} />}
          data={soldCars}
          isLoading={isLoadingSoldCar}
          reload={refetchSoldCar}
          error={soldErr?.statusText}
          renderItem={(car: CarSalesStats, index: number) => (
            <RankingItem
              key={car.id}
              pos={index + 1}
              left={`${car.brand} ${car.model}`}
              right={
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", fontSize: 15 }}
                >
                  {car.totalSales} {` venta${car.totalSales > 1 ? "s" : ""}`}
                </Typography>
              }
            />
          )}
        />

        <RankingCard
          title="Usuarios con Más Compras"
          icon={<People sx={{ fontSize: 28 }} />}
          data={buyers}
          isLoading={loadingBuyers}
          reload={refetchBuyers}
          error={buyerErr?.statusText}
          renderItem={(buyer: BuyerStats, pos: number) => (
            <RankingItem
              key={buyer.id}
              pos={pos + 1}
              left={buyer.name}
              subtitle={buyer.email}
              right={
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", fontSize: 15 }}
                >
                  {buyer.totalPurchases}{" "}
                  {` compra${buyer.totalPurchases > 1 ? "s" : ""}`}
                </Typography>
              }
            />
          )}
        />

        <RankingCard
          title="Autos Mejores Rankeados"
          icon={<Star sx={{ fontSize: 28 }} />}
          data={topCars}
          isLoading={isLoadingRated}
          reload={refetchRated}
          error={carsError?.statusText}
          renderItem={(rated: CarReviewStats, pos: number) => (
            <RankingItem
              key={rated.id}
              pos={pos + 1}
              left={`${rated.brand} ${rated.model}`}
              subtitle={`calificacion promedio ${rated.averageScore}`}
              right={
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", fontSize: 15 }}
                >
                  {rated.totalReviews}
                  {` review${rated.totalReviews > 1 ? "s" : ""}`}
                </Typography>
              }
            />
          )}
        />

        <RankingCard
          title="Agencias con Más Ventas"
          icon={<Business sx={{ fontSize: 28 }} />}
          data={concesionaries}
          isLoading={isLoadingConcesionaries}
          reload={refetchConcesionaries}
          error={concesionariesError?.statusText}
          renderItem={(agency: ConcesionaryStats, pos: number) => (
            <RankingItem
              key={agency.id}
              pos={pos + 1}
              left={agency.name}
              subtitle={`CUIT: ${agency.cuit}`}
              right={
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", fontSize: 15 }}
                >
                  {agency.totalSales} ventas
                </Typography>
              }
            />
          )}
        />
      </Box>
    </Grid>
  );
};

export default AdminReports;
