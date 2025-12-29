import { Button, Input, MultiSelect } from "@/components";
import { AppTemplate } from "@/templates/AppTemplate/AppTemplate";
import { Form } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { RolesEditProps } from "./Edit.types";

const RolesEdit = ({ role, permissions }: RolesEditProps) => {
  const { t } = useTranslation("roles");

  const permissionsOptions = permissions.map((permission) => ({
    value: permission.name,
    label: permission.name,
  }));

  return (
    <AppTemplate>
      <h1 className="page-title">{t("edit_role")}</h1>
      <Form action={`/roles/${role.id}`} method="put" className="form">
        {({ errors, processing }) => (
          <>
            <Input
              name="name"
              type="text"
              defaultValue={role.name}
              placeholder={t("name_placeholder")}
              error={errors["name"]}
            />
            <MultiSelect
              name="permissions"
              placeholder={t("select_permissions_placeholder")}
              options={permissionsOptions}
              defaultValue={role.permissions}
              error={errors["permissions"]}
            />
            <Button
              submit
              label={t("edit_button")}
              type="solid"
              loading={processing}
            />
          </>
        )}
      </Form>
    </AppTemplate>
  );
};

export default RolesEdit;
