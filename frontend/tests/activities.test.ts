import { describe, expect, it } from "vitest";
import {
  gradeUnitChallenge,
  gradeFunctionMatches,
} from "../src/features/academy/Activities";

describe("learning activity answer checks", () => {
  it("accepts equivalent length units and decimal comma without accepting the wrong dimension", () => {
    expect(gradeUnitChallenge("0,125", "m", 125).correct).toBe(true);
    expect(gradeUnitChallenge("125", "mm", 125).correct).toBe(true);
    expect(gradeUnitChallenge("125", "N", 125).correct).toBe(false);
    expect(gradeUnitChallenge("125", "m", 125).correct).toBe(false);
  });
  it("rejects empty, negative, non-finite, or malformed length entries", () => {
    for (const value of [
      "",
      "-125",
      "NaN",
      "Infinity",
      "1e999",
      "125mm",
      "0x7d",
    ]) {
      expect(gradeUnitChallenge(value, "mm", 125).correct).toBe(false);
    }
    expect(gradeUnitChallenge("125.009", "mm", 125).correct).toBe(true);
    expect(gradeUnitChallenge("125.02", "mm", 125).correct).toBe(false);
  });
  it("requires every part-function relationship, rather than rewarding a partial match", () => {
    expect(gradeFunctionMatches({}).correct).toBe(false);
    expect(
      gradeFunctionMatches({ blade: "air", shaft: "air", base: "support" })
        .correct,
    ).toBe(false);
    expect(
      gradeFunctionMatches({ blade: "air", shaft: "rotation", base: "support" })
        .correct,
    ).toBe(true);
  });
});
