import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCtaQuery } from "@/hooks/useCtaQuery";
import { buyerConcesionaryClients } from "@/services/domain/purchase";
import { CtaTable } from "@/components/core/containers/Table";
import { columns } from "./constants/table";
import { PageContainer } from "@/components/core/containers/PageContainer";

const ConcessionaryCustomers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: clients = [], isLoading } = useCtaQuery(
    buyerConcesionaryClients
  );
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: "Inicio", onClick: () => navigate("/dashboard") },
    { label: "Mis clientes", enabled: true },
  ];

  return (
    <PageContainer
      title={"Mis clientes"}
      breadcrumbItems={breadcrumbItems}
    >
      <CtaTable
        columns={columns}
        data={clients}
        isLoading={isLoading}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={setRowsPerPage}
        page={page}
        onPageChange={setPage}
      />
    </PageContainer>
  );
};

export default ConcessionaryCustomers;
