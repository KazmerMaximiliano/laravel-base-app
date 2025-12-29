import { User } from "@/types";

export const canAccess = ({ user, permission }: { user?: User, permission: string }): boolean => {
  if (!user || !user.permissions) {
    return false;
  }
  return user.permissions.includes(permission);
};
