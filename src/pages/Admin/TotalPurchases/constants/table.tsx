import type { PurchaseResponse } from "@/services/domain/purchase/types";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<PurchaseResponse>[] = [
  {
    header: "Fecha de venta",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    header: "Comprador",
    cell: ({ row }) => row.original.buyer.fullname,
  },
 
  {
    header: "Vendedor",
    cell: ({ row }) => row.original.soldBy.fullname,
  },
  {
    header: "Vehiculo",
    cell: ({ row }) =>
      `${row.original.saleCar.modelCar.model} ${row.original.saleCar.modelCar.brand}`,
  },
   {
    header: "Precio de venta",
    cell: ({ row }) =>
      `$ ${(row.original.purchasedPrice ?? 0).toLocaleString()}`,
  },
];
