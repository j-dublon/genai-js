export const accessibilityModalText = {
  accessibilityCheckboxes: [
    {
      label: "Blind or Vision impaired",
      name: "visionImpaired",
    },
    {
      label: "Deaf or Hearing impaired",
      name: "hearingImpaired",
    },
    {
      label: "ADHD, Autism, Dyslexia or other Neurodivergent need",
      name: "neurodiverse",
    },
    {
      label: "Learning Disability",
      name: "learningDisability",
    },
    {
      label: "Third Party Account Manager / Power of Attorney",
      name: "thirdPartyAssistance",
      moreDetails: [
        {
          name: "thirdPartyName",
          placeholder: "Full name of nominated person",
          error: "Please provide a name",
        },
        {
          name: "thirdPartyPhone",
          placeholder: "Phone number (optional)",
        },
        {
          name: "thirdPartyEmail",
          placeholder: "Email address (optional)",
        },
      ],
    },
    {
      label: "Physical Illness",
      name: "physicalIllness",
    },
    {
      label: "Physical Disability",
      name: "physicalDisability",
    },
    {
      label: "Communication difficulties",
      name: "communicationNeeds",
    },
    {
      label: "Mental Illness",
      name: "mentalIllness",
    },
  ],
  submitButtonText: "Save my requirements",
  resetButtonText: "Clear",
  additionalInformationLabel:
    "Please let us know any more info that'll help us understand your specific needs or requirements",
  additionalInformationPlaceholder:
    "For example: My hearing has recently deteriorated, because of this, I find it hard to communicate so I prefer not to use the phone",
};
