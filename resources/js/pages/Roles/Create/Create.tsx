import MainTemplate from "@/templates/MainTemplate/MainTemplate";
import { Form } from "@inertiajs/react";
import { FormTemplate, Input, MultiSelect } from "neus-ui";
import { useTranslation } from "react-i18next";
import { RolesCreateProps } from "./Create.types";

const RolesCreate = ({ permissions }: RolesCreateProps) => {
  const { t } = useTranslation("roles");

  const permissionsOptions = permissions.map((permission) => ({
    value: permission.name,
    label: permission.name,
  }));

  return (
    <MainTemplate>
      <h1 className="page-title">{t("create_role")}</h1>
      <Form action="/roles" method="post">
        {({ errors, processing }) => (
          <FormTemplate submitLabel={t("create_button")} loading={processing}>
            <Input
              name="name"
              type="text"
              label={t("name_label")}
              placeholder={t("name_placeholder")}
              error={errors["name"]}
            />
            <MultiSelect
              name="permissions"
              label={t("permissions_label")}
              placeholder={t("select_permissions_placeholder")}
              options={permissionsOptions}
              error={errors["permissions"]}
            />
          </FormTemplate>
        )}
      </Form>
    </MainTemplate>
  );
};

export default RolesCreate;
