import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { applyEnv, loadConfig, loadEnvFile } from "./config.ts";

describe("loadConfig", () => {
  it("defaults to port 3001", () => {
    expect(loadConfig({})).toEqual({ port: 3001 });
  });

  it("reads PORT", () => {
    expect(loadConfig({ PORT: "4000" })).toEqual({ port: 4000 });
  });

  it("rejects a port outside 1-65535", () => {
    expect(() => loadConfig({ PORT: "0" })).toThrow(/PORT/);
    expect(() => loadConfig({ PORT: "abc" })).toThrow(/PORT/);
    expect(() => loadConfig({ PORT: "65536" })).toThrow(/PORT/);
  });
});

describe("applyEnv", () => {
  it("sets missing variables and keeps existing ones", () => {
    const env: NodeJS.ProcessEnv = { PORT: "1" };
    applyEnv("PORT=9\n# comment\n\nAPI_NAME=greeting\n", env);
    expect(env).toEqual({ PORT: "1", API_NAME: "greeting" });
  });

  it("ignores a missing env file", () => {
    const env: NodeJS.ProcessEnv = {};
    loadEnvFile("/does/not/exist.env", env);
    expect(env).toEqual({});
  });

  it("reads variables from a file", () => {
    const directory = mkdtempSync(join(tmpdir(), "api-env-"));
    const file = join(directory, ".env");
    writeFileSync(file, "PORT=4040\n");
    const env: NodeJS.ProcessEnv = {};
    try {
      loadEnvFile(file, env);
    } finally {
      rmSync(directory, { recursive: true });
    }
    expect(env.PORT).toBe("4040");
  });
});
