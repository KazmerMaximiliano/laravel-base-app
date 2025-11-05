import { DataTable, IconButton, Link, Modal } from "@/components";
import { useResponsive } from "@/hooks/useResponsive";
import { useToast } from "@/hooks/useToast";
import { AppTemplate } from "@/templates/AppTemplate/AppTemplate";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import { User, UsersListProps } from "./List.types";

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
    <AppTemplate>
      <div className="page-header">
        <h1 className="page-title">{t("users_list_title")}</h1>
        {isMobile ? (
          <IconButton icon={FaPlus} onClick={handleCreateUser} />
        ) : (
          <Link type="primary" label={t("create_user")} href="/users/create" />
        )}
      </div>
      <DataTable
        data={[]}
        pagination={pagination}
        route="/users"
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
        confirmButtonType="danger"
      >
        {userToDelete && (
          <p>
            {t("confirmDeleteMessage", {
              name: userToDelete.name || userToDelete.email || "este usuario",
            })}
          </p>
        )}
      </Modal>
    </AppTemplate>
  );
};

export default UsersList;
