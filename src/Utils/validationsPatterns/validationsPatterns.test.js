import {
    validateEmail,
    validateSiren,
    validateURL,
} from "./validationsPatterns";

describe("validateEmail", () => {
    it("should return true for a valid email address", () => {
        expect(validateEmail("test@example.com")).toBe(true);
        expect(validateEmail("john.doe@gmail.com")).toBe(true);
        expect(validateEmail("info@company.co.uk")).toBe(true);
        expect(validateEmail("user1234@example1234.com")).toBe(true);
    });

    it("should return false for an invalid email address", () => {
        expect(validateEmail("invalid-email")).toBe(false);
        expect(validateEmail("test@")).toBe(false);
        expect(validateEmail("@example.com")).toBe(false);
        expect(validateEmail("test@example")).toBe(false);
        expect(validateEmail("test@example.")).toBe(false);
    });
});

describe("validateSiren", () => {
    it("should return true for a valid SIREN", () => {
        expect(validateSiren("443061841")).toBe(true);
        expect(validateSiren("907460265")).toBe(true);
    });

    it("should return false for an invalid SIREN", () => {
        expect(validateSiren("123")).toBe(false);
        expect(validateSiren("ABCDEFGHI")).toBe(false);
        expect(validateSiren("111111111")).toBe(false);
        expect(validateSiren("999999999")).toBe(false);
    });
});

describe("validateURL", () => {
    it("should return true for a valid URL", () => {
        expect(validateURL("http://example.com")).toBe(true);
        expect(validateURL("https://www.google.com")).toBe(true);
        expect(validateURL("https://www.example.co.uk")).toBe(true);
        expect(validateURL("ftp://ftp.example.com")).toBe(true);
    });

    it("should return false for an invalid URL", () => {
        expect(validateURL("example.com")).toBe(false);
        expect(validateURL("www.google.com")).toBe(false);
        expect(validateURL("ftp.example.com")).toBe(false);
        expect(validateURL("not-a-url")).toBe(false);
    });
});
