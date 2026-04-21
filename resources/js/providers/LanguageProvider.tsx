import { useColors } from "neus-ui";
import React from "react";
import { HashLoader } from "react-spinners";
import { useLanguageSync } from "../hooks/useLanguageSync";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isReady } = useLanguageSync();
  const colors = useColors();

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
        <HashLoader color={colors.primary.main} />
      </div>
    );
  }

  return <>{children}</>;
};
