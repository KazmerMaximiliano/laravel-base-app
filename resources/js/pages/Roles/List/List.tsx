import { DataTable, IconButton, Link, Modal } from "@/components";
import { useResponsive } from "@/hooks/useResponsive";
import { useToast } from "@/hooks/useToast";
import { AppTemplate } from "@/templates/AppTemplate/AppTemplate";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import { Role, RolesListProps } from "./List.types";

const RolesList = ({ roles, pagination }: RolesListProps) => {
  const { t } = useTranslation("roles");
  const { isMobile } = useResponsive();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const handleCreateRole = () => {
    router.get("/roles/create");
  };

  const handleEditRole = (rowData: Role) => {
    router.get(`/roles/${rowData.id}/edit`);
  };

  const handleDeleteRole = (rowData: Role) => {
    setRoleToDelete(rowData);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (roleToDelete) {
      router.delete(`/roles/${roleToDelete.id}`, {
        onSuccess: () => {
          useToast({ message: t("roleDeleted"), type: "success" });
          setOpenDeleteModal(false);
          setRoleToDelete(null);
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
    setRoleToDelete(null);
  };

  return (
    <AppTemplate>
      <div className="page-header">
        <h1 className="page-title">{t("roles_list_title")}</h1>
        {isMobile ? (
          <IconButton icon={FaPlus} onClick={handleCreateRole} />
        ) : (
          <Link type="primary" label={t("create_role")} href="/roles/create" />
        )}
      </div>
      <DataTable
        data={roles}
        pagination={pagination}
        route="/roles"
        onEdit={handleEditRole}
        onDelete={handleDeleteRole}
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
        {roleToDelete && (
          <p>
            {t("confirmDeleteMessage", {
              name: roleToDelete.name || "este rol",
            })}
          </p>
        )}
      </Modal>
    </AppTemplate>
  );
};

export default RolesList;
