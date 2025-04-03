export const personalDetailsProps = {
  pageTitle: "Your info",
  sectionTitle: "Your details",
  requiredFieldsText: "Fields marked * are required",

  smartphoneSection: {
    mainText: "You'll need a smartphone to get Cuckoo.",
    whyText: "Why is this?",
    options: [
      { value: "yes", label: "I have a smartphone" },
      { value: "no", label: "I don't have a smartphone" },
    ],
    noSmartphoneAlertText: "Omg no smartphone",
  },

  marketingSection: {
    text: "From time to time, we'd love let you know about useful things like upgrades, referrals and offers. We won't bombard your inbox and we'll never send you marketing materials without your permission. Here's our Privacy Notice. Are you okay with this?",
    privacyNoticeText: "Privacy Notice",
    privacyNoticeUrl: "https://www.cuckoo.co/legal/privacy",
    consentText: "Yes, count me in",
  },

  buttons: {
    back: "Back",
    continue: "Continue",
  },

  fieldPlaceholders: {
    firstName: "First name*",
    lastName: "Last name*",
    phone: "Mobile phone number*",
    email: "Email address*",
    confirmEmail: "Confirm email address*",
  },

  validationMessages: {
    firstNameRequired: "First name is required",
    lastNameRequired: "Last name is required",
    phoneRequired: "Phone number is required",
    smartphoneConfirmation: "Please confirm you have a smartphone",
    emailInvalid: "Please enter a valid email",
    emailConfirmation: "Please confirm your email",
    emailsMustMatch: "Email addresses must match",
  },
};

export default personalDetailsProps;
