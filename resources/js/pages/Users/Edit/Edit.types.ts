type Role = {
  created_at: string;
  guard_name: string;
  id: number;
  name: string;
  updated_at: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type UsersEditProps = {
  user: User;
  roles: Role[];
};
