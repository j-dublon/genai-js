import { InitialVulnerabilityAndAccessibility } from "@cuckoointernet/util-squid-network-requests";
import type {
  AccessibilityCommunicationPreferences,
  AccessibilityRequirements,
} from "@store/useJoinFlowStore";

function buildSelectedObject<T extends Record<string, boolean | undefined>>(
  obj: T,
) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([, value]) => value)
      .map(([key]) => [key, { selected: true }]),
  );
}

export function mapAccessibilityRequirements(
  requirementNeeds: AccessibilityRequirements | null,
  communicationNeeds: AccessibilityCommunicationPreferences | null,
): InitialVulnerabilityAndAccessibility | null {
  if (!requirementNeeds) return null;

  const { contentTypes, contactPreferences } = communicationNeeds || {};

  const {
    blindVisionImpaired,
    deafOrHardOfHearing,
    neurodivergent,
    learningDisability,
    thirdPartyAssistance,
    thirdPartyName,
    thirdPartyPhone,
    thirdPartyEmail,
    physicalIllness,
    physicalDisability,
    communicationDifficulties,
    otherIllness,
    additionalInformation,
  } = requirementNeeds;

  const accessibilityOptions = buildSelectedObject({
    blindVisionImpaired,
    deafOrHardOfHearing,
    neurodivergent,
    learningDisability,
    physicalIllness,
    physicalDisability,
    communicationDifficulties,
    otherIllness,
  });

  const contentTypesObj = contentTypes
    ? buildSelectedObject(contentTypes)
    : undefined;
  const contactPreferencesObj = contactPreferences
    ? buildSelectedObject(contactPreferences)
    : undefined;

  return {
    accessibilityOptions,
    contentTypes: contentTypesObj,
    contactPreferences: contactPreferencesObj,
    other: additionalInformation
      ? { content: additionalInformation }
      : undefined,
    nominatedPerson:
      thirdPartyAssistance &&
      (thirdPartyName || thirdPartyPhone || thirdPartyEmail)
        ? {
            fullName: thirdPartyName || undefined,
            phone: thirdPartyPhone || undefined,
            email: thirdPartyEmail || undefined,
          }
        : undefined,
  };
}
