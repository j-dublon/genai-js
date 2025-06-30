import type {
  AccessibilityCommunicationPreferences,
  AccessibilityRequirements,
} from "@store/useJoinFlowStore";
import { describe, expect, it } from "vitest";

import { mapAccessibilityRequirements } from "./mapAccessibilityRequirements";

describe("mapAccessibilityRequirements", () => {
  describe("when requirementNeeds is null", () => {
    it("should return null for null input", () => {
      const result = mapAccessibilityRequirements(null, null);
      expect(result).toBeNull();
    });
  });

  describe("buildSelectedObject helper function", () => {
    it("should map accessibility options correctly", () => {
      const requirementNeeds: AccessibilityRequirements = {
        blindVisionImpaired: true,
        deafOrHardOfHearing: false,
        neurodivergent: true,
        learningDisability: false,
        physicalIllness: true,
        physicalDisability: false,
        communicationDifficulties: true,
        otherIllness: false,
        thirdPartyAssistance: false,
      };

      const result = mapAccessibilityRequirements(requirementNeeds, null);

      expect(result?.accessibilityOptions).toEqual({
        blindVisionImpaired: { selected: true },
        neurodivergent: { selected: true },
        physicalIllness: { selected: true },
        communicationDifficulties: { selected: true },
      });
    });

    it("should return empty accessibilityOptions when all values are false/undefined", () => {
      const requirementNeeds: AccessibilityRequirements = {
        blindVisionImpaired: false,
        deafOrHardOfHearing: false,
        neurodivergent: undefined,
        learningDisability: false,
      };

      const result = mapAccessibilityRequirements(requirementNeeds, null);

      expect(result?.accessibilityOptions).toEqual({});
    });
  });

  describe("contentTypes mapping", () => {
    it("should map contentTypes when communicationNeeds has contentTypes", () => {
      const requirementNeeds: AccessibilityRequirements = {
        blindVisionImpaired: true,
      };
      const communicationNeeds: AccessibilityCommunicationPreferences = {
        contentTypes: {
          monthlyBills: true,
          cics: false,
          termsAndConditions: true,
        },
        contactPreferences: {
          audio: true,
        },
      };

      const result = mapAccessibilityRequirements(
        requirementNeeds,
        communicationNeeds,
      );

      expect(result?.contentTypes).toEqual({
        monthlyBills: { selected: true },
        termsAndConditions: { selected: true },
      });
    });

    it("should set contentTypes and contactPreferences to undefined when communicationNeeds is not provided", () => {
      const requirementNeeds: AccessibilityRequirements = {
        blindVisionImpaired: true,
      };

      const result = mapAccessibilityRequirements(requirementNeeds, null);

      expect(result).toBeDefined();
      expect(result!.contentTypes).toBeUndefined();
      expect(result!.contactPreferences).toBeUndefined();
    });

    it("should set contentTypes to undefined when communicationNeeds has no contentTypes", () => {
      const requirementNeeds: AccessibilityRequirements = {
        blindVisionImpaired: true,
      };
      const communicationNeeds = {} as AccessibilityCommunicationPreferences;

      const result = mapAccessibilityRequirements(
        requirementNeeds,
        communicationNeeds,
      );

      expect(result).toBeDefined();
      expect(result!.contentTypes).toBeUndefined();
    });
  });

  describe("contactPreferences mapping", () => {
    it("should map contactPreferences when communicationNeeds has contactPreferences", () => {
      const requirementNeeds: AccessibilityRequirements = {
        blindVisionImpaired: true,
      };
      const communicationNeeds: AccessibilityCommunicationPreferences = {
        contentTypes: {
          monthlyBills: true,
        },
        contactPreferences: {
          audio: false,
          braille: true,
          largePrint: false,
        },
      };

      const result = mapAccessibilityRequirements(
        requirementNeeds,
        communicationNeeds,
      );

      expect(result?.contactPreferences).toEqual({
        braille: { selected: true },
      });
    });

    it("should set contactPreferences to undefined if communicationNeeds has no contactPreferences", () => {
      const requirementNeeds: AccessibilityRequirements = {
        blindVisionImpaired: true,
      };
      const communicationNeeds = {
        contentTypes: { monthlyBills: true },
      } as AccessibilityCommunicationPreferences;

      const result = mapAccessibilityRequirements(
        requirementNeeds,
        communicationNeeds,
      );

      expect(result).toBeDefined();
      expect(result!.contactPreferences).toBeUndefined();
    });
  });

  describe("other field mapping", () => {
    it("should map additionalInformation to other.content when provided", () => {
      const requirementNeeds: AccessibilityRequirements = {
        blindVisionImpaired: true,
        additionalInformation: "I need extra assistance with reading",
      };

      const result = mapAccessibilityRequirements(requirementNeeds, null);

      expect(result?.other).toEqual({
        content: "I need extra assistance with reading",
      });
    });

    it("should set other to undefined when additionalInformation is not provided", () => {
      const requirementNeeds: AccessibilityRequirements = {
        blindVisionImpaired: true,
      };

      const result = mapAccessibilityRequirements(requirementNeeds, null);

      expect(result).toBeDefined();
      expect(result!.other).toBeUndefined();
    });

    it("should set other to undefined when additionalInformation is empty string", () => {
      const requirementNeeds: AccessibilityRequirements = {
        blindVisionImpaired: true,
        additionalInformation: "",
      };

      const result = mapAccessibilityRequirements(requirementNeeds, null);

      expect(result).toBeDefined();
      expect(result!.other).toBeUndefined();
    });
  });

  describe("nominatedPerson mapping", () => {
    describe("when thirdPartyAssistance is falsy", () => {
      it("should return undefined for nominatedPerson when thirdPartyAssistance is false", () => {
        const requirementNeeds: AccessibilityRequirements = {
          blindVisionImpaired: true,
          thirdPartyAssistance: false,
        };

        const result = mapAccessibilityRequirements(requirementNeeds, null);

        expect(result).toBeDefined();
        expect(result!.nominatedPerson).toBeUndefined();
      });

      it("should return undefined for nominatedPerson when thirdPartyAssistance is undefined", () => {
        const requirementNeeds: AccessibilityRequirements = {
          blindVisionImpaired: true,
          thirdPartyAssistance: undefined,
        };

        const result = mapAccessibilityRequirements(requirementNeeds, null);

        expect(result).toBeDefined();
        expect(result!.nominatedPerson).toBeUndefined();
      });
    });

    describe("when thirdPartyAssistance is truthy but no contact info", () => {
      it("should return undefined when all contact fields are falsy", () => {
        const requirementNeeds: AccessibilityRequirements = {
          blindVisionImpaired: true,
          thirdPartyAssistance: true,
          thirdPartyName: "",
          thirdPartyPhone: null as unknown as string,
          thirdPartyEmail: undefined,
        };

        const result = mapAccessibilityRequirements(requirementNeeds, null);

        expect(result).toBeDefined();
        expect(result!.nominatedPerson).toBeUndefined();
      });

      it("should return undefined when contact fields are not provided", () => {
        const requirementNeeds: AccessibilityRequirements = {
          blindVisionImpaired: true,
          thirdPartyAssistance: true,
        };

        const result = mapAccessibilityRequirements(requirementNeeds, null);

        expect(result).toBeDefined();
        expect(result!.nominatedPerson).toBeUndefined();
      });
    });

    describe("when thirdPartyAssistance is truthy and contact info is provided", () => {
      it("should return nominatedPerson object with all contact fields", () => {
        const requirementNeeds: AccessibilityRequirements = {
          blindVisionImpaired: true,
          thirdPartyAssistance: true,
          thirdPartyName: "John Doe",
          thirdPartyPhone: "123-456-7890",
          thirdPartyEmail: "john@example.com",
        };

        const result = mapAccessibilityRequirements(requirementNeeds, null);

        expect(result?.nominatedPerson).toEqual({
          fullName: "John Doe",
          phone: "123-456-7890",
          email: "john@example.com",
        });
      });

      it("should return nominatedPerson with partial contact info if not all is provided", () => {
        const requirementNeeds: AccessibilityRequirements = {
          blindVisionImpaired: true,
          thirdPartyAssistance: true,
          thirdPartyName: "John Doe",
          thirdPartyPhone: undefined,
          thirdPartyEmail: "123-456-7890",
        };

        const result = mapAccessibilityRequirements(requirementNeeds, null);

        expect(result?.nominatedPerson).toEqual({
          fullName: "John Doe",
          phone: undefined,
          email: "123-456-7890",
        });
      });

      it("should return nominatedPerson with mixed truthy and falsy values", () => {
        const requirementNeeds: AccessibilityRequirements = {
          blindVisionImpaired: true,
          thirdPartyAssistance: true,
          thirdPartyName: "John Doe",
          thirdPartyPhone: "",
          thirdPartyEmail: "john@example.com",
        };

        const result = mapAccessibilityRequirements(requirementNeeds, null);

        expect(result?.nominatedPerson).toEqual({
          fullName: "John Doe",
          email: "john@example.com",
        });
      });
    });
  });

  describe("complete integration tests", () => {
    it("should map all fields correctly with full data", () => {
      const requirementNeeds: AccessibilityRequirements = {
        blindVisionImpaired: true,
        deafOrHardOfHearing: false,
        neurodivergent: true,
        learningDisability: false,
        thirdPartyAssistance: true,
        thirdPartyName: "Jane Smith",
        thirdPartyPhone: "555-0123",
        thirdPartyEmail: "jane@example.com",
        physicalIllness: false,
        physicalDisability: true,
        communicationDifficulties: false,
        otherIllness: false,
        additionalInformation: "Requires assistance with forms",
      };

      const communicationNeeds: AccessibilityCommunicationPreferences = {
        contentTypes: {
          monthlyBills: true,
          cics: false,
          termsAndConditions: true,
        },
        contactPreferences: {
          audio: false,
          braille: true,
          largePrint: false,
        },
      };

      const result = mapAccessibilityRequirements(
        requirementNeeds,
        communicationNeeds,
      );

      expect(result).toEqual({
        accessibilityOptions: {
          blindVisionImpaired: { selected: true },
          neurodivergent: { selected: true },
          physicalDisability: { selected: true },
        },
        contentTypes: {
          monthlyBills: { selected: true },
          termsAndConditions: { selected: true },
        },
        contactPreferences: {
          braille: { selected: true },
        },
        other: {
          content: "Requires assistance with forms",
        },
        nominatedPerson: {
          fullName: "Jane Smith",
          phone: "555-0123",
          email: "jane@example.com",
        },
      });
    });

    it("should map minimal valid data correctly", () => {
      const requirementNeeds: AccessibilityRequirements = {
        blindVisionImpaired: true,
      };

      const result = mapAccessibilityRequirements(requirementNeeds, null);

      expect(result).toEqual({
        accessibilityOptions: {
          blindVisionImpaired: { selected: true },
        },
      });
    });
  });
});
