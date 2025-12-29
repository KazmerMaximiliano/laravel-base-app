import { Pagination } from "@/types";

export interface Role {
  id: number;
  name: string;
  guard_name: string;
  permissions: string[];
  created_at: string;
  updated_at: string;
}

export interface Permission {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
}

export type RolesListProps = {
  roles: Role[];
  pagination: Pagination;
};
