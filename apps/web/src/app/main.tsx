import { render } from "solid-js/web";
import { initI18n } from "../shared/lib/i18n/index.ts";
import { App } from "./App.tsx";
import "./app.css";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element #root is missing");
}

await initI18n();
render(() => <App />, root);
