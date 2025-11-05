import { Button, Input, MultiSelect } from "@/components";
import { AppTemplate } from "@/templates/AppTemplate/AppTemplate";
import { Form } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { RolesCreateProps } from "./Create.types";

const RolesCreate = ({ permissions }: RolesCreateProps) => {
  const { t } = useTranslation("roles");

  const permissionsOptions = permissions.map((permission) => ({
    value: permission.name,
    label: permission.name,
  }));

  return (
    <AppTemplate>
      <h1 className="page-title">{t("create_role")}</h1>
      <Form action="/roles" method="post" className="form">
        {({ errors, processing }) => (
          <>
            <Input
              name="name"
              type="text"
              placeholder={t("name_placeholder")}
              error={errors["name"]}
            />
            <MultiSelect
              name="permissions"
              placeholder={t("select_permissions_placeholder")}
              options={permissionsOptions}
              error={errors["permissions"]}
            />
            <Button
              submit
              label={t("create_button")}
              type="solid"
              loading={processing}
            />
          </>
        )}
      </Form>
    </AppTemplate>
  );
};

export default RolesCreate;
