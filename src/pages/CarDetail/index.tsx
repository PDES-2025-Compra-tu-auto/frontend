import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Stack,
  Divider,
  IconButton,
  TextField,
  Grid,
} from "@mui/material";
import {
  Email as EmailIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/common/Button";
import { useCtaQuery } from "@/hooks/useCtaQuery";
import { getSaleCar } from "@/services/domain/cars";
import { Breadcrumbs } from "@/components/common/Breadcrumb";
import {
  reviewByModelCar,
  addReviewToModelCar,
} from "@/services/domain/reviews";
import { useCtaMutation } from "@/hooks/useCtaMutation";
import {
  addSaleCarToFavourite,
  deleteFavourite,
} from "@/services/domain/favourites";
import { toast } from "react-toastify";
import type {
  AddReview,
  ReviewResponse,
} from "@/services/domain/reviews/types";
import type { BasicSaleCar } from "@/services/domain/cars/types";

const CarDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [reviewScore, setReviewScore] = useState<number>(0);
  const [reviewComment, setReviewComment] = useState<string>("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const navigate = useNavigate();

  const { data: car, refetch } = useCtaQuery(() => getSaleCar(id as string), {
    enabled: !!id,
  });

  const { data: reviews ,refetch:refetchReviews} = useCtaQuery(
    () => reviewByModelCar(car?.modelCar?.id || ""),
    { enabled: !!car }
  );

  const addToFavMutation = useCtaMutation<any, { saleCarId: string }>((data) =>
    addSaleCarToFavourite(data!)
  );
  const deleteFavMutation = useCtaMutation<{ message: string }, string>(
    (data) => deleteFavourite(data!)
  );
  const createReviewMutation = useCtaMutation<ReviewResponse, AddReview>(
    (data) => addReviewToModelCar(data!)
  );

  const breadcrumbItems = [
    {
      label: "Inicio",
      onClick: () => navigate("/dashboard"),
    },
    { label: "Autos", onClick: () => navigate("/cars") },
    { label: "Detalle", enabled: true },
  ];

  const addToFavourites = (saleCarId: string) => {
    addToFavMutation
      .mutateAsync({ saleCarId })
      .then(() => {
        refetch();
        toast.success("Vehiculo agregado a favoritos");
      })
      .catch(() => {
        toast.error("Ha ocurrido un error al agregar el vehiculo a favoritos");
      });
  };

  const remoteToFavourites = (favouriteId: string) => {
    deleteFavMutation
      .mutateAsync(favouriteId)
      .then(() => {
        refetch();
        toast.success("Auto removido de favoritos");
      })
      .catch(() => {
        toast.error("Ha ocurrido un error, intente nuevamente");
      });
  };

  const toggleFavorite = (car?: BasicSaleCar) => {
    if (car?.favoritedByUser) {
      remoteToFavourites(car.favoriteId!);
    } else {
      addToFavourites(car!.id);
    }
  };

  const handleSubmitReview = () => {
    if (
      !reviewComment ||
      reviewScore <= 0 ||
      reviewScore > 10 ||
      !car?.modelCar?.id
    ) {
      toast.error("Por favor escribi algo para enviar como comentario.");
      return;
    }

    setIsSubmittingReview(true);

    createReviewMutation
      .mutateAsync({
        modelCarId: car.modelCar.id,
        score: reviewScore,
        comment: reviewComment,
      })
      .then(() => {
        toast.success("¡Reseña enviada con éxito!");
        refetchReviews()
        setReviewComment("");
        setReviewScore(0);
      })
      .catch(() => {
        toast.error("Ocurrió un error al enviar la reseña.");
      })
      .finally(() => {
        setIsSubmittingReview(false);
      });
  };

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

        <Box
          sx={{
            pt: 4,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            gap: 4,
          }}
        >
          <Box>
            <Card sx={{ mb: 2 }}>
              <CardMedia
                component="img"
                height="500"
                loading="lazy"
                image={selectedImage || car?.modelCar.imageUrl}
                alt={`${car?.modelCar.brand} ${car?.modelCar.model}`}
                sx={{ bgcolor: "grey.200" }}
              />
            </Card>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1,
              }}
            >
              {[car?.modelCar].map((modelCar) => (
                <Card
                  key={id}
                  sx={{
                    cursor: "pointer",
                    border: selectedImage === modelCar?.imageUrl ? 2 : 0,
                    borderColor: "primary.main",
                  }}
                  onClick={() => setSelectedImage(modelCar?.imageUrl || "")}
                >
                  <CardMedia
                    component="img"
                    height="120"
                    image={car?.modelCar.imageUrl}
                    alt={`${car?.modelCar.brand} ${car?.modelCar.model}`}
                    sx={{ bgcolor: "grey.200" }}
                  />
                </Card>
              ))}
            </Box>
          </Box>
          <Box>
            <Card sx={{ p: 3, mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {car?.modelCar.brand} {car?.modelCar.model}
                </Typography>
                <IconButton
                  onClick={() => toggleFavorite(car)}
                  aria-label="marcar favorito"
                >
                  { car?.favoritedByUser ? (
                    <Favorite sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              </Box>
              <Typography
                variant="h4"
                sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}
              >
                ${car?.price.toLocaleString()}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ mb: 2 }}
              >
                Comprar Ahora
              </Button>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {car?.status === "AVAILABLE" ? "Disponible" : "No Disponible"}
                </Typography>
              </Box>
            </Card>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Vendedor
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
                {car?.concesionary.concessionaryName}
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <EmailIcon
                    sx={{ mr: 1, color: "text.secondary", fontSize: 20 }}
                  />
                  <Typography variant="body2">
                    {car?.concesionary.email}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: 4,
            mt: 4,
          }}
        >
          <Box>
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Descripción
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                {car?.modelCar.description}
              </Typography>
            </Card>
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Card sx={{ p: 3 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Dejá tu reseña
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="body2" sx={{ mr: 2 }}>
                  Puntuación:
                </Typography>
                <Box sx={{ display: "flex" }}>
                  {[...Array(10)].map((_, index) => (
                    <IconButton
                      key={index}
                      size="small"
                      onClick={() => setReviewScore(index + 1)}
                    >
                      {index < reviewScore ? (
                        <StarIcon sx={{ color: "primary.main" }} />
                      ) : (
                        <StarBorderIcon sx={{ color: "primary.main" }} />
                      )}
                    </IconButton>
                  ))}
                </Box>
                <Typography variant="body2" sx={{ ml: 2, fontWeight: 600 }}>
                  {reviewScore}/10
                </Typography>
              </Box>
              <TextField
                label="Comentario"
                fullWidth
                multiline
                minRows={3}
                maxRows={6}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ px: 3 }}
                onClick={handleSubmitReview}
                disabled={isSubmittingReview}
              >
                {isSubmittingReview ? "Enviando..." : "Enviar Reseña"}
              </Button>
            </Box>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
              Reseñas de Usuarios
            </Typography>
            <Stack spacing={3}>
              {reviews?.map((review) => (
                <Box key={review.id}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {review.buyer.fullname}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(review.createdAt).toLocaleDateString("es-ES")}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Box sx={{ display: "flex", mr: 1 }}>
                      {[...Array(10)].map((_, index) =>
                        index < review.score ? (
                          <StarIcon
                            key={index}
                            sx={{ color: "primary.main", fontSize: 18 }}
                          />
                        ) : (
                          <StarBorderIcon
                            key={index}
                            sx={{ color: "primary.main", fontSize: 18 }}
                          />
                        )
                      )}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "primary.main" }}
                    >
                      {review.score}/10
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {review.comment}
                  </Typography>
                  {review.id !== reviews[reviews.length - 1].id && (
                    <Divider sx={{ mt: 2 }} />
                  )}
                </Box>
              ))}
            </Stack>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CarDetail;
