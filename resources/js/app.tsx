import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { LanguageProvider } from "./providers/LanguageProvider";
import { ToastProvider } from "./providers/ToastProvider";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

ModuleRegistry.registerModules([AllCommunityModule]);

createInertiaApp({
  title: () => appName,
  resolve: (name) => {
    const folderStructurePages = import.meta.glob("./pages/**/**.tsx", {
      eager: true,
    });
    const folderPath = `./pages/${name}/${name.split("/").pop()}.tsx`;

    if (folderStructurePages[folderPath]) {
      return folderStructurePages[folderPath];
    }

    return resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob("./pages/**/*.tsx"),
    );
  },
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <I18nextProvider i18n={i18n}>
        <ToastProvider>
          <LanguageProvider>
            <App {...props} />
          </LanguageProvider>
        </ToastProvider>
      </I18nextProvider>,
    );
  },
});
