import { describe, expect, it } from "vitest";
import { InvalidNameError, parseName } from "./name.ts";

describe("parseName", () => {
  it("trims surrounding whitespace", () => {
    expect(parseName("  Ada  ")).toEqual({ value: "Ada" });
  });

  it("accepts 40 characters", () => {
    const value = "a".repeat(40);
    expect(parseName(value)).toEqual({ value });
  });

  it("rejects a blank name", () => {
    let caught: unknown;
    try {
      parseName("   ");
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(InvalidNameError);
    expect(caught).toMatchObject({ code: "GREETING_NAME_REQUIRED" });
  });

  it("rejects a name longer than 40 characters", () => {
    let caught: unknown;
    try {
      parseName("a".repeat(41));
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(InvalidNameError);
    expect(caught).toMatchObject({ code: "GREETING_NAME_TOO_LONG" });
  });
});
