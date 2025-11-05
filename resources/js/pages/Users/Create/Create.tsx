import { Button, Input, Select } from "@/components";
import { AppTemplate } from "@/templates/AppTemplate/AppTemplate";
import { Form } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import { UsersCreateProps } from "./Create.types";

const UsersCreate = ({ roles }: UsersCreateProps) => {
  const { t } = useTranslation("users");

  const rolesOptions = roles.map((role) => ({
    value: role.name,
    label: role.name,
  }));

  return (
    <AppTemplate>
      <h1 className="page-title">{t("create_user")}</h1>
      <Form action="/users" method="post" className="form">
        {({ errors, processing }) => (
          <>
            <Input
              name="name"
              type="text"
              placeholder={t("name_placeholder")}
              error={errors["name"]}
            />
            <Input
              name="email"
              type="email"
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
              placeholder={t("select_role_placeholder")}
              options={rolesOptions}
              error={errors["role"]}
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

export default UsersCreate;
