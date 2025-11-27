import type { ColumnDef } from "@tanstack/react-table";
import type { SaleCarResponse } from "@/services/domain/cars/types";
import { Button } from "@/components/common/Button";

interface UseSaleCarColumnsProps {
  setSelectedCar: (car: SaleCarResponse) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}



export const useSaleCarColumns = ({ setSelectedCar, setIsModalOpen }: UseSaleCarColumnsProps) => {

const columns: ColumnDef<SaleCarResponse>[]= [
    {
      header: "Marca",
      accessorKey: "modelCar.brand",
      cell: ({ row }) => row.original.modelCar.brand,
    },
    {
      header: "Modelo",
      accessorKey: "modelCar.model",
      cell: ({ row }) => row.original.modelCar.model,
    },
    {
      header: "Precio",
      accessorKey: "price",
      cell: ({ row }) =>
        new Intl.NumberFormat("es-AR", {
          style: "currency",
          currency: "ARS",
        }).format(row.original.price),
    },
    {
      header: "Estado",
      accessorKey: "status",
      cell: ({ row }) =>
        row.original.status === "AVAILABLE"
          ? "Disponible"
          : "No disponible",
    },
    {
      header: "Acción",
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="contained"
          sx={{px:2, py:1, fontSize:'0.7rem'}}
          onClick={
            () => {
                setSelectedCar(row.original);
                setIsModalOpen(true);
            }
          }
        >
          Editar
        </Button>
      ),
    },
  ]

  return {columns}
};
