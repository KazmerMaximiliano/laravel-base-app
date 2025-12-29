import { IconType } from "react-icons";

export type SidebarItem = {
  label: string;
  icon?: IconType;
  onClick?: () => void;
  active?: boolean;
  visible?: boolean;
};

export type SidebarProps = {
  items: SidebarItem[];
  title?: string;
};
