import { isBillingAddressesEqual } from "./isBillingAddressEqual";

describe("isBillingAddressesEqual", () => {
  describe("when both addresses are null or undefined", () => {
    it("should return true when both are null", () => {
      expect(isBillingAddressesEqual(null, null)).toBe(true);
    });

    it("should return true when both are undefined", () => {
      expect(isBillingAddressesEqual(undefined, undefined)).toBe(true);
    });

    it("should return true when one is null and other is undefined", () => {
      expect(isBillingAddressesEqual(null, undefined)).toBe(true);
      expect(isBillingAddressesEqual(undefined, null)).toBe(true);
    });
  });

  describe("when only one address is null or undefined", () => {
    const validAddress = {
      line1: "123 Main St",
      line2: "Apt 4B",
      line3: "Building A",
      postcode: "SW1A 1AA",
    };

    it("should return false when first address is null", () => {
      expect(isBillingAddressesEqual(null, validAddress)).toBe(false);
    });

    it("should return false when second address is null", () => {
      expect(isBillingAddressesEqual(validAddress, null)).toBe(false);
    });

    it("should return false when first address is undefined", () => {
      expect(isBillingAddressesEqual(undefined, validAddress)).toBe(false);
    });

    it("should return false when second address is undefined", () => {
      expect(isBillingAddressesEqual(validAddress, undefined)).toBe(false);
    });
  });

  describe("when both addresses are valid objects", () => {
    it("should return true for identical addresses", () => {
      const address1 = {
        line1: "123 Main St",
        line2: "Apt 4B",
        line3: "Building A",
        postcode: "SW1A 1AA",
      };
      const address2 = {
        line1: "123 Main St",
        line2: "Apt 4B",
        line3: "Building A",
        postcode: "SW1A 1AA",
      };

      expect(isBillingAddressesEqual(address1, address2)).toBe(true);
    });

    it("should return false for different addresses", () => {
      const address1 = {
        line1: "123 Main St",
        line2: "Apt 4B",
        line3: "Building A",
        postcode: "SW1A 1AA",
      };
      const address2 = {
        line1: "456 Oak Ave",
        line2: "Suite 2C",
        line3: "Building B",
        postcode: "W1A 0AX",
      };

      expect(isBillingAddressesEqual(address1, address2)).toBe(false);
    });

    it("should return false when only one field differs", () => {
      const address1 = {
        line1: "123 Main St",
        line2: "Apt 4B",
        line3: "Building A",
        postcode: "SW1A 1AA",
      };
      const address2 = {
        line1: "123 Main St",
        line2: "Apt 4B",
        line3: "Building A",
        postcode: "W1A 0AX",
      };

      expect(isBillingAddressesEqual(address1, address2)).toBe(false);
    });
  });

  describe("when handling null, undefined, and empty string values", () => {
    it("should treat null, undefined, and empty string as equal", () => {
      const address1 = {
        line1: "123 Main St",
        line2: null,
        line3: undefined,
        postcode: "",
      };
      const address2 = {
        line1: "123 Main St",
        line2: "",
        line3: null,
        postcode: undefined,
      };

      expect(isBillingAddressesEqual(address1, address2)).toBe(true);
    });

    it("should return true for addresses with all null/undefined/empty fields", () => {
      const address1 = {
        line1: null,
        line2: undefined,
        line3: "",
        postcode: null,
      };
      const address2 = {
        line1: "",
        line2: null,
        line3: undefined,
        postcode: "",
      };

      expect(isBillingAddressesEqual(address1, address2)).toBe(true);
    });

    it("should return false when comparing empty/null values with actual values", () => {
      const address1 = {
        line1: "123 Main St",
        line2: null,
        line3: undefined,
        postcode: "",
      };
      const address2 = {
        line1: "123 Main St",
        line2: "Apt 4B",
        line3: undefined,
        postcode: "",
      };

      expect(isBillingAddressesEqual(address1, address2)).toBe(false);
    });
  });

  describe("when addresses have missing fields", () => {
    it("should return true for addresses with missing optional fields", () => {
      const address1 = {
        line1: "123 Main St",
        postcode: "SW1A 1AA",
      };
      const address2 = {
        line1: "123 Main St",
        line2: null,
        line3: undefined,
        postcode: "SW1A 1AA",
      };

      expect(isBillingAddressesEqual(address1, address2)).toBe(true);
    });

    it("should handle partial address objects correctly", () => {
      const address1 = {
        line1: "123 Main St",
      };
      const address2 = {
        line1: "123 Main St",
        line2: "",
        postcode: null,
      };

      expect(isBillingAddressesEqual(address1, address2)).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("should handle empty objects", () => {
      expect(isBillingAddressesEqual({}, {})).toBe(true);
    });

    it("should handle addresses with whitespace", () => {
      const address1 = {
        line1: "123 Main St",
        line2: "   ",
        postcode: "SW1A 1AA",
      };
      const address2 = {
        line1: "123 Main St",
        line2: "   ",
        postcode: "SW1A 1AA",
      };

      expect(isBillingAddressesEqual(address1, address2)).toBe(true);
    });

    it("should distinguish between whitespace and empty/null values", () => {
      const address1 = {
        line1: "123 Main St",
        line2: "   ",
        postcode: "SW1A 1AA",
      };
      const address2 = {
        line1: "123 Main St",
        line2: "",
        postcode: "SW1A 1AA",
      };

      expect(isBillingAddressesEqual(address1, address2)).toBe(false);
    });
  });
});
