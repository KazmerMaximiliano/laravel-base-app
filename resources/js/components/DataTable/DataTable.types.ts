export type DataTableProps<T extends Record<string, unknown> = Record<string, unknown>> = {
  data: T[];
  currentPage?: number;
  pageSize?: number;
  paginationRoute?: string;
  total?: number;
}

export type DataTableColDef = {
  field: string;
  headerName: string;
  flex?: number;
  minWidth?: number;
  maxWidth?: number;
  resizable?: boolean;
}
