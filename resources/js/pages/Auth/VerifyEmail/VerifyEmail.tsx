import { router } from "@inertiajs/react";
import { Button } from "neus-ui";
import { useTranslation } from "react-i18next";
import "./VerifyEmail.styles.css";

import { useToast } from "@/hooks/useToast";

const VerifyEmail = () => {
  const { t } = useTranslation("auth");

  const handleResendVerification = () => {
    router.post(
      "/email/verification-notification",
      {},
      {
        onSuccess: () => {
          useToast({
            type: "success",
            message: t("verification_link_sent"),
          });
        },
        onError: () => {
          useToast({
            type: "error",
            message: t("verification_link_error"),
          });
        },
      },
    );
  };

  const handleLogout = () => {
    router.post("/logout");
  };

  return (
    <section className="verify-email">
      <div className="container">
        <h1 className="title">{t("verify_email_title")}</h1>
        <p className="description">{t("verify_email_description")}</p>

        <Button
          type="submit"
          label={t("resend_verification")}
          onClick={handleResendVerification}
          variant="solid"
        />
        <Button
          label={t("logout") || "Log Out"}
          onClick={handleLogout}
          color="primary"
        />
      </div>
    </section>
  );
};

export default VerifyEmail;
