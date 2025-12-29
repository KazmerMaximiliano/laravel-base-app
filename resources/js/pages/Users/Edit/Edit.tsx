import { Button, Input, Select } from "@/components";
import { AppTemplate } from "@/templates/AppTemplate/AppTemplate";
import { Form } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { UsersEditProps } from "./Edit.types";

const UsersEdit = ({ user, roles }: UsersEditProps) => {
  const { t } = useTranslation("users");

  const rolesOptions = roles.map((role) => ({
    value: role.name,
    label: role.name,
  }));

  return (
    <AppTemplate>
      <h1 className="page-title">{t("edit_user")}</h1>
      <Form action={`/users/${user.id}`} method="put" className="form">
        {({ errors, processing }) => (
          <>
            <Input
              name="name"
              type="text"
              defaultValue={user.name}
              placeholder={t("name_placeholder")}
              error={errors["name"]}
            />
            <Input
              name="email"
              type="email"
              defaultValue={user.email}
              placeholder={t("email_placeholder")}
              error={errors["email"]}
            />
            <Input
              name="password"
              type="password"
              placeholder={t("password_placeholder")}
              error={errors["password"]}
            />
            <Input
              name="password_confirmation"
              type="password"
              placeholder={t("password_confirmation_placeholder")}
              error={errors["password_confirmation"]}
            />
            <Select
              name="role"
              defaultValue={user.role}
              placeholder={t("select_role_placeholder")}
              options={rolesOptions}
              error={errors["role"]}
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

export default UsersEdit;
