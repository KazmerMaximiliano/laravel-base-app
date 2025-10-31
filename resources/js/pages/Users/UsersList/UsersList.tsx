import { DataTable, Link } from "@/components";
import { AppTemplate } from "@/templates/AppTemplate/AppTemplate";
import { useTranslation } from "react-i18next";
import { UsersListProps } from "./UsersList.types";

const UsersList = ({ users, pagination }: UsersListProps) => {
  const { t } = useTranslation("users");

  return (
    <AppTemplate>
      <div className="page-header">
        <h1 className="page-title">{t("usersListTitle")}</h1>
        <Link type="primary" label={t("createUser")} />
      </div>
      <DataTable
        data={users}
        currentPage={pagination.current_page}
        pageSize={pagination.per_page}
        paginationRoute="/users"
        total={pagination.total}
      />
    </AppTemplate>
  );
};

export default UsersList;
