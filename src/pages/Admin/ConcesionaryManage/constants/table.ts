import type { UserResponseDto } from "@/services/domain/user/types";
import type { ColumnDef } from "@tanstack/react-table";

 export const columns: ColumnDef<UserResponseDto>[] = [
    {
      header: "Fecha de registro",
      cell: ({ row }) =>
        new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      header: "Concesionaria",
      cell: ({ row }) => row.original.fullname ,
    },
    {
      header: "Email",
      cell: ({ row }) => row.original.email ,
    },
    
  ];