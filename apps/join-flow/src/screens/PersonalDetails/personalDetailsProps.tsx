export const personalDetailsProps = {
  pageTitle: "Your info",
  sectionTitle: "Your details",

  smartphoneSection: {
    mainText: "You'll need a smartphone to get Cuckoo.",
    whyText: "Why is this?",
    options: [
      { value: "yes", label: "I have a smartphone" },
      { value: "no", label: "I don't have a smartphone" },
    ],
    noSmartphoneAlertText: "Omg no smartphone",
  },

  emailModalDetails: {
    modalTitle: "title about email modal",
    modalContent: [
      { title: "title about email modal", text: "text about email modal" },
    ],
  },

  smartphoneModalDetails: {
    modalTitle: "title about smartphone modal",
    modalContent: [
      {
        title: "title about smartphone modal",
        text: "text about smartphone modal",
      },
    ],
  },

  verificationSection: {
    title: "We've just sent a code to your email address",
    description: "Come back here to paste it",
    tipCardText:
      "We take your security seriously here at Cuckoo, so to make sure we know it’s really you, we’ve sent a unique verification code to",
    inputLabelText: "Pop the code in below",
    invalidCodeText: "Invalid verification code. Please try again.",
  },

  additionalSection: {
    dobTitle: "Your date of birth",
    dobDayPlaceholder: "DD *",
    dobMonthPlaceholder: "MM *",
    dobYearPlaceholder: "YY *",
    dobLink: "Why do you need my date of birth?",
    addressTitle: "Your address",
    residencyOptions: [
      { value: "over-year", label: "I've lived here for a year or more" },
      {
        value: "under-year",
        label: "I've lived here for under a year I'm moving",
      },
    ],
    landlineTitle: "Are you fully dependant on a landline for your health?",
    landlineText:
      "If you have a telehealth device that you rely on, it’s really important we know about it.",
    landlineTextLink: "Why are you asking me this?",
    landlineCheckboxText: "Yes, I have or need a telehealth care device ",
    dobModalTitle: "Why do you need my date of birth?",
    dobModal: [
      {
        title: "We need to know you're over 18",
        text: "You need to be over 18 to sign up to Cuckoo broadband.",
      },
      {
        title: "We need to run a soft credit check",
        text: "This is to verify your identity, prevent fraud and check eligibility – without affecting your credit score.",
      },
    ],
    modalCloseText: "Got it",
    teleHealthDeviceModalTitle: "What’s a telehealth device?",
    teleHealthDeviceModal: [
      {
        title:
          "Telehealth devices help people access healthcare from home – by monitoring, diagnosing and treating health conditions.",
        text: "If you or someone in your household depends on one of these devices, we’re not able to offer you Cuckoo at the moment. That’s because some of these devices still rely on the old landline system, and they might not work properly with the new digital phone services that come with full fibre.",
      },
    ],
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
    continueToEero: "Continue to choose my eero(s)",
    verify: "Next",
  },

  fieldPlaceholders: {
    firstName: "First name *",
    lastName: "Last name *",
    phone: "Mobile phone number *",
    email: "Email address *",
    confirmEmail: "Confirm email address *",
  },

  validationMessages: {
    firstNameRequired: "First name is required",
    lastNameRequired: "Last name is required",
    phoneRequired: "Please enter a valid phone number",
    smartphoneConfirmation: "Please confirm you have a smartphone",
    emailInvalid: "Please enter a valid email",
    emailConfirmation: "Please confirm your email",
    emailsMustMatch: "Email addresses must match",
    verificationCodeRequired: "Verification code is required",
    dobDayRequired: "Day is required",
    dobMonthRequired: "Month is required",
    dobYearRequired: "Year is required",
    residencyDurationRequired:
      "Please select how long you've lived at this address",
  },
};

export default personalDetailsProps;
