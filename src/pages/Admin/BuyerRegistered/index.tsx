import { useState } from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCtaQuery } from "@/hooks/useCtaQuery";
import { CtaTable } from "@/components/core/containers/Table";
import { columns } from "./constants/table";
import { allUsers } from "@/services/domain/admin";
import { UserRole } from "@/domain/user/types";
import { BuyerReviewsDialog } from "./compontents/BuyerReviewsDialog";
import { PageContainer } from "@/components/core/containers/PageContainer";

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
  <PageContainer title="Compradores registrados" breadcrumbItems={breadcrumbItems}>
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

      <BuyerReviewsDialog
        open={openReviews}
        onClose={() => setOpenReviews(false)}
      />
      </PageContainer>
  );
};

export default BuyerRegistered;
