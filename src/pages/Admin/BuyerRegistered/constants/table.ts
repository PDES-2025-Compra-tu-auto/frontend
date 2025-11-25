import type { ColumnDef } from "@tanstack/react-table";

 export const columns: ColumnDef<any>[] = [
    {
      header: "Fecha de compra",
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      header: "Comprador",
      cell: ({ row }) => row.original.fullname ,
    },
    {
      header: "Email",
      cell: ({ row }) => row.original.email ,
    },
  ];