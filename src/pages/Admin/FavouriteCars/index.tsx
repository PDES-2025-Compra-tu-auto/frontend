import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCtaQuery } from "@/hooks/useCtaQuery";
import { CtaTable } from "@/components/core/containers/Table";
import { allFavourites } from "@/services/domain/admin";
import { columns } from "./constants";
import { PageContainer } from "@/components/core/containers/PageContainer";


const FavouriteCars = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data: favourites = [], isLoading } = useCtaQuery(allFavourites);
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: "Inicio", onClick: () => navigate("/dashboard") },
    { label: "Favoritos", enabled: true },
  ];



  return (
    <PageContainer title={"Autos Preferidos por los clientes"} breadcrumbItems={breadcrumbItems}>

        <CtaTable
          columns={columns}
          data={favourites}
          isLoading={isLoading}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
          page={page}
          onPageChange={setPage}
        />
    </PageContainer>
  );
};

export default FavouriteCars;
