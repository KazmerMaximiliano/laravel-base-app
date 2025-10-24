import { Button, Input } from "@/components";
import { Form } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import "./Register.styles.css";

const Register = () => {
  const { t } = useTranslation("auth");

  return (
    <section className="register">
      <div className="container">
        <div className="left-panel" />
        <div className="right-panel">
          <Form action="/register" method="post" className="form">
            {({ errors }) => (
              <>
                <h1 className="title">{t("register_title")}</h1>
                <h2 className="description">{t("register_description")}</h2>
                <Input
                  name="email"
                  placeholder={t("email_placeholder")}
                  error={errors["email"]}
                />
                <Input
                  name="password"
                  placeholder={t("password_placeholder")}
                  error={errors["password"]}
                />
                <Input
                  name="password"
                  placeholder={t("password_placeholder")}
                  error={errors["password"]}
                />
                <Button submit label={t("register_button")} type="solid" />
                <p className="register-link">
                  {t("already_have_account")}
                  <span>
                    <a href="/login">{t("login_here")}</a>
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

export default Register;
