import { createInertiaApp } from "@inertiajs/react";
import { ComponentType } from "react";
import { createRoot } from "react-dom/client";

interface PageModule {
  default: ComponentType<any>;
}

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.{tsx,jsx}", {
      eager: true,
    }) as Record<string, PageModule>;

    const page = pages[`./Pages/${name}.tsx`] || pages[`./Pages/${name}.jsx`];
    return page?.default;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
