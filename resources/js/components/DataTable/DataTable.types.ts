import { Pagination } from "@/types";


export type DataTableProps<T extends Record<string, unknown> = Record<string, unknown>> = {
  data: T[];
  route: string;
  pagination: Pagination;
  onEdit?: (rowData: T) => void;
  onDelete?: (rowData: T) => void;
  onInfo?: (rowData: T) => void;
}

export type DataTableColDef = {
  field: string;
  headerName: string;
  flex?: number;
  minWidth?: number;
  maxWidth?: number;
  width?: number;
  resizable?: boolean;
  sortable?: boolean;
  filter?: boolean;
  pinned?: "left" | "right";
  cellRenderer?: any;
  cellClass?: string | string[];
  cellStyle?: Record<string, any>;
  headerClass?: string | string[];
}
