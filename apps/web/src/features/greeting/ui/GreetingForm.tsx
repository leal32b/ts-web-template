import type { TFunction } from "i18next";
import { useTranslation } from "solid-i18next";
import { createSignal, Show } from "solid-js";
import { GreetingRequestError, requestGreeting } from "../api/greet.ts";

export function GreetingForm(props: {
  request?: (name: string) => Promise<{ name: string }>;
}) {
  const [t] = useTranslation("greeting");
  const text = (key: string, options?: Record<string, unknown>) =>
    String(t(key, { ...options, ns: "greeting" }));
  const [name, setName] = createSignal("");
  const [result, setResult] = createSignal<string | undefined>();
  const [error, setError] = createSignal<string | undefined>();

  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    setResult(undefined);
    setError(undefined);
    const send = props.request ?? requestGreeting;
    void send(name())
      .then((response) => {
        setResult(text("result", { name: response.name }));
      })
      .catch((caught: unknown) => {
        setError(messageFor(caught, t));
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>{text("title")}</h1>
      <label for="greeting-name">{text("name.label")}</label>
      <input
        id="greeting-name"
        name="name"
        type="text"
        autocomplete="name"
        placeholder={text("name.placeholder")}
        value={name()}
        aria-invalid={Boolean(error())}
        aria-describedby={error() ? "greeting-error" : undefined}
        onInput={(event) => {
          const target = event.currentTarget;
          if (target instanceof HTMLInputElement) {
            setName(target.value);
          }
        }}
      />
      <button type="submit">{text("submit")}</button>
      <Show when={result()}>
        {(message) => <p role="status">{message()}</p>}
      </Show>
      <Show when={error()}>
        {(message) => (
          <p id="greeting-error" role="alert">
            {message()}
          </p>
        )}
      </Show>
    </form>
  );
}

function messageFor(caught: unknown, t: TFunction): string {
  const code =
    caught instanceof GreetingRequestError ? caught.code : "UNEXPECTED";
  if (code === "GREETING_NAME_REQUIRED") {
    return String(t("errors.nameRequired", { ns: "greeting" }));
  }
  if (code === "GREETING_NAME_TOO_LONG") {
    return String(t("errors.nameTooLong", { ns: "greeting" }));
  }
  return String(t("errors.unexpected", { ns: "common" }));
}
