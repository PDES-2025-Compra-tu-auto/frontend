import type { PurchaseResponse } from "@/services/domain/purchase/types";
import type { ColumnDef } from "@tanstack/react-table";

 export const columns: ColumnDef<PurchaseResponse>[] = [
    {
      header: "Fecha de compra",
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString(),
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
          row.original.purchasedPrice ??
          row.original.saleCar?.price ??
          0
        ).toLocaleString()}`,
    },
    {
      header: "Patente",
      cell: ({ row }) => row.original.patent ?? "N/A",
    },
  ];