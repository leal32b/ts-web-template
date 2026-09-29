import { createAppServer, listen } from "@app/api";
import { fireEvent, render } from "@solidjs/testing-library";
import { I18nextProvider } from "solid-i18next";
import { afterEach, describe, expect, it } from "vitest";
import { i18n } from "../../../shared/lib/i18n/index.ts";
import { requestGreeting } from "../api/greet.ts";
import { GreetingForm } from "./GreetingForm.tsx";

const servers: ReturnType<typeof createAppServer>[] = [];

afterEach(async () => {
  await Promise.all(servers.splice(0).map(closeServer));
});

describe("greeting tracer", () => {
  it("renders the translated greeting from the API", async () => {
    const baseUrl = await start();
    const view = renderGreeting(baseUrl);

    fireEvent.input(view.getByLabelText("Name"), {
      target: { value: "  Ada  " },
    });
    fireEvent.click(view.getByRole("button", { name: "Greet" }));

    expect(await view.findByText("Hello, Ada.")).toBeTruthy();
  });

  it("renders the required-name copy from the API", async () => {
    const baseUrl = await start();
    const view = renderGreeting(baseUrl);

    fireEvent.click(view.getByRole("button", { name: "Greet" }));

    expect((await view.findByRole("alert")).textContent).toBe("Enter a name.");
  });
});

function renderGreeting(baseUrl: string) {
  return render(() => (
    <I18nextProvider i18n={i18n}>
      <GreetingForm request={(name) => requestGreeting(name, baseUrl)} />
    </I18nextProvider>
  ));
}

async function start(): Promise<string> {
  const server = createAppServer();
  servers.push(server);
  const port = await listen(server);
  return `http://127.0.0.1:${port}`;
}

function closeServer(
  server: ReturnType<typeof createAppServer>,
): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}
