import { DataTable, IconButton, Link } from "@/components";
import { useResponsive } from "@/hooks/useResponsive";
import { AppTemplate } from "@/templates/AppTemplate/AppTemplate";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import { UsersListProps } from "./UsersList.types";

const UsersList = ({ users, pagination }: UsersListProps) => {
  const { t } = useTranslation("users");
  const { isMobile } = useResponsive();

  console.log(pagination);

  return (
    <AppTemplate>
      <div className="page-header">
        <h1 className="page-title">{t("usersListTitle")}</h1>
        {isMobile ? (
          <IconButton icon={FaPlus} onClick={() => {}} />
        ) : (
          <Link type="primary" label={t("createUser")} />
        )}
      </div>
      <DataTable data={users} pagination={pagination} route="/users" />
    </AppTemplate>
  );
};

export default UsersList;
