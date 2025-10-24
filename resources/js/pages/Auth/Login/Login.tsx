import { Button, Input } from "@/components";
import { Form } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import "./Login.styles.css";

const Login = () => {
  const { t } = useTranslation("login");

  return (
    <section className="login">
      <div className="container">
        <div className="left-panel" />
        <div className="right-panel">
          <Form action="/login" method="post" className="form">
            {({ errors }) => (
              <>
                <h1 className="title">{t("title")}</h1>
                <h2 className="description">{t("description")}</h2>
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
                <Button submit label={t("login_button")} type="solid" />
              </>
            )}
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Login;
