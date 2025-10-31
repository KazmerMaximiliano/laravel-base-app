import React, { useState } from "react";

import { IconButton, Sidebar, UserMenu } from "@/components";
import { useResponsive } from "@/hooks/useResponsive";
import { FaBars } from "react-icons/fa";
import { useAppTemplateRoutes } from "./AppTemplate.routes";
import "./AppTemplate.styles.css";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

export const AppTemplate: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const routes = useAppTemplateRoutes();
  const { isMobile } = useResponsive();

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="app-template">
      <div className="user-menu-container">
        <UserMenu />
      </div>

      <div className="sidebar-button-container">
        <IconButton
          icon={FaBars}
          onClick={() => setShowSidebar(!showSidebar)}
        />
      </div>

      <div
        className={`sidebar-container ${showSidebar ? "sidebar-container--active" : ""}`}
      >
        <Sidebar title={appName} items={routes} />
      </div>

      <div className="content">
        <div className="content-container">{children}</div>
      </div>
    </div>
  );
};
