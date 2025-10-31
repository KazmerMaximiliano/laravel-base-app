import { Pagination } from "@/types/common";

export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
}

export type UsersListProps = {
  users: User[];
  pagination: Pagination;
}
