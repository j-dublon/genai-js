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
        },
        {
          name: "thirdPartyPhone",
          placeholder: "Phone number (optional)",
        },
        {
          name: "thirdPartyEmail",
          placeholder: "Email address",
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
  accessibilityRequirementsTitle: "Your requirements",
  accessibilityRequirementsDescription:
    "We're a diverse bunch here at Cuckoo and we understand our customers are the same. Do you have any accessibility or communication needs you'd like us to be aware of?",
  accessibilityRequirementsModalTitle:
    "Let us know a bit more about your specific needs or requirements",
  accessibilityRequirementsCheckboxText:
    "Yes, I have specific requirements or needs",
};

export const accessibilityCommunicationPreferencesText = {
  formatNeededLabel: "I require my info in a different format",
  communicationsTitle: "Your communications",
  formatDescription:
    "Tell us how you'd like to receive your information and we'll handle the rest",
  formatRadioOptions: [
    {
      label: "Audio",
      name: "audio",
    },
    {
      label: "Braille",
      name: "braille",
    },
    {
      label: "Large print",
      name: "largePrint",
    },
  ],
  documentCheckboxesTitle: "What info do you require in a different format?",
  documentCheckboxes: [
    {
      label: "Monthly bills",
      name: "monthlyBills",
    },
    {
      label: "Contract information and summary",
      name: "cics",
    },
    {
      label: "T&Cs",
      name: "termsAndConditions",
    },
  ],
  saveButtonText: "Save",
  editButtonText: "Edit my communications",
};
