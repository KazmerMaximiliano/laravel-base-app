import { Button, Input } from "@/components";
import { Form } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import "./ResetPassword.styles.css";

interface ResetPasswordProps {
  token: string;
  email?: string;
}

const ResetPassword = ({ token, email }: ResetPasswordProps) => {
  const { t } = useTranslation("auth");

  return (
    <section className="reset-password">
      <div className="container">
        <Form action="/reset-password" method="post" className="form">
          {({ errors, processing }) => (
            <>
              <h1 className="title">{t("reset_password_title")}</h1>
              <h2 className="description">{t("reset_password_description")}</h2>

              <input type="hidden" name="token" value={token} />

              <Input
                name="email"
                type="email"
                placeholder={t("email_placeholder")}
                error={errors["email"]}
                defaultValue={email || ""}
              />

              <Input
                name="password"
                type="password"
                placeholder={t("new_password_placeholder")}
                error={errors["password"]}
              />

              <Input
                name="password_confirmation"
                type="password"
                placeholder={t("confirm_password_placeholder")}
                error={errors["password_confirmation"]}
              />

              <Button
                submit
                label={t("reset_password_button")}
                type="solid"
                loading={processing}
              />

              <p className="login-link">
                {t("remember_password")}
                <span>
                  <a href="/login">{t("login_here")}</a>
                </span>
              </p>
            </>
          )}
        </Form>
      </div>
    </section>
  );
};

export default ResetPassword;
