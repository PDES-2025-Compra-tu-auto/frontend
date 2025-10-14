import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardMedia,
  CardContent,
  Stack,
  IconButton,
  Grid,
} from "@mui/material";
import {
  Search as SearchIcon,
  DirectionsCar as CarIcon,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common/Button";
import { Breadcrumbs } from "@/components/common/Breadcrumb";
import { getSaleCars } from "@/services/domain/cars";
import { useCtaQuery } from "@/hooks/useCtaQuery";
import { useCtaMutation } from "@/hooks/useCtaMutation";
import {
  addSaleCarToFavourite,
  deleteFavourite,
} from "@/services/domain/favourites";
import { toast } from "react-toastify";
import type { FavoriteResponse } from "@/services/domain/favourites/types";
import type { BasicSaleCar } from "@/services/domain/cars/types";

const brands = [
  "Todas",
  "BMW",
  "Audi",
  "Mercedes-Benz",
  "Toyota",
  "Volkswagen",
  "Ford",
];
const fuelTypes = ["Todos", "Gasolina", "Diésel", "Híbrido", "Eléctrico"];
const transmissionTypes = ["Todas", "Manual", "Automática"];

const ExploreCars = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("Todas");
  const [selectedFuel, setSelectedFuel] = useState("Todos");
  const [selectedTransmission, setSelectedTransmission] = useState("Todas");
  const addToFavMutation = useCtaMutation<
    FavoriteResponse,
    { saleCarId: string }
  >((data) => addSaleCarToFavourite(data!));
  const deleteFavMutation = useCtaMutation<{ message: string }, string>(
    (data) => deleteFavourite(data!)
  );

  const { data: cars, refetch } = useCtaQuery(getSaleCars);

  const handleCarClick = (carId: string) => {
    navigate(`/car/${carId}`);
  };

  const addFavorite = (carId: string) => {
    addToFavMutation
      .mutateAsync({ saleCarId: carId })
      .then(() => {
        refetch();
        toast.success("Vehiculo agregado a favoritos");
      })
      .catch(() => {
        toast.error("Ha ocurrido un error al agregar el vehiculo a favoritos");
      });
  };

  const removeFavorite = (favId: string) => {
    deleteFavMutation
      .mutateAsync(favId)
      .then(() => {
        refetch();
        toast.success("Auto removido de favoritos");
      })
      .catch(() => {
        toast.error("Ha ocurrido un error, intente nuevamente");
      });
  };

  const toggleFavorite = (car: BasicSaleCar) => {
    const isFavorite = car.favoritedByUser;
    if (isFavorite) {
      removeFavorite(car.favoriteId!);
    } else {
      addFavorite(car.id);
    }
  };

  const breadcrumbItems = [
    {
      label: "Inicio",
      onClick: () => navigate("/dashboard"),
    },
    { label: "Autos", enabled: true },
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
      <Grid sx={{ py: 1 }}>
        <Breadcrumbs items={breadcrumbItems} />

        <Box sx={{ mb: 4, mt: 4 }}>
          <Typography
            variant="h4"
            sx={{ mb: 3, color: "text.primary", fontWeight: "bold" }}
          >
            Explorar Autos
          </Typography>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Buscar por marca, modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  borderWidth: 2,
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 3,
            }}
          >
            <FormControl fullWidth>
              <InputLabel>Marca</InputLabel>
              <Select
                value={selectedBrand}
                label="Marca"
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                {brands.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Combustible</InputLabel>
              <Select
                value={selectedFuel}
                label="Combustible"
                onChange={(e) => setSelectedFuel(e.target.value)}
              >
                {fuelTypes.map((fuel) => (
                  <MenuItem key={fuel} value={fuel}>
                    {fuel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Transmisión</InputLabel>
              <Select
                value={selectedTransmission}
                label="Transmisión"
                onChange={(e) => setSelectedTransmission(e.target.value)}
              >
                {transmissionTypes.map((transmission) => (
                  <MenuItem key={transmission} value={transmission}>
                    {transmission}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            {cars?.length} autos encontrados
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
          {cars?.map((car) => (
            <Card
              key={car.id}
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
              <IconButton
                onClick={() => toggleFavorite(car)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 1,
                  backgroundColor: "background.paper",
                  "&:hover": {
                    backgroundColor: "background.default",
                  },
                }}
              >
                {car.favoritedByUser ? (
                  <Favorite sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorder sx={{ color: "grey.500" }} />
                )}
              </IconButton>

              <CardMedia
                component="img"
                height="200"
                image={car.modelCar.imageUrl}
                alt={`${car.modelCar.brand} ${car.modelCar.model}`}
                sx={{ bgcolor: "grey.200" }}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                  {car.modelCar.brand} {car.modelCar.model}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {car.modelCar.description}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "primary.main", fontWeight: "bold" }}
                >
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

        {!cars?.length && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <CarIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1, color: "text.secondary" }}>
              No se encontraron autos
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Intenta ajustar los filtros de búsqueda
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default ExploreCars;
