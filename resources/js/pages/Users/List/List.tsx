import { useToast } from "@/hooks/useToast";
import MainTemplate from "@/templates/MainTemplate/MainTemplate";
import { User } from "@/types";
import { router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { DataTable, IconButton, Link, Modal, useResponsive } from "neus-ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { UsersListProps } from "./List.types";

const UsersList = ({ users, pagination }: UsersListProps) => {
  const { t } = useTranslation("users");
  const { isMobile } = useResponsive();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleCreateUser = () => {
    router.get("/users/create");
  };

  const handleEditUser = (rowData: Record<string, unknown>) => {
    const user = rowData as User;
    router.get(`/users/${user.id}/edit`);
  };

  const handleDeleteUser = (rowData: Record<string, unknown>) => {
    const user = rowData as User;
    setUserToDelete(user);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      router.delete(`/users/${userToDelete.id}`, {
        onSuccess: () => {
          useToast({ message: t("userDeleted"), type: "success" });
          setOpenDeleteModal(false);
          setUserToDelete(null);
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
    setUserToDelete(null);
  };

  return (
    <MainTemplate>
      <div className="page-header">
        <h1 className="page-title">{t("users_list_title")}</h1>
        {isMobile ? (
          <IconButton icon={Plus} onClick={handleCreateUser} />
        ) : (
          <Link type="primary" label={t("create_user")} href="/users/create" />
        )}
      </div>
      <DataTable
        data={users}
        columnLabels={{
          id: t("id"),
          name: t("name"),
          email: t("email"),
          role: t("role"),
        }}
        hiddenColumns={["id"]}
        pagination={pagination}
        onPaginationChange={(params) => {
          router.get("/users", {
            currentPage: params.currentPage,
            pageSize: params.pageSize,
          });
        }}
        noDataTitle={t("noRowsToShow")}
        noDataDescription={t("noRowsDescription")}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
      <Modal
        isOpen={openDeleteModal}
        title={t("confirmDeleteTitle")}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText={t("delete")}
        cancelText={t("cancel")}
        confirmButtonColor="error"
      >
        {userToDelete && (
          <p>
            {t("confirmDeleteMessage", {
              name: userToDelete.name || userToDelete.email || "este usuario",
            })}
          </p>
        )}
      </Modal>
    </MainTemplate>
  );
};

export default UsersList;
