import useAuthStore from "@/store/auth/auth.store";
import { AppTemplate } from "@/templates/AppTemplate/AppTemplate";
import { useEffect } from "react";
import { DashboardProps } from "./Dashboard.types";

const Dashboard = ({ user }: DashboardProps) => {
  const { setUser } = useAuthStore();

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return (
    <AppTemplate>
      <div style={{ margin: "auto" }}>
        <h1>Dashboard</h1>
      </div>
    </AppTemplate>
  );
};

export default Dashboard;
