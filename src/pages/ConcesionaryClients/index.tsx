import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Breadcrumbs } from "@/components/common/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useCtaQuery } from "@/hooks/useCtaQuery";
import { buyerConcesionaryClients } from "@/services/domain/purchase";
import { CtaTable } from "@/components/core/containers/Table";
import { columns } from "./constants/table";


const ConcessionaryCustomers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: clients = [], isLoading } = useCtaQuery(buyerConcesionaryClients);
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: "Inicio", onClick: () => navigate("/dashboard") },
    { label: "Mis clientes", enabled: true },
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
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, mt: 2, color: "#1a1a1a" }}
        >
          Mis clientes
        </Typography>

        <CtaTable
          columns={columns}
          data={clients}
          isLoading={isLoading}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
          page={page}
          onPageChange={setPage}
        />
      </Grid>
    </Grid>
  );
};

export default ConcessionaryCustomers;
