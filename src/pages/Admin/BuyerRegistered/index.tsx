import { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { Breadcrumbs } from "@/components/common/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useCtaQuery } from "@/hooks/useCtaQuery";
import { CtaTable } from "@/components/core/containers/Table";
import { columns } from "./constants/table";
import { allUsers } from "@/services/domain/admin";
import { UserRole } from "@/domain/user/types";
import { BuyerReviewsDialog } from "./compontents/BuyerReviewsDialog";

const BuyerRegistered = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: users = [], isLoading } = useCtaQuery(() =>
    allUsers(UserRole.BUYER)
  );

  const navigate = useNavigate();

  const [openReviews, setOpenReviews] = useState(false);

  const breadcrumbItems = [
    { label: "Inicio", onClick: () => navigate("/dashboard") },
    { label: "Compradores", enabled: true },
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
          Compradores registrados
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 500, mt: 2, color: "#1a1a1a" }}
        >
          Conocé qué opinan los usuarios sobre su experiencia de compra en la
          plataforma.
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 1, mb: 3 }}
          onClick={() => setOpenReviews(true)}
        >
          Ver reseñas de usuarios
        </Button>

        <CtaTable
          columns={columns}
          data={users}
          isLoading={isLoading}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
          page={page}
          onPageChange={setPage}
        />
      </Grid>

      <BuyerReviewsDialog
        open={openReviews}
        onClose={() => setOpenReviews(false)}
      />
    </Grid>
  );
};

export default BuyerRegistered;
