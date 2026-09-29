import type { Server } from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import { createAppServer, listen } from "./server.ts";

const servers: Server[] = [];

afterEach(async () => {
  await Promise.all(servers.splice(0).map(closeServer));
});

describe("HTTP", () => {
  it("reports health", async () => {
    const baseUrl = await start();
    const response = await fetch(`${baseUrl}/health`);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: "ok" });
  });

  it("returns the normalized name", async () => {
    const baseUrl = await start();
    const response = await postGreeting(baseUrl, { name: "  Ada  " });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ name: "Ada" });
  });

  it("rejects a blank name", async () => {
    const baseUrl = await start();
    const response = await postGreeting(baseUrl, { name: "   " });

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ code: "GREETING_NAME_REQUIRED" });
  });

  it("rejects a name longer than 40 characters", async () => {
    const baseUrl = await start();
    const response = await postGreeting(baseUrl, { name: "a".repeat(41) });

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ code: "GREETING_NAME_TOO_LONG" });
  });

  it("rejects invalid JSON", async () => {
    const baseUrl = await start();
    const response = await fetch(`${baseUrl}/api/greetings`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{",
    });

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ code: "INVALID_JSON" });
  });

  it("rejects a non-string name", async () => {
    const baseUrl = await start();
    const response = await postGreeting(baseUrl, { name: 1 });

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ code: "INVALID_JSON" });
  });

  it("rejects an oversized body", async () => {
    const baseUrl = await start();
    const response = await fetch(`${baseUrl}/api/greetings`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "a".repeat(5000) }),
    });

    expect(response.status).toBe(413);
    expect(await response.json()).toEqual({ code: "PAYLOAD_TOO_LARGE" });
  });

  it("rejects an unknown path", async () => {
    const baseUrl = await start();
    const response = await fetch(`${baseUrl}/missing`);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ code: "NOT_FOUND" });
  });

  it("rejects the wrong method on a known path", async () => {
    const baseUrl = await start();
    const response = await fetch(`${baseUrl}/health`, { method: "POST" });

    expect(response.status).toBe(405);
    expect(await response.json()).toEqual({ code: "METHOD_NOT_ALLOWED" });
  });
});

async function start(): Promise<string> {
  const server = createAppServer();
  servers.push(server);
  const port = await listen(server);
  return `http://127.0.0.1:${port}`;
}

function postGreeting(baseUrl: string, body: unknown): Promise<Response> {
  return fetch(`${baseUrl}/api/greetings`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function closeServer(server: Server): Promise<void> {
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
