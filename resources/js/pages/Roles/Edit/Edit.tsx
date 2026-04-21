import MainTemplate from "@/templates/MainTemplate/MainTemplate";
import { Form } from "@inertiajs/react";
import { FormTemplate, Input, MultiSelect } from "neus-ui";
import { useTranslation } from "react-i18next";
import { RolesEditProps } from "./Edit.types";

const RolesEdit = ({ role, permissions }: RolesEditProps) => {
  const { t } = useTranslation("roles");

  const permissionsOptions = permissions.map((permission) => ({
    value: permission.name,
    label: permission.name,
  }));

  return (
    <MainTemplate>
      <h1 className="page-title">{t("edit_role")}</h1>
      <Form action={`/roles/${role.id}`} method="put">
        {({ errors, processing }) => (
          <FormTemplate submitLabel={t("edit_button")} loading={processing}>
            <Input
              name="name"
              type="text"
              label={t("name_label")}
              defaultValue={role.name}
              placeholder={t("name_placeholder")}
              error={errors["name"]}
            />
            <MultiSelect
              name="permissions"
              label={t("permissions_label")}
              placeholder={t("select_permissions_placeholder")}
              options={permissionsOptions}
              defaultValue={role.permissions}
              error={errors["permissions"]}
            />
          </FormTemplate>
        )}
      </Form>
    </MainTemplate>
  );
};

export default RolesEdit;
