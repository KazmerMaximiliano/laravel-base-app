export type DataTableProps<T extends Record<string, unknown> = Record<string, unknown>> = {
  data: T[];
  currentPage?: number;
  pageSize?: number;
  paginationRoute?: string;
  total?: number;
}
