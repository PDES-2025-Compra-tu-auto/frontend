import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCtaQuery } from "@/hooks/useCtaQuery";
import { CtaTable } from "@/components/core/containers/Table";
import { columns } from "./constants/table";
import { allUsers } from "@/services/domain/admin";
import { UserRole } from "@/domain/user/types";
import { PageContainer } from "@/components/core/containers/PageContainer";


const ManageConcesionaries = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data: users = [], isLoading } = useCtaQuery(()=>allUsers(UserRole.CONCESIONARY));
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: "Inicio", onClick: () => navigate("/dashboard") },
    { label: "Concesionarias", enabled: true },
  ];



  return (
    <PageContainer title={"Concesionarias registrados"} breadcrumbItems={breadcrumbItems}>
        <CtaTable
          columns={columns}
          data={users}
          isLoading={isLoading}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
          page={page}
          onPageChange={setPage}
        />
    </PageContainer>
  );
};

export default ManageConcesionaries;
