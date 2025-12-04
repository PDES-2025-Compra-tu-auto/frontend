import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AttachMoney as MoneyIcon,
  CloudUpload as UploadIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, type CreateSaleCarForm } from "./validations";
import { Congrats } from "@/components/core/containers/Congrats";
import { Button } from "@/components/common/Button";
import { congratsType } from "./constants";
import { createSaleCar, getModelCars } from "@/services/domain/cars";
import type { SaleCarResponse } from "@/services/domain/cars/types";
import { useCtaMutation } from "@/hooks/useCtaMutation";
import { Breadcrumbs } from "@/components/common/Breadcrumb";
import { useCtaQuery } from "@/hooks/useCtaQuery";

const CreateSaleCar = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<"success" | "error" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: carModels } = useCtaQuery(getModelCars);
  const createSaleCarMutation = useCtaMutation<
    SaleCarResponse,
    { price: number; modelCarId: string }
  >((data) => createSaleCar(data!));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSaleCarForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      carModel: "",
      price: "",
    },
  });

  const onSubmit = (data: CreateSaleCarForm) => {
    setIsLoading(true);
    const id = data.carModel;
    createSaleCarMutation
      .mutateAsync({
        modelCarId: id,
        price: Number(data.price),
      })
      .then(() => {
        setType("success");
      })
      .catch(() => {
        setType("error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const breadcrumbItems = [
    {
      label: "Inicio",
      onClick: () => navigate("/dashboard"),
    },
    { label: "Nueva publicacion", enabled: true },
  ];

  return type ? (
    <Box
      sx={{
        minHeight: "75vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Congrats
        type={type}
        title={congratsType[type].title}
        subtitle={congratsType[type].subtitle}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{ pr: "16px", pl: "16px" }}
          onClick={() => navigate("/dashboard")}
        >
          Volver al inicio
        </Button>
      </Congrats>
    </Box>
  ) : (
    <Box sx={{ bgcolor: "background.default" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Breadcrumbs items={breadcrumbItems} />
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mt: 4,
            mb: 3,
            borderRadius: 2,
            border: "1px solid hsl(220, 10%, 90%)",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
            Creá una publicación de venta
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Completá la información de tu vehículo para crear tu publicación
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 2,
            border: "1px solid hsl(220, 10%, 90%)",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 4 }}>
              <FormControl fullWidth error={!!errors.carModel}>
                <InputLabel id="car-model-label">Modelo del Auto</InputLabel>
                <Controller
                  name="carModel"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="car-model-label"
                      label="Modelo del Auto"
                      disabled={isLoading}
                      sx={{
                        borderRadius: 1,
                        "& .MuiSelect-select": {
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            maxHeight: 400,
                            "& .MuiMenuItem-root": { py: 1.5 },
                          },
                        },
                      }}
                    >
                      {carModels?.map((car) => (
                        <MenuItem key={car.id} value={car.id}>
                          <ListItemIcon sx={{ minWidth: 100 }}>
                            <Box
                              component="img"
                              src={car.imageUrl}
                              alt={car.brand}
                              sx={{
                                width: 80,
                                height: 48,
                                mr: 2,
                                objectFit: "cover",
                                borderRadius: 1,
                                border: "2px solid hsl(220, 10%, 90%)",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${car.brand}  ${car.model}`}
                            slotProps={{ primary: { fontWeight: 700 } }}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.carModel && (
                  <Typography color="error" variant="caption">
                    {errors.carModel.message}
                  </Typography>
                )}
              </FormControl>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Precio de Venta"
                    type="number"
                    disabled={isLoading}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <MoneyIcon sx={{ color: "text.secondary" }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                    helperText={
                      errors.price?.message ||
                      "Ingresa el precio en tu moneda local"
                    }
                    error={!!errors.price}
                  />
                )}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                startIcon={<UploadIcon />}
                sx={{
                  py: 1.5,
                  px: 4,
                  flex: 1,
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  background:
                    "linear-gradient(135deg, hsl(220, 100%, 45%) 0%, hsl(220, 100%, 35%) 100%)",
                  boxShadow: "0 4px 12px hsl(220, 100%, 45%, 0.3)",
                  "&:hover": {
                    boxShadow: "0 6px 16px hsl(220, 100%, 45%, 0.4)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                {isLoading ? "Publicando..." : "Publicar venta"}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate("/dashboard")}
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  px: 4,
                  textTransform: "none",
                  fontWeight: "bold",
                  borderWidth: 2,
                  "&:hover": { borderWidth: 2 },
                }}
              >
                Cancelar
              </Button>
            </Box>
          </form>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            mt: 3,
            borderRadius: 2,
            border: "1px solid hsl(220, 100%, 90%)",
            bgcolor: "hsl(220, 100%, 98%)",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            💡 <strong>Consejo:</strong> Asegúrate de que toda la información
            sea precisa para atraer a compradores serios.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateSaleCar;
