import type { FavoriteResponse } from "@/services/domain/favourites/types";
import type { ColumnDef } from "@tanstack/react-table";

 export const columns: ColumnDef<FavoriteResponse>[] = [
    {
      header: "Fecha",
      cell: ({ row }) =>
        new Date(row.original.dateAdded).toLocaleDateString(),
    },
    {
      header: "Comprador",
      cell: ({ row }) => row.original.buyer?.fullname ?? "Sin nombre",
    },
    {
      header: "Marca",
      cell: ({ row }) => row.original.saleCar?.modelCar?.brand ?? "N/A",
    },
    {
      header: "Modelo",
      cell: ({ row }) => row.original.saleCar?.modelCar?.model ?? "N/A",
    },
    {
      header: "Precio",
      cell: ({ row }) =>
        `$ ${(
          row.original.saleCar?.price ??
          0
        ).toLocaleString()}`,
    },

  ];