import { filterTrueBooleans, filterTrueValues } from "./filterTrueValues";

describe("filterTrueValues", () => {
  describe("filterTrueValues", () => {
    it("should return empty object when input is undefined", () => {
      const result = filterTrueValues(undefined);
      expect(result).toEqual({});
    });

    it("should return empty object when input is empty object", () => {
      const result = filterTrueValues({});
      expect(result).toEqual({});
    });

    it("should filter out false boolean values", () => {
      const input = {
        option1: true,
        option2: false,
        option3: true,
        option4: false,
      };
      const result = filterTrueValues(input);
      expect(result).toEqual({
        option1: true,
        option3: true,
      });
    });

    it("should filter out empty strings", () => {
      const input = {
        field1: "value1",
        field2: "",
        field3: "value3",
        field4: "",
      };
      const result = filterTrueValues(input);
      expect(result).toEqual({
        field1: "value1",
        field3: "value3",
      });
    });

    it("should keep non-empty strings and true booleans", () => {
      const input = {
        checkbox1: true,
        checkbox2: false,
        textField1: "some text",
        textField2: "",
        checkbox3: true,
        textField3: "another value",
      };
      const result = filterTrueValues(input);
      expect(result).toEqual({
        checkbox1: true,
        textField1: "some text",
        checkbox3: true,
        textField3: "another value",
      });
    });

    it("should return empty object when all values are false or empty", () => {
      const input = {
        checkbox1: false,
        checkbox2: false,
        textField1: "",
        textField2: "",
      };
      const result = filterTrueValues(input);
      expect(result).toEqual({});
    });

    it("should handle strings with whitespace", () => {
      const input = {
        field1: "   ",
        field2: "value",
        field3: "\t\n",
      };
      const result = filterTrueValues(input);
      expect(result).toEqual({
        field1: "   ",
        field2: "value",
        field3: "\t\n",
      });
    });

    it("should preserve the original object structure keys", () => {
      const input = {
        visionImpaired: true,
        hearingImpaired: false,
        additionalInformation: "Some info",
        thirdPartyName: "",
      };
      const result = filterTrueValues(input);
      expect(result).toEqual({
        visionImpaired: true,
        additionalInformation: "Some info",
      });
    });
  });

  describe("filterTrueBooleans", () => {
    it("should return empty object when input is undefined", () => {
      const result = filterTrueBooleans(undefined);
      expect(result).toEqual({});
    });

    it("should return empty object when input is empty object", () => {
      const result = filterTrueBooleans({});
      expect(result).toEqual({});
    });

    it("should filter out false boolean values", () => {
      const input = {
        option1: true,
        option2: false,
        option3: true,
        option4: false,
      };
      const result = filterTrueBooleans(input);
      expect(result).toEqual({
        option1: true,
        option3: true,
      });
    });

    it("should return empty object when all values are false", () => {
      const input = {
        option1: false,
        option2: false,
        option3: false,
      };
      const result = filterTrueBooleans(input);
      expect(result).toEqual({});
    });

    it("should keep all true values", () => {
      const input = {
        option1: true,
        option2: true,
        option3: true,
      };
      const result = filterTrueBooleans(input);
      expect(result).toEqual({
        option1: true,
        option2: true,
        option3: true,
      });
    });

    it("should handle mixed true/false values correctly", () => {
      const input = {
        monthlyBills: true,
        cics: false,
        termsAndConditions: true,
        audio: false,
        braille: true,
        largePrint: false,
      };
      const result = filterTrueBooleans(input);
      expect(result).toEqual({
        monthlyBills: true,
        termsAndConditions: true,
        braille: true,
      });
    });

    it("should preserve the original object key names", () => {
      const input = {
        veryLongKeyNameThatShouldBePreserved: true,
        shortKey: false,
        anotherLongKeyName: true,
      };
      const result = filterTrueBooleans(input);
      expect(result).toEqual({
        veryLongKeyNameThatShouldBePreserved: true,
        anotherLongKeyName: true,
      });
    });

    it("should filter out strings and keep only true booleans", () => {
      const input = {
        booleanTrue: true,
        booleanFalse: false,
        stringValue: "some text",
        emptyString: "",
        anotherBoolean: true,
        anotherString: "another value",
      };
      const result = filterTrueBooleans(input);
      expect(result).toEqual({
        booleanTrue: true,
        anotherBoolean: true,
      });
    });
  });
});
