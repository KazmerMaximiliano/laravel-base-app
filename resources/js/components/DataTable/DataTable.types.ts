import { Pagination } from "@/types/common";

export type DataTableProps<T extends Record<string, unknown> = Record<string, unknown>> = {
  data: T[];
  route: string;
  pagination: Pagination;
}

export type DataTableColDef = {
  field: string;
  headerName: string;
  flex?: number;
  minWidth?: number;
  maxWidth?: number;
  resizable?: boolean;
}
