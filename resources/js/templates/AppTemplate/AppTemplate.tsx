import React from "react";

import { Sidebar, UserMenu } from "@/components";
import { useAppTemplateRoutes } from "./AppTemplate.routes";
import "./AppTemplate.styles.css";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

export const AppTemplate: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const routes = useAppTemplateRoutes();

  return (
    <div className="app-template">
      <div className="user-menu-container">
        <UserMenu />
      </div>
      <Sidebar title={appName} items={routes} />

      <div className="content">
        <div className="content-container">{children}</div>
      </div>
    </div>
  );
};
