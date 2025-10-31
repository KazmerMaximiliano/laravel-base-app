import { IconType } from "react-icons";

export type SidebarItem = {
  label: string;
  icon?: IconType;
  onClick?: () => void;
  active?: boolean;
};

export type SidebarProps = {
  title?: string;
  items: SidebarItem[];
};
