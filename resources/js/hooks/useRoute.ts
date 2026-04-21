
import useAuthStore from "@/store/auth/auth.store";
import { canAccess } from "@/utils/canAcess";
import { isActiveRoute } from "@/utils/isActiveRoute";
import { router, usePage } from "@inertiajs/react";
import { House, TrafficCone, Users } from "lucide-react";
import { SidebarItem } from "node_modules/neus-ui/dist/components/Sidebar/Sidebar.types";
import { useTranslation } from "react-i18next";

export const useRoutes = (): SidebarItem[] => {
  const { t } = useTranslation("routes");
  const { url } = usePage();
  const { user } = useAuthStore();

  return [
    {
      label: t('dashboard'),
      icon: House,
      onClick: () => router.get('/dashboard'),
      active: isActiveRoute({ url, route: '/dashboard' }),
      visible: true,
    },
    {
      label: t('users'),
      icon: Users,
      onClick: () => router.get('/users'),
      active: isActiveRoute({ url, route: '/users' }),
      visible: canAccess({ user: user!, permission: 'get_users' }),
    },
    {
      label: t('roles'),
      icon: TrafficCone,
      onClick: () => router.get('/roles'),
      active: isActiveRoute({ url, route: '/roles' }),
      visible: canAccess({ user: user!, permission: 'get_roles' }),
    },
  ];
};
