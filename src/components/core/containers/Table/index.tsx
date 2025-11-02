import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface TableProps<T extends object> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  isLoading?: boolean;
  rowsPerPage?: number;
  onRowsPerPageChange?: (rows: number) => void;
  page?: number;
  onPageChange?: (page: number) => void;
}

export const CtaTable = <T extends object>({
  columns,
  data,
  isLoading = false,
  rowsPerPage = 5,
  onRowsPerPageChange,
  page = 0,
  onPageChange,
}: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    onPageChange?.(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onRowsPerPageChange?.(parseInt(event.target.value, 10));
  };

  if (isLoading) {
    return (
      <Grid sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (data.length === 0) {
    return (
      <Typography
        variant="h6"
        sx={{ textAlign: "center", py: 5, color: "text.secondary" }}
      >
        No hay datos disponibles.
      </Typography>
    );
  }

  return (
    <>
      <TableContainer sx={{ mt: 3, border: "1px solid #000" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id} sx={{ color: "#fff" }}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table
              .getRowModel()
              .rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id} hover>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
      />
    </>
  );
};
