import { describe, it, expect } from "vitest";
import { validateForm } from "./validators";

describe("validateForm validation engine", () => {
  it("passes validation with empty error object when given valid inputs", () => {
    const validData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@company.com",
      department: "Engineering",
      role: "Admin",
      status: "Active"
    };
    const errors = validateForm(validData);
    expect(errors).toEqual({});
  });

  it("fails when firstName or lastName is missing or empty space", () => {
    const invalidData = {
      firstName: " ",
      lastName: "",
      email: "john.doe@company.com",
      department: "Engineering",
      role: "Admin",
      status: "Active"
    };
    const errors = validateForm(invalidData);
    expect(errors.firstName).toBe("First Name is required");
    expect(errors.lastName).toBe("Last Name is required");
  });

  it("fails when firstName or lastName contains non-alphabetic characters", () => {
    const invalidData = {
      firstName: "John123",
      lastName: "Doe#",
      email: "john.doe@company.com",
      department: "Engineering",
      role: "Admin",
      status: "Active"
    };
    const errors = validateForm(invalidData);
    expect(errors.firstName).toBe("First Name must be 2-30 alphabetic characters");
    expect(errors.lastName).toBe("Last Name must be 2-30 alphabetic characters");
  });

  it("fails when email is missing or has incorrect structure", () => {
    const missingEmailData = {
      firstName: "John",
      lastName: "Doe",
      email: "",
      department: "Engineering",
      role: "Admin",
      status: "Active"
    };
    const badEmailData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@com", // valid by some regex, let's test absolute fails like missing @ or domain
      department: "Engineering",
      role: "Admin",
      status: "Active"
    };
    const badEmailData2 = {
      ...badEmailData,
      email: "john.doecompany.com" // missing @
    };

    expect(validateForm(missingEmailData).email).toBe("Email is required");
    expect(validateForm(badEmailData2).email).toBe("Invalid email format (e.g. name@domain.com)");
  });

  it("fails when department selection is empty", () => {
    const invalidData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@company.com",
      department: "",
      role: "Admin",
      status: "Active"
    };
    const errors = validateForm(invalidData);
    expect(errors.department).toBe("Department is required");
  });

  it("fails when role or status is empty", () => {
    const invalidData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@company.com",
      department: "Engineering",
      role: "",
      status: ""
    };
    const errors = validateForm(invalidData);
    expect(errors.role).toBe("Role selection is required");
    expect(errors.status).toBe("Status selection is required");
  });
});
