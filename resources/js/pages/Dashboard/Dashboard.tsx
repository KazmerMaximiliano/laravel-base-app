import useAuthStore from "@/store/auth/auth.store";
import { AppTemplate } from "@/templates/AppTemplate/AppTemplate";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DashboardProps } from "./Dashboard.types";

const Dashboard = ({ user }: DashboardProps) => {
  const { t } = useTranslation("welcome");
  const { setUser } = useAuthStore();

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return (
    <AppTemplate>
      <div style={{ margin: "auto" }}>
        <h1>{t("title", { name: user.name })}</h1>
      </div>
    </AppTemplate>
  );
};

export default Dashboard;
