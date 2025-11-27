/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { AttachMoney as MoneyIcon } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/common/Button";
import { useCtaMutation } from "@/hooks/useCtaMutation";

import {
  AvailabilityCar,
  type SaleCarResponse,
} from "@/services/domain/cars/types";
import { updateSaleCar } from "@/services/domain/cars";

import { schema, type EditSaleCarForm } from "../../constants/validations";

type Props = {
  open: boolean;
  onClose: () => void;
  saleCar: SaleCarResponse;
  onSuccess?: () => void;
};

export const EditCarModal = ({ open, onClose, saleCar, onSuccess }: Props) => {
  const [availability, setAvailability] = useState<AvailabilityCar>(
    saleCar.status
  );

  const updateMutation = useCtaMutation<
    SaleCarResponse,
    { price: number; status: AvailabilityCar }
  >((data) => updateSaleCar(saleCar.id, data!));

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditSaleCarForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      price: String(saleCar.price),
    },
  });

  useEffect(() => {
    reset({
      price: String(saleCar.price),
    });
    setAvailability(saleCar.status);
  }, [saleCar]);

  const onSubmit = async (form: EditSaleCarForm) => {
    try {
      await updateMutation.mutateAsync({
        price: Number(form.price),
        status: availability,
      });

      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>Editar publicación</DialogTitle>

      <DialogContent dividers>
        {/* Precio */}
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="number"
              label="Precio"
              sx={{ mb: 3 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <MoneyIcon />
                    </InputAdornment>
                  ),
                },
              }}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          )}
        />
        <FormControlLabel
          control={
            <Switch
              checked={availability === AvailabilityCar.AVAILABLE}
              onChange={() =>
                setAvailability(
                  availability === AvailabilityCar.AVAILABLE
                    ? AvailabilityCar.UNAVAILABLE
                    : AvailabilityCar.AVAILABLE
                )
              }
            />
          }
          label={
            availability === AvailabilityCar.AVAILABLE
              ? "Disponible"
              : "No disponible"
          }
        />
      </DialogContent>

      <DialogActions sx={{ px: 2, pb:2 }}>
        <Button variant="outlined" sx={{px:2, py:0.5}} onClick={handleClose}>
          Cancelar
        </Button>

        <Button variant="contained" sx={{px:2, py:0.5}} onClick={handleSubmit(onSubmit)}>
          Actualizar publicacion
        </Button>
      </DialogActions>
    </Dialog>
  );
};
