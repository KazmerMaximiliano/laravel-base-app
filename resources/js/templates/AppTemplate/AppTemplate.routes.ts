import { SidebarItem } from "@/components/Sidebar/Sidebar.types";
import { router, usePage } from "@inertiajs/react";
import { FaUser } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { PiTrafficConeFill } from "react-icons/pi";

export const useAppTemplateRoutes = (): SidebarItem[] => {
  const { url } = usePage();

  const isActiveRoute = (route: string): boolean => {
    return url === route;
  };

  return [
    {
      label: 'dashboard',
      icon: FaHouse,
      onClick: () => router.get('/dashboard'),
      active: isActiveRoute('/dashboard'),
    },
    {
      label: 'users',
      icon: FaUser,
      onClick: () => router.get('/users'),
      active: isActiveRoute('/users'),
    },
    {
      label: 'roles',
      icon: PiTrafficConeFill,
      onClick: () => router.get('/roles'),
      active: isActiveRoute('/roles'),
    },
  ];
};
