import { Form } from "@inertiajs/react";
import { Button, Input } from "neus-ui";
import { useTranslation } from "react-i18next";
import "./Login.styles.css";

const Login = () => {
  const { t } = useTranslation("auth");

  return (
    <section className="login">
      <div className="container">
        <div className="left-panel" />
        <div className="right-panel">
          <Form action="/login" method="post" className="form">
            {({ errors, processing }) => (
              <>
                <h1 className="title">{t("title")}</h1>
                <h2 className="description">{t("description")}</h2>
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
                <Button
                  type="submit"
                  label={t("login_button")}
                  variant="solid"
                  loading={processing}
                />
                <p className="login-link">
                  {t("forgot_password")}
                  <span>
                    <a href="/forgot-password">{t("reset_here")}</a>
                  </span>
                </p>
              </>
            )}
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Login;
