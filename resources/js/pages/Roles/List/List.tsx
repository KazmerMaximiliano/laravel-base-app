import { useToast } from "@/hooks/useToast";

import MainTemplate from "@/templates/MainTemplate/MainTemplate";
import { router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { DataTable, IconButton, Link, Modal, useResponsive } from "neus-ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
    <MainTemplate>
      <div className="page-header">
        <h1 className="page-title">{t("roles_list_title")}</h1>
        {isMobile ? (
          <IconButton icon={Plus} onClick={handleCreateRole} />
        ) : (
          <Link type="primary" label={t("create_role")} href="/roles/create" />
        )}
      </div>
      <DataTable
        data={roles}
        columnLabels={{
          id: t("id"),
          name: t("name"),
          permissions: t("permissions"),
        }}
        pagination={pagination}
        onPaginationChange={(params) => {
          router.get("/roles", {
            currentPage: params.currentPage,
            pageSize: params.pageSize,
          });
        }}
        noDataTitle={t("noRowsToShow")}
        noDataDescription={t("noRowsDescription")}
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
        confirmButtonColor="error"
      >
        {roleToDelete && (
          <p>
            {t("confirmDeleteMessage", {
              name: roleToDelete.name || "este rol",
            })}
          </p>
        )}
      </Modal>
    </MainTemplate>
  );
};

export default RolesList;
