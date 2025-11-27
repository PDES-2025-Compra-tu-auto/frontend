import { useState } from "react";
import { Grid, Typography, Tabs, Tab } from "@mui/material";
import { Breadcrumbs } from "@/components/common/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useCtaQuery } from "@/hooks/useCtaQuery";
import { CtaTable } from "@/components/core/containers/Table";
import {
  AvailabilityCar,
  type SaleCarResponse,
} from "@/services/domain/cars/types";
import { getSaleCars } from "@/services/domain/cars";
import { useSaleCarColumns } from "./constants/table";
import { EditCarModal } from "./components/EditSaleCarModal";
import { toast } from "react-toastify";

const ManageSaleCar = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<SaleCarResponse | null>(null);

  const { columns } = useSaleCarColumns({setSelectedCar,setIsModalOpen});

  const breadcrumbItems = [
    { label: "Inicio", onClick: () => navigate("/dashboard") },
    { label: "Editar Publicaciones", enabled: true },
  ];
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  const selectedAvailability =
    tab === 0 ? AvailabilityCar.AVAILABLE : AvailabilityCar.UNAVAILABLE;

  const { data: sales = [], isLoading,refetch } = useCtaQuery(() =>
    getSaleCars({ status: selectedAvailability })
  );
  const handleSuccess = () => {
    toast.success('Publicacion actualizada correctamente')
    refetch()
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

        <Typography
          variant="h4"
          sx={{ fontWeight: 600, mt: 2, color: "#1a1a1a" }}
        >
          Publicaciones del Concesionario
        </Typography>

        <Typography
          variant="body1"
          sx={{ fontWeight: 500, mt: 2, color: "#1a1a1a" }}
        >
            En el siguiente apartado vas a poder editar la publicacion que creaste anteriormente , podes deshabilitarlas o cambiarles el precio 
        </Typography>
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          sx={{ mt: 3, mb: 3 }}
        >
          <Tab label="Disponibles" />
          <Tab label="No disponibles" />
        </Tabs>

        <CtaTable
          columns={columns}
          data={sales}
          isLoading={isLoading}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
          page={page}
          onPageChange={setPage}
        />
      </Grid>
      {selectedCar && (
        <EditCarModal
          open={isModalOpen}
          onClose={handleCloseModal}
          saleCar={selectedCar}
          onSuccess={handleSuccess}
        />
      )}
    </Grid>
  );
};

export default ManageSaleCar;
