import { fireEvent, render } from "@solidjs/testing-library";
import { I18nextProvider } from "solid-i18next";
import { describe, expect, it, vi } from "vitest";
import { i18n, initI18n } from "../../../shared/lib/i18n/index.ts";
import { GreetingRequestError } from "../api/greet.ts";
import { GreetingForm } from "./GreetingForm.tsx";

await initI18n();

describe("GreetingForm", () => {
  it("renders the default English copy", () => {
    const view = renderForm();

    expect(view.getByRole("heading", { name: "Say hello" })).toBeTruthy();
    expect(view.getByLabelText("Name")).toBeTruthy();
    expect(view.getByPlaceholderText("Ada")).toBeTruthy();
    expect(view.getByRole("button", { name: "Greet" })).toBeTruthy();
  });

  it("shows the translated greeting for the returned name", async () => {
    const request = vi.fn().mockResolvedValue({ name: "Ada" });
    const view = renderForm(request);

    fireEvent.input(view.getByLabelText("Name"), { target: { value: "Ada" } });
    fireEvent.click(view.getByRole("button", { name: "Greet" }));

    expect(await view.findByText("Hello, Ada.")).toBeTruthy();
    expect(request).toHaveBeenCalledWith("Ada");
  });

  it("renders a name as text", async () => {
    const request = vi.fn().mockResolvedValue({ name: "<b>Ada</b>" });
    const view = renderForm(request);

    fireEvent.input(view.getByLabelText("Name"), {
      target: { value: "<b>Ada</b>" },
    });
    fireEvent.click(view.getByRole("button", { name: "Greet" }));

    const status = await view.findByText("Hello, <b>Ada</b>.");
    expect(status.querySelector("b")).toBeNull();
  });

  it("shows the required-name copy when the name is blank", async () => {
    const request = vi
      .fn()
      .mockRejectedValue(new GreetingRequestError("GREETING_NAME_REQUIRED"));
    const view = renderForm(request);

    fireEvent.click(view.getByRole("button", { name: "Greet" }));

    expect((await view.findByRole("alert")).textContent).toBe("Enter a name.");
  });

  it("shows the length copy when the name is too long", async () => {
    const request = vi
      .fn()
      .mockRejectedValue(new GreetingRequestError("GREETING_NAME_TOO_LONG"));
    const view = renderForm(request);

    fireEvent.click(view.getByRole("button", { name: "Greet" }));

    expect((await view.findByRole("alert")).textContent).toBe(
      "Use at most 40 characters.",
    );
  });
});

function renderForm(request?: (name: string) => Promise<{ name: string }>) {
  return render(() => (
    <I18nextProvider i18n={i18n}>
      {request ? <GreetingForm request={request} /> : <GreetingForm />}
    </I18nextProvider>
  ));
}
