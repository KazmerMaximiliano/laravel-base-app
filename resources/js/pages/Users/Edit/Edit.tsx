import MainTemplate from "@/templates/MainTemplate/MainTemplate";
import { Form } from "@inertiajs/react";
import { FormTemplate, Input, Select } from "neus-ui";
import { useTranslation } from "react-i18next";
import { UsersEditProps } from "./Edit.types";

const UsersEdit = ({ user, roles }: UsersEditProps) => {
  const { t } = useTranslation("users");

  const rolesOptions = roles.map((role) => ({
    value: role.name,
    label: role.name,
  }));

  return (
    <MainTemplate>
      <h1 className="page-title">{t("edit_user")}</h1>
      <Form action={`/users/${user.id}`} method="put">
        {({ errors, processing }) => (
          <FormTemplate submitLabel={t("edit_button")} loading={processing}>
            <Input
              name="name"
              type="text"
              label={t("name_label")}
              defaultValue={user.name}
              placeholder={t("name_placeholder")}
              error={errors["name"]}
            />
            <Input
              name="email"
              type="email"
              label={t("email_label")}
              defaultValue={user.email}
              placeholder={t("email_placeholder")}
              error={errors["email"]}
            />
            <Input
              name="password"
              type="password"
              label={t("password_label")}
              placeholder={t("password_placeholder")}
              error={errors["password"]}
            />
            <Input
              name="password_confirmation"
              type="password"
              label={t("password_confirmation_label")}
              placeholder={t("password_confirmation_placeholder")}
              error={errors["password_confirmation"]}
            />
            <Select
              name="role"
              label={t("role_label")}
              defaultValue={user.role}
              placeholder={t("select_role_placeholder")}
              options={rolesOptions}
              error={errors["role"]}
            />
          </FormTemplate>
        )}
      </Form>
    </MainTemplate>
  );
};

export default UsersEdit;
