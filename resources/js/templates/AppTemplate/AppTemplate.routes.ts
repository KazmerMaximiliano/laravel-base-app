import { SidebarItem } from "@/components/Sidebar/Sidebar.types";
import useAuthStore from "@/store/auth/auth.store";
import { canAccess } from "@/utils/canAcess";
import { isActiveRoute } from "@/utils/isActiveRoute";
import { router, usePage } from "@inertiajs/react";
import { FaUser } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { PiTrafficConeFill } from "react-icons/pi";

export const useAppTemplateRoutes = (): SidebarItem[] => {
  const { url } = usePage();
  const { user } = useAuthStore();

  return [
    {
      label: 'dashboard',
      icon: FaHouse,
      onClick: () => router.get('/dashboard'),
      active: isActiveRoute({ url, route: '/dashboard' }),
      visible: true,
    },
    {
      label: 'users',
      icon: FaUser,
      onClick: () => router.get('/users'),
      active: isActiveRoute({ url, route: '/users' }),
      visible: canAccess({ user: user!, permission: 'get_users' }),
    },
    {
      label: 'roles',
      icon: PiTrafficConeFill,
      onClick: () => router.get('/roles'),
      active: isActiveRoute({ url, route: '/roles' }),
      visible: canAccess({ user: user!, permission: 'get_roles' }),
    },
  ];
};
