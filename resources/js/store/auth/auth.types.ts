import { User } from "@/types";

export interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}
