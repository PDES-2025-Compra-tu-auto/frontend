import type { PurchaseResponse } from "@/services/domain/purchase/types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import type { FC } from "react";
import { DialogActionsNoPrint } from "./styles";

interface PurchaseReceiptModalProps {
  onClose: () => void;
  purchase: PurchaseResponse | null;
}

export const PurchaseReceiptModal: FC<PurchaseReceiptModalProps> = ({
  onClose,
  purchase,
}) => {
  if (!purchase) return null;
  const { purchasedPrice, patent, createdAt, buyer, saleCar, soldBy } =
    purchase;

  return (
    <Dialog open={!!purchase} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Comprobante de Compra</DialogTitle>

      <DialogContent dividers>
        <Typography variant="h6" gutterBottom>
          Vehículo
        </Typography>

        <Box display="flex" gap={2}>
          <img
            src={saleCar.modelCar.imageUrl}
            alt={saleCar.modelCar.model}
            style={{
              width: 120,
              height: 80,
              borderRadius: 8,
              objectFit: "cover",
            }}
          />

          <Box>
            <Typography>
              <strong>Marca:</strong> {saleCar.modelCar.brand}
            </Typography>
            <Typography>
              <strong>Modelo:</strong> {saleCar.modelCar.model}
            </Typography>
            <Typography>
              <strong>Descripción:</strong> {saleCar.modelCar.description}
            </Typography>
            <Typography>
              <strong>Patente:</strong> {patent}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Comprador
        </Typography>
        <Typography>
          <strong>Nombre:</strong> {buyer.fullname}
        </Typography>
        <Typography>
          <strong>Email:</strong> {buyer.email}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Vendedor / Concesionaria
        </Typography>
        <Typography>
          <strong>Nombre:</strong> {soldBy.fullname}
        </Typography>
        <Typography>
          <strong>Email:</strong> {soldBy.email}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Detalles de la Compra
        </Typography>
        <Typography>
          <strong>Precio de compra:</strong> ${purchasedPrice}
        </Typography>
        <Typography>
          <strong>Fecha:</strong>{" "}
          {new Date(createdAt).toLocaleDateString("es-AR")}
        </Typography>
      </DialogContent>

      <DialogActionsNoPrint>
        <Button onClick={onClose} variant="contained" color="primary">
          Cerrar
        </Button>
        <Button variant="outlined" onClick={() => window.print()}>
          Imprimir
        </Button>
      </DialogActionsNoPrint>
    </Dialog>
  );
};
