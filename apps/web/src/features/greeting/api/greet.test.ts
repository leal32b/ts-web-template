import { afterEach, describe, expect, it, vi } from "vitest";
import { GreetingRequestError, requestGreeting } from "./greet.ts";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("requestGreeting", () => {
  it("posts the name and returns the payload", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ name: "Ada" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(requestGreeting("Ada", "http://api.test")).resolves.toEqual({
      name: "Ada",
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "http://api.test/api/greetings",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ name: "Ada" }),
      }),
    );
  });

  it("throws the error code from the API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ code: "GREETING_NAME_REQUIRED" }),
      }),
    );

    await expect(requestGreeting("")).rejects.toBeInstanceOf(
      GreetingRequestError,
    );
    await expect(requestGreeting("")).rejects.toMatchObject({
      code: "GREETING_NAME_REQUIRED",
    });
  });
});
