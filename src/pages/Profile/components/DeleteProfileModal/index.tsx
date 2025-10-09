import { Button } from "@/components/common/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import type { FC } from "react";

interface DeleteProfileModalProps {
  open: boolean;
  onClose: () => void;
  primaryAction: () => void;
}

export const DeleteProfileModal: FC<DeleteProfileModalProps> = ({
  open,
  onClose,
  primaryAction,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", color: "error.main" }}>
        ¿Eliminar cuenta?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Esta acción es permanente y no se puede deshacer. Se eliminarán todos
          tus datos, autos guardados y preferencias. ¿Estás seguro de que deseas
          continuar?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            px: 2,
            fontSize: "0.8rem",
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={primaryAction}
          withBackground={false}
          variant="contained"
          sx={{
            px: 2,
            fontSize: "0.8rem",
            bgcolor: "error.main",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Sí, eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
