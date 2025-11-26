import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCtaQuery } from "@/hooks/useCtaQuery";
import { concesionarySales } from "@/services/domain/purchase";
import { CtaTable } from "@/components/core/containers/Table";
import { columns } from "./constants/table";
import { PageContainer } from "@/components/core/containers/PageContainer";

const ConcessionarySales = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: sales = [], isLoading } = useCtaQuery(concesionarySales);
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: "Inicio", onClick: () => navigate("/dashboard") },
    { label: "Ventas", enabled: true },
  ];

  return (
    <PageContainer
      title={"Ventas del Concesionario"}
      breadcrumbItems={breadcrumbItems}
    >
      <CtaTable
        columns={columns}
        data={sales}
        isLoading={isLoading}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={setRowsPerPage}
        page={page}
        onPageChange={setPage}
      />
    </PageContainer>
  );
};

export default ConcessionarySales;
