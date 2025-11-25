import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Breadcrumbs } from "@/components/common/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useCtaQuery } from "@/hooks/useCtaQuery";
import { CtaTable } from "@/components/core/containers/Table";
import { allFavourites } from "@/services/domain/admin";
import { columns } from "./constants";
import type { FavoriteResponse } from "@/services/domain/favourites/types";


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
          Autos Preferidos por los clientes
        </Typography>

        <CtaTable
          columns={columns}
          data={favourites as FavoriteResponse[]}
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

export default FavouriteCars;
