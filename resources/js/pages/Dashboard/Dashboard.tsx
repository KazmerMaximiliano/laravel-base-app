import useAuthStore from "@/store/auth/auth.store";
import MainTemplate from "@/templates/MainTemplate/MainTemplate";
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
    <MainTemplate>
      <div style={{ margin: "auto" }}>
        <h1>{t("title", { name: user.name })}</h1>
      </div>
    </MainTemplate>
  );
};

export default Dashboard;
