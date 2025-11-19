import useAuthStore from "@/store/auth/auth.store";
import { router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./UserMenu.styles.css";

export const UserMenu = () => {
  const { t } = useTranslation("auth");
  const menuRef = useRef<HTMLDivElement>(null);

  const [openMenu, setOpenMenu] = useState(false);

  const { user, clearUser } = useAuthStore();

  const handleLogout = () => {
    setOpenMenu(!openMenu);
    clearUser();
    router.post("/logout");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  return (
    <div
      className="user-menu"
      ref={menuRef}
      onClick={() => setOpenMenu(!openMenu)}
    >
      <div className="user-avatar">
        {user?.name.charAt(0).toUpperCase() || "X"}
      </div>
      <div className={`user-caret ${openMenu ? "user-caret--open" : ""}`} />
      {openMenu && (
        <div className="user-menu-dropdown">
          <div className="user-menu-item" onClick={handleLogout}>
            {t("logout")}
          </div>
        </div>
      )}
    </div>
  );
};
