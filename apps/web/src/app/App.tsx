import { I18nextProvider, useTranslation } from "solid-i18next";
import { createEffect } from "solid-js";
import { HomePage } from "../pages/home/index.ts";
import { i18n } from "../shared/lib/i18n/index.ts";

export function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <DocumentTitle />
      <HomePage />
    </I18nextProvider>
  );
}

function DocumentTitle() {
  const [t] = useTranslation("common");
  createEffect(() => {
    document.title = String(t("app.title", { ns: "common" }));
  });
  return null;
}
