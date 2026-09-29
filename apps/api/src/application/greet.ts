import { parseName } from "../domain/name.ts";

export function greet(rawName: string): { name: string } {
  return { name: parseName(rawName).value };
}
