import {
  followingApril,
  formatDateOfBirth,
  formatDisplayDate,
  formatDisplayDateMonthYear,
  getApril,
  nextApril,
} from "./formatDate";

describe("formatDate", () => {
  describe("formatDisplayDate", () => {
    it('should format date string to "EEEE d MMMM yyyy" format', () => {
      const dateString = "2024-03-15T10:30:00Z";
      const result = formatDisplayDate(dateString);
      expect(result).toBe("Friday 15 March 2024");
    });

    it("should handle different date strings correctly", () => {
      const dateString = "2023-12-25T00:00:00Z";
      const result = formatDisplayDate(dateString);
      expect(result).toBe("Monday 25 December 2023");
    });
  });

  describe("formatDisplayDateMonthYear", () => {
    it('should format date string to "MMMM yyyy" format', () => {
      const dateString = "2024-03-15T10:30:00Z";
      const result = formatDisplayDateMonthYear(dateString);
      expect(result).toBe("March 2024");
    });

    it("should handle different months correctly", () => {
      const dateString = "2023-12-25T00:00:00Z";
      const result = formatDisplayDateMonthYear(dateString);
      expect(result).toBe("December 2023");
    });
  });

  describe("getApril", () => {
    it("should return current year April when date is in Jan-March and yearsAhead is 0", () => {
      const februaryDate = new Date(2024, 1, 15); // February 15, 2024
      const result = getApril(februaryDate, 0);
      expect(result).toBe("April 2024");
    });

    it("should return next year April when date is after March and yearsAhead is 0", () => {
      const juneDate = new Date(2024, 5, 15); // June 15, 2024
      const result = getApril(juneDate, 0);
      expect(result).toBe("April 2025");
    });

    it("should handle yearsAhead parameter correctly for Jan-March dates", () => {
      const marchDate = new Date(2024, 2, 15); // March 15, 2024
      const result = getApril(marchDate, 1);
      expect(result).toBe("April 2025");
    });

    it("should handle yearsAhead parameter correctly for post-March dates", () => {
      const septemberDate = new Date(2024, 8, 15); // September 15, 2024
      const result = getApril(septemberDate, 1);
      expect(result).toBe("April 2026");
    });

    it("should handle edge case of exact March date (month index 2)", () => {
      const exactMarchDate = new Date(2024, 2, 31); // March 31, 2024
      const result = getApril(exactMarchDate, 0);
      expect(result).toBe("April 2024");
    });

    it("should handle April date (month index 3)", () => {
      const aprilDate = new Date(2024, 3, 15); // April 15, 2024
      const result = getApril(aprilDate, 0);
      expect(result).toBe("April 2025");
    });
  });

  describe("nextApril", () => {
    it("should call getApril with yearsAhead 0", () => {
      const testDate = new Date(2024, 1, 15); // February 15, 2024
      const result = nextApril(testDate);
      expect(result).toBe("April 2024");
    });

    it("should work for post-March dates", () => {
      const testDate = new Date(2024, 6, 15); // July 15, 2024
      const result = nextApril(testDate);
      expect(result).toBe("April 2025");
    });
  });

  describe("followingApril", () => {
    it("should call getApril with yearsAhead 1", () => {
      const testDate = new Date(2024, 1, 15); // February 15, 2024
      const result = followingApril(testDate);
      expect(result).toBe("April 2025");
    });

    it("should work for post-March dates", () => {
      const testDate = new Date(2024, 6, 15); // July 15, 2024
      const result = followingApril(testDate);
      expect(result).toBe("April 2026");
    });
  });

  describe("formatDateOfBirth", () => {
    it("should format date of birth with all parameters", () => {
      const result = formatDateOfBirth("15", "3", "1990", "14:30:00", "+01:00");
      expect(result).toBe("1990-03-15T14:30:00+01:00");
    });

    it("should use default time and timezone when not provided", () => {
      const result = formatDateOfBirth("15", "3", "1990");
      expect(result).toBe("1990-03-15T00:00:00+00:00");
    });

    it("should pad single digit day and month with zeros", () => {
      const result = formatDateOfBirth("5", "3", "1990");
      expect(result).toBe("1990-03-05T00:00:00+00:00");
    });

    it("should pad single digit month with zeros", () => {
      const result = formatDateOfBirth("15", "3", "1990");
      expect(result).toBe("1990-03-15T00:00:00+00:00");
    });

    it("should handle already padded values correctly", () => {
      const result = formatDateOfBirth("05", "03", "1990");
      expect(result).toBe("1990-03-05T00:00:00+00:00");
    });

    it("should work with custom timezone", () => {
      const result = formatDateOfBirth(
        "25",
        "12",
        "1985",
        "09:15:30",
        "-05:00",
      );
      expect(result).toBe("1985-12-25T09:15:30-05:00");
    });
  });
});
