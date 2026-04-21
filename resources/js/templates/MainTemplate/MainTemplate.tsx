import { useRoutes } from "@/hooks/useRoute";
import useAuthStore from "@/store/auth/auth.store";
import { router } from "@inertiajs/react";
import { Menu, User } from "lucide-react";
import { Dropdown, IconButton, Sidebar } from "neus-ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./MainTemplate.styles.css";

const appName = import.meta.env.VITE_APP_NAME || "NEUS UI";

const MainTemplate = ({ children }: { children: React.ReactNode }) => {
  const routes = useRoutes();
  const { t } = useTranslation("auth");
  const { user, clearUser } = useAuthStore();

  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = () => {
    clearUser();
    router.post("/logout");
  };

  return (
    <div className="main-template">
      <div className="main-template__header-container">
        <IconButton icon={Menu} onClick={() => setShowSidebar(!showSidebar)} />
        <Dropdown
          name={user?.name || "User"}
          icon={User}
          items={[
            {
              label: t("logout"),
              onClick: () => {
                handleLogout();
              },
            },
          ]}
        />
      </div>

      <div
        className={`main-template__sidebar-container ${
          showSidebar ? "main-template__sidebar-container--active" : ""
        }`}
      >
        <Sidebar title={appName} items={routes} />
      </div>

      <div className="main-template__content">
        <div className="main-template__content-container">{children}</div>
      </div>
    </div>
  );
};

export default MainTemplate;
