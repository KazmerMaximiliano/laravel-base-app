import { SidebarItem } from "@/components/Sidebar/Sidebar.types";
import useAuthStore from "@/store/auth/auth.store";
import { router, usePage } from "@inertiajs/react";
import { FaUser } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { PiTrafficConeFill } from "react-icons/pi";

export const useAppTemplateRoutes = (): SidebarItem[] => {
  const { url } = usePage();

  const isActiveRoute = (route: string): boolean => {
    const urlWithoutQuery = url.split("?")[0];
    return urlWithoutQuery === route;
  };

  const { user } = useAuthStore();

  return [
    {
      label: 'dashboard',
      icon: FaHouse,
      onClick: () => router.get('/dashboard'),
      active: isActiveRoute('/dashboard'),
      visible: true,
    },
    {
      label: 'users',
      icon: FaUser,
      onClick: () => router.get('/users'),
      active: isActiveRoute('/users'),
      visible: true,
    },
    {
      label: 'roles',
      icon: PiTrafficConeFill,
      onClick: () => router.get('/roles'),
      active: isActiveRoute('/roles'),
      visible: user?.role === 'admin',
    },
  ];
};
