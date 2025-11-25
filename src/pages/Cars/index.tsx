import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Stack,
  IconButton,
  Grid,
  CircularProgress,
} from "@mui/material";
import { DirectionsCar as CarIcon, Favorite, FavoriteBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common/Button";
import { Breadcrumbs } from "@/components/common/Breadcrumb";
import { getSaleCars } from "@/services/domain/cars";
import { useCtaQuery } from "@/hooks/useCtaQuery";
import { useCtaMutation } from "@/hooks/useCtaMutation";
import { addSaleCarToFavourite, deleteFavourite } from "@/services/domain/favourites";
import { toast } from "react-toastify";
import type { FavoriteResponse } from "@/services/domain/favourites/types";
import type { BasicSaleCar } from "@/services/domain/cars/types";
import { useDebounce } from "@/hooks/useDebounce";

const ExploreCars = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<{ [key: string]: string | number | undefined }>({});
  const debouncedFilters = useDebounce(filters, 500);

  const addToFavMutation = useCtaMutation<FavoriteResponse, { saleCarId: string }>(
    (data) => addSaleCarToFavourite(data!)
  );
  const deleteFavMutation = useCtaMutation<{ message: string }, string>((data) => deleteFavourite(data!));

  const { data: cars, refetch, isLoading } = useCtaQuery(() => getSaleCars(debouncedFilters));

  const handleCarClick = (carId: string) => navigate(`/car/${carId}`);

const handleFilterChange = (field: string, value: string) => {
  setFilters((prev) => {
    const newFilters = { ...prev };

    if (value === "" || value == null) {
      delete newFilters[field]; 
    } else {
      newFilters[field] = field.toLowerCase().includes("price") ? Number(value) : value;
    }

    return newFilters;
  });
};

  const addFavorite = (carId: string) => {
    addToFavMutation
      .mutateAsync({ saleCarId: carId })
      .then(() => {
        refetch();
        toast.success("Vehiculo agregado a favoritos");
      })
      .catch(() => toast.error("Error al agregar favorito"));
  };

  const removeFavorite = (favId: string) => {
    deleteFavMutation
      .mutateAsync(favId)
      .then(() => {
        refetch();
        toast.success("Auto removido de favoritos");
      })
      .catch(() => toast.error("Error al remover favorito"));
  };

  const toggleFavorite = (car: BasicSaleCar) => {
    if (car.favoritedByUser) removeFavorite(car.favoriteId!);
    else addFavorite(car.id);
  };

  const breadcrumbItems = [
    { label: "Inicio", onClick: () => navigate("/dashboard") },
    { label: "Autos", enabled: true },
  ];

  let content;
  if (isLoading) {
    content = (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  } else if (cars && cars.length > 0) {
    content = (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
          gap: 3,
        }}
      >
        {cars.map((car) => (
          <Card
            key={car.id}
            sx={{ position: "relative", height: "100%", display: "flex", flexDirection: "column" }}
          >
            <IconButton
              onClick={() => toggleFavorite(car)}
              sx={{ position: "absolute", top: 8, right: 8, zIndex: 1, backgroundColor: "background.paper" }}
            >
              {car.favoritedByUser ? <Favorite sx={{ color: "red" }} /> : <FavoriteBorder sx={{ color: "grey.500" }} />}
            </IconButton>

            <CardMedia
              component="img"
              height="200"
              image={car.modelCar.imageUrl}
              alt={`${car.modelCar.brand} ${car.modelCar.model}`}
            />

            <CardContent sx={{ flexGrow: 1, p: 3 }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                {car.modelCar.brand} {car.modelCar.model}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {car.modelCar.description}
              </Typography>

              <Typography variant="h6" sx={{ mb: 2, color: "primary.main", fontWeight: "bold" }}>
                ${car.price.toLocaleString()}
              </Typography>

              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ flex: 1 }}
                  onClick={() => handleCarClick(car.id)}
                >
                  Ver Detalles
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  } else {
    content = (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <CarIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
        <Typography variant="h6" sx={{ mb: 1, color: "text.secondary" }}>
          No se encontraron autos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Intenta ajustar los filtros de búsqueda
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container flexDirection="column" sx={{ px: { xs: 3, md: 8 }, py: { xs: 4, md: 6 }, bgcolor: "background.default" }}>
      <Grid sx={{ py: 1 }}>
        <Breadcrumbs items={breadcrumbItems} />

        <Box sx={{ mb: 4, mt: 4 }}>
          <Typography variant="h4" sx={{ mb: 3, color: "text.primary", fontWeight: "bold" }}>
            Explorar Autos
          </Typography>

          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            }}
          >
            <TextField
              label="Modelo o marca"
              value={filters.keyword || ""}
              onChange={(e) => handleFilterChange("keyword", e.target.value)}
              fullWidth
            />

            <TextField
              label="Precio mínimo"
              type="number"
              value={filters.minPrice || ""}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              fullWidth
            />

            <TextField
              label="Precio máximo"
              type="number"
              value={filters.maxPrice || ""}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              fullWidth
            />
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
           {cars?.length} {cars?.length!==1?  'autos encontrados': 'auto encontrado'}
          </Typography>
        </Box>

        {content}
      </Grid>
    </Grid>
  );
};

export default ExploreCars;
