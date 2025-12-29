import { Button, Input } from "@/components";
import { Form } from "@inertiajs/react";
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
                  submit
                  label={t("login_button")}
                  type="solid"
                  loading={processing}
                />
                <p className="login-link">
                  {t("forgot_password")}
                  <span>
                    <a href="/forgot-password">{t("reset_here")}</a>
                  </span>
                </p>
                <p className="login-link">
                  {t("dont_have_account")}
                  <span>
                    <a href="/register">{t("signup_here")}</a>
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
