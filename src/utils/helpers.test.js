import { describe, it, expect } from "vitest";
import { splitFullName, generateUniqueId } from "./helpers";

describe("splitFullName helper function", () => {
  it("splits typical first name and last name by the first space", () => {
    const result = splitFullName("Leanne Graham");
    expect(result).toEqual({ firstName: "Leanne", lastName: "Graham" });
  });

  it("splits name with multiple parts, grouping remaining in lastName", () => {
    const result = splitFullName("Mrs. Dennis Schulist");
    expect(result).toEqual({ firstName: "Mrs.", lastName: "Dennis Schulist" });
  });

  it("handles single-word names (no spaces) by assigning empty lastName", () => {
    const result = splitFullName("Bret");
    expect(result).toEqual({ firstName: "Bret", lastName: "" });
  });

  it("handles empty names or whitespaces gracefully", () => {
    const result = splitFullName("   ");
    expect(result).toEqual({ firstName: "", lastName: "" });
  });
});

describe("generateUniqueId helper function", () => {
  it("returns 1 when users array is empty", () => {
    expect(generateUniqueId([])).toBe(1);
  });

  it("returns max ID + 1 for an array of users", () => {
    const mockUsers = [
      { id: 1, firstName: "Leanne" },
      { id: 7, firstName: "Ervin" },
      { id: 3, firstName: "Clementine" }
    ];
    expect(generateUniqueId(mockUsers)).toBe(8);
  });

  it("handles numeric strings as IDs by converting them to numbers", () => {
    const mockUsers = [
      { id: "2", firstName: "Leanne" },
      { id: "12", firstName: "Ervin" }
    ];
    expect(generateUniqueId(mockUsers)).toBe(13);
  });
});
