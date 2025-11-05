import { useTranslation } from "react-i18next";
import "./NoRowsOverlay.styles.css";

export const NoRowsOverlay = () => {
  const { t } = useTranslation("datatable");

  return (
    <div className="no-rows-overlay">
      <div className="no-rows-content">
        <h3 className="no-rows-title">{t("noRowsToShow")}</h3>
        <p className="no-rows-description">{t("noRowsDescription")}</p>
      </div>
    </div>
  );
};
