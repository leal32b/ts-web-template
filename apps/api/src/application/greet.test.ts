import { describe, expect, it } from "vitest";
import { InvalidNameError } from "../domain/name.ts";
import { greet } from "./greet.ts";

describe("greet", () => {
  it("returns the normalized name", () => {
    expect(greet("  Ada  ")).toEqual({ name: "Ada" });
  });

  it("rejects a blank name", () => {
    expect(() => greet(" ")).toThrow(InvalidNameError);
  });
});
