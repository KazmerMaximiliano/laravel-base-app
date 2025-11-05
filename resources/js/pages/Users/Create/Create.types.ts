type Role = {
  created_at: string;
  guard_name: string;
  id: number;
  name: string;
  updated_at: string;
};

export type UsersCreateProps = {
  roles: Role[];
};
