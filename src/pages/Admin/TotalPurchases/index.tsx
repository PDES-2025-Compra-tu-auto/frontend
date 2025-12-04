import { useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCtaQuery } from "@/hooks/useCtaQuery";
import { CtaTable } from "@/components/core/containers/Table";
import { columns } from "./constants/table";
import { allPurchases } from "@/services/domain/admin";
import { PageContainer } from "@/components/core/containers/PageContainer";

const TotalPurchases = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: purchases = [], isLoading } = useCtaQuery(allPurchases);

  const navigate = useNavigate();


  const breadcrumbItems = [
    { label: "Inicio", onClick: () => navigate("/dashboard") },
    { label: "Compras Totales", enabled: true },
  ];

  return (
  <PageContainer title="Total de compras" breadcrumbItems={breadcrumbItems}>
        <Typography
          variant="body1"
          sx={{ fontWeight: 500, mt: 2, color: "#1a1a1a" }}
        >
          Acá vas a poder visualizar el total de compras que se hicieron en la aplicación
        </Typography>

        <CtaTable
          columns={columns}
          data={purchases}
          isLoading={isLoading}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
          page={page}
          onPageChange={setPage}
        />
      </PageContainer>
  );
};

export default TotalPurchases;
