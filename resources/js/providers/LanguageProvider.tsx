import React from "react";
import { HashLoader } from "react-spinners";
import { useLanguageSync } from "../hooks/useLanguageSync";
import { colorAliases } from "../styles/colors";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isReady } = useLanguageSync();

  if (!isReady) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <HashLoader color={colorAliases.primaryColor} />
      </div>
    );
  }

  return <>{children}</>;
};
