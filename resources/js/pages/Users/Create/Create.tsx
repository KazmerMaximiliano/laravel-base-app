import MainTemplate from "@/templates/MainTemplate/MainTemplate";
import { Form } from "@inertiajs/react";
import { FormTemplate, Input, Select } from "neus-ui";
import { useTranslation } from "react-i18next";
import { UsersCreateProps } from "./Create.types";

const UsersCreate = ({ roles }: UsersCreateProps) => {
  const { t } = useTranslation("users");

  const rolesOptions = roles.map((role) => ({
    value: role.name,
    label: role.name,
  }));

  return (
    <MainTemplate>
      <h1 className="page-title">{t("create_user")}</h1>
      <Form action="/users" method="post">
        {({ errors, processing }) => (
          <FormTemplate submitLabel={t("create_button")} loading={processing}>
            <Input
              name="name"
              type="text"
              label={t("name_label")}
              placeholder={t("name_placeholder")}
              error={errors["name"]}
            />
            <Input
              name="email"
              type="email"
              label={t("email_label")}
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

export default UsersCreate;
