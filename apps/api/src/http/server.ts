import {
  createServer,
  type IncomingMessage,
  type Server,
  type ServerResponse,
} from "node:http";
import { greet } from "../application/greet.ts";
import { InvalidNameError } from "../domain/name.ts";

const BODY_LIMIT = 4096;

export function createAppServer(): Server {
  return createServer((request, response) => {
    void handle(request, response);
  });
}

export function listen(server: Server, port = 0): Promise<number> {
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => {
      const address = server.address();
      if (address && typeof address === "object") {
        resolve(address.port);
        return;
      }
      reject(new Error("Server did not bind to a TCP port"));
    });
  });
}

async function handle(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  try {
    const url = new URL(request.url ?? "/", "http://127.0.0.1");
    if (url.pathname === "/health") {
      if (request.method !== "GET") {
        sendJson(response, 405, { code: "METHOD_NOT_ALLOWED" });
        return;
      }
      sendJson(response, 200, { status: "ok" });
      return;
    }

    if (url.pathname === "/api/greetings") {
      if (request.method !== "POST") {
        sendJson(response, 405, { code: "METHOD_NOT_ALLOWED" });
        return;
      }
      await handleGreeting(request, response);
      return;
    }

    sendJson(response, 404, { code: "NOT_FOUND" });
  } catch (error) {
    console.error(error);
    if (!response.headersSent) {
      sendJson(response, 500, { code: "UNEXPECTED" });
    }
  }
}

async function handleGreeting(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  const contentType = request.headers["content-type"] ?? "";
  if (!contentType.startsWith("application/json")) {
    sendJson(response, 400, { code: "INVALID_JSON" });
    return;
  }

  const raw = await readBody(request);
  if (raw === undefined) {
    sendJson(response, 413, { code: "PAYLOAD_TOO_LARGE" });
    return;
  }

  const name = readName(raw);
  if (name === undefined) {
    sendJson(response, 400, { code: "INVALID_JSON" });
    return;
  }

  try {
    sendJson(response, 200, greet(name));
  } catch (error) {
    if (error instanceof InvalidNameError) {
      sendJson(response, 400, { code: error.code });
      return;
    }
    throw error;
  }
}

function readName(raw: string): string | undefined {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return undefined;
  }
  if (typeof parsed !== "object" || parsed === null || !("name" in parsed)) {
    return undefined;
  }
  const name = parsed.name;
  return typeof name === "string" ? name : undefined;
}

function readBody(request: IncomingMessage): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    let settled = false;

    const finish = (value: string | undefined) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };

    request.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > BODY_LIMIT) {
        request.pause();
        finish(undefined);
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => {
      finish(Buffer.concat(chunks).toString("utf8"));
    });
    request.on("error", (error) => {
      if (settled) return;
      settled = true;
      reject(error);
    });
  });
}

function sendJson(
  response: ServerResponse,
  status: number,
  body: unknown,
): void {
  const payload = JSON.stringify(body);
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(payload),
  });
  response.end(payload);
}
