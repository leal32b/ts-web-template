import { existsSync, readFileSync } from "node:fs";

export type Config = {
  port: number;
};

export function loadConfig(env: NodeJS.ProcessEnv): Config {
  const raw = env.PORT ?? "3001";
  const port = Number(raw);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid PORT: ${raw}`);
  }
  return { port };
}

export function applyEnv(contents: string, env: NodeJS.ProcessEnv): void {
  for (const line of contents.split("\n")) {
    const trimmed = line.trim();
    if (trimmed === "" || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator <= 0) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    if (env[key] !== undefined) continue;
    env[key] = value;
  }
}

export function loadEnvFile(filePath: string, env: NodeJS.ProcessEnv): void {
  if (!existsSync(filePath)) return;
  applyEnv(readFileSync(filePath, "utf8"), env);
}
