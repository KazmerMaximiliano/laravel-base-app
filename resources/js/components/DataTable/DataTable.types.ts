import { Pagination } from "@/types";
import { ColDef, ColGroupDef } from "ag-grid-community";


export type DataTableProps<T extends object = object> = {
  data: T[];
  route: string;
  pagination: Pagination;
  onEdit?: (rowData: T) => void;
  onDelete?: (rowData: T) => void;
  onInfo?: (rowData: T) => void;
}

export type DataTableColDef = ColDef | ColGroupDef;
