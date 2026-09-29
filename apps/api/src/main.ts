import { fileURLToPath } from "node:url";
import { loadConfig, loadEnvFile } from "./config.ts";
import { createAppServer, listen } from "./http/server.ts";

const envPath = fileURLToPath(new URL("../../../.env", import.meta.url));
loadEnvFile(envPath, process.env);

const { port } = loadConfig(process.env);
const server = createAppServer();
await listen(server, port);
console.log(`api listening on ${port}`);
