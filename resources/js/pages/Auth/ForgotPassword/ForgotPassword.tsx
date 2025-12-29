import { Button, Input } from "@/components";
import { useToast } from "@/hooks/useToast";
import { Form } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import "./ForgotPassword.styles.css";

const ForgotPassword = () => {
  const { t } = useTranslation("auth");

  return (
    <section className="forgot-password">
      <div className="container">
        <Form
          action="/forgot-password"
          method="post"
          className="form"
          onSuccess={() => {
            useToast({
              type: "success",
              message: t("reset_password_link_sent"),
            });
          }}
        >
          {({ errors, processing }) => (
            <>
              <h1 className="title">{t("forgot_password_title")}</h1>
              <h2 className="description">
                {t("forgot_password_description")}
              </h2>

              <Input
                name="email"
                type="email"
                placeholder={t("email_placeholder")}
                error={errors["email"]}
              />

              <Button
                submit
                label={t("send_reset_link")}
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

export default ForgotPassword;
