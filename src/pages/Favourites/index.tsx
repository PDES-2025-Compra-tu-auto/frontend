import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Stack,
  IconButton,
  Grid,
} from "@mui/material";
import { DirectionsCar as CarIcon, Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/common/Button";
import { Breadcrumbs } from "@/components/common/Breadcrumb";
import { useCtaQuery } from "@/hooks/useCtaQuery";
import { useCtaMutation } from "@/hooks/useCtaMutation";
import { deleteFavourite, getMyFavourites } from "@/services/domain/favourites";
import { toast } from "react-toastify";

const Favourites = () => {
  const navigate = useNavigate();
  const deleteFavMutation = useCtaMutation<{ message: string }, string>(
    (data) => deleteFavourite(data!)
  );

  const { data: cars, refetch } = useCtaQuery(getMyFavourites);

  const handleCarClick = (carId: string) => {
    navigate(`/car/${carId}`);
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

  const breadcrumbItems = [
    {
      label: "Inicio",
      onClick: () => navigate("/dashboard"),
    },
    { label: "Favoritos", enabled: true },
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
            Mis autos favoritos
          </Typography>
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
                onClick={() => removeFavorite(car.id)}
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
                <Favorite sx={{ color: "red" }} />
              </IconButton>

              <CardMedia
                component="img"
                height="200"
                image={car.saleCar.modelCar.imageUrl}
                alt={`${car.saleCar.modelCar.brand} ${car.saleCar.modelCar.model}`}
                sx={{ bgcolor: "grey.200" }}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                  {car.saleCar.modelCar.brand} {car.saleCar.modelCar.model}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {car.saleCar.modelCar.description}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "primary.main", fontWeight: "bold" }}
                >
                  ${car.saleCar.price.toLocaleString()}
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
              No se encontraron autos en tu lista de favoritos
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Podés explorar autos y marcarlos como favoritos dandole click al
              corazón
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Favourites;
