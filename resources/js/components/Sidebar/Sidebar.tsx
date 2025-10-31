import { useTranslation } from "react-i18next";
import "./Sidebar.styles.css";

import { useResponsive } from "@/hooks/useResponsive";
import { useState } from "react";
import { SidebarProps } from "./Sidebar.types";

export const Sidebar = ({ title, items }: SidebarProps) => {
  const { t } = useTranslation("routes");
  const { isMobile } = useResponsive();

  const [showFullTitle, setShowFullTitle] = useState(false);

  return (
    <div
      className="sidebar"
      onMouseEnter={() => setShowFullTitle(true)}
      onMouseLeave={() => setShowFullTitle(false)}
    >
      <div className="sidebar-header">
        <div className="sidebar-header-fix">
          <div className="sidebar-title">
            {showFullTitle || isMobile ? title : title?.charAt(0)}
          </div>
        </div>
      </div>
      <div className="sidebar-body">
        {items.map((item, index) => (
          <div
            key={index}
            className={`sidebar-button ${item.active ? "active" : ""}`}
            onClick={item.onClick}
          >
            {item.icon && (
              <item.icon size={14} className="sidebar-button-icon" />
            )}
            <div className="sidebar-button-label">{t(item.label)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
