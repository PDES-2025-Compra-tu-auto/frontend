import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Stack,
  Divider,
  Button,
  CircularProgress,
  Card,
  CardMedia,
  Typography
} from "@mui/material";
import { Close as CloseIcon, Star, StarBorder } from "@mui/icons-material";
import { useCtaQuery } from "@/hooks/useCtaQuery";
import { allReviews } from "@/services/domain/admin";

interface ReviewsDialogProps {
  open: boolean;
  onClose: () => void;
}

export const BuyerReviewsDialog = ({ open, onClose }: ReviewsDialogProps) => {
  const { data: reviews, isLoading } = useCtaQuery(allReviews, {
    enabled: open,
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Reseñas de Usuarios
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ maxHeight: 450, position: "relative" }}>
                {isLoading && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(255,255,255,0.6)",
              zIndex: 2,
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        )}

        {!isLoading && (!reviews || reviews.length === 0) && (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Todavía no hay historias que contar…
            </Typography>
            <Typography color="text.secondary">
              Ningún usuario dejó su huella todavía.  
              ¡Quizás la próxima reseña sea la primera!
            </Typography>
          </Box>
        )}

        {/* 🔵 LISTA DE REVIEWS */}
        {!isLoading && reviews && reviews.length > 0 && (
          <Stack spacing={4}>
            {reviews.map((review) => (
              <Box key={review.id} sx={{ display: "flex", gap: 2 }}>
                
                <Card
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 1,
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={review.modelCar.imageUrl}
                    alt={`${review.modelCar.brand} ${review.modelCar.model}`}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Card>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {review.buyer.fullname}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {new Date(review.createdAt).toLocaleDateString("es-ES")}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ mt: 1, fontWeight: 600, color: "primary.main" }}
                  >
                    {review.modelCar.brand} {review.modelCar.model}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
                    {[...Array(10)].map((_, index) =>
                      index < review.score ? (
                        <Star key={index} sx={{ color: "primary.main", fontSize: 18 }} />
                      ) : (
                        <StarBorder key={index} sx={{ color: "primary.main", fontSize: 18 }} />
                      )
                    )}
                    <Typography
                      variant="body2"
                      sx={{ ml: 1, fontWeight: 700, color: "primary.main" }}
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

                  <Divider sx={{ mt: 2 }} />
                </Box>
              </Box>
            ))}
          </Stack>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
