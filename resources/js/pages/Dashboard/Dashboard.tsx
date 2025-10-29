import { Button } from "@/components";
import { router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation("auth");

  const handleLogout = () => {
    router.post("/logout");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        fontWeight: "bold",
      }}
    >
      <h1>Dashboard</h1>

      <Button
        label={t("logout") || "Log Out"}
        onClick={handleLogout}
        type="primary"
      />
    </div>
  );
};

export default Dashboard;
