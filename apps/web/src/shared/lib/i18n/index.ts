import i18next from "i18next";
import common from "../../locales/en/common.json";
import greeting from "../../locales/en/greeting.json";
import { defaultLocale, fallbackLocale, namespaces } from "./config.ts";

export const i18n = i18next.createInstance();

let started: Promise<unknown> | undefined;

export function initI18n(): Promise<unknown> {
  if (!started) {
    started = i18n.init({
      lng: defaultLocale,
      fallbackLng: fallbackLocale,
      ns: [...namespaces],
      defaultNS: "common",
      resources: {
        en: {
          common,
          greeting,
        },
      },
      interpolation: {
        escapeValue: false,
      },
    });
  }
  return started;
}
