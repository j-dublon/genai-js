import { LoadingModalSlide } from "@/hooks/useLoadingModal";

export const personalDetailsProps = {
  nextStepPillText: "Choosing your eero(s)",
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

  tipCard: {
    goodToKnow: "Good to know:",
    signUpCheckDetails:
      "As part of your sign up process, we'll be running a soft credit check to make sure Cuckoo is right for you. We'll let you know before this happens.",
  },

  verificationSection: {
    title: "We've just sent a code to your email address",
    description: "Come back here to paste it",
    tipCardText:
      "We take your security seriously here at Cuckoo, so to make sure we know it's really you, we've sent a unique verification code to",
    inputLabelText: "Pop the code in below",
    loadingText: "Checking...",
    codeSentText: "You should receive your code within 2 minutes.",
    validCodeText: "Lovely - that's just the code we're after",
    errorCardText:
      "Having trouble with the code? If you think something's wrong, please give our friendly Customer Care team a ring on 0330 912 9955.",
    resendButtonText: "Resend",
    changeEmailText: "I want to use a different email address",
    invalidCodeText:
      "Oops! That code doesn't look right. Try entering a valid one.",
    tooManyRequestsText: "Too many code requests.",
    tooRecentRequestText:
      "An email validation code was already requested recently. Please wait a moment.",
  },

  additionalSection: {
    dobTitle: "Your date of birth",
    dobDayPlaceholder: "DD *",
    dobMonthPlaceholder: "MM *",
    dobYearPlaceholder: "YY *",
    dobLink: "Why do you need my date of birth?",
    addressTitle: "Your address",
    residencyOptions: [
      {
        value: "over-year",
        label: "I've lived at this address for more than 1 year",
      },
      {
        value: "under-year",
        label: "Haven't moved in yet or living here for less than 1 year",
      },
    ],
    previousAddress: "Please provide us with your current or previous address:",
    landlineTitle: "Are you fully dependant on a landline for your health?",
    landlineText:
      "If you have a telehealth device that you rely on, it’s really important we know about it.",
    landlineTextLink: "Why are you asking me this?",
    landlineCheckboxText: "Yes, I have or need a telehealth care device ",
    requiresLandlineText:
      "You'll need a smartphone in order to set up your new router in an app. Cuckoo won’t work without one.",
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
    continueToEero: "Continue to choosing my eero(s)",
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
    firstNameLengthTooLong: "First name length is too long",
    firstNameInvalid:
      "First name can only include letters, spaces, hyphens, and apostrophes",
    lastNameRequired: "Last name is required",
    lastNameLengthTooLong: "Last name length is too long",
    lastNameInvalid:
      "Last name can only include letters, spaces, hyphens, and apostrophes",
    phoneLengthTooLong: "Phone number length has to be 11 digits long or fewer",
    phoneRequired: "Please enter a valid UK phone number",
    smartphoneConfirmation: "Please confirm you have a smartphone",
    emailLengthTooShort: "Email must be at least 5 characters long",
    emailLengthTooLong: "Email must be 254 characters long or fewer",
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

// TODO: Images / messages to be adjusted
export const slides: LoadingModalSlide[] = [
  {
    src: "/images/world-animated.gif",
    message: "Just getting your name and address in the mix.",
  },
  {
    src: "/images/sunglasses-animated.gif",
    message: "Verifying your email and making sure everything's sunny side up.",
  },
  {
    src: "/images/rocket-animated.gif",
    message: "Running a quick check before we strut to the next step!",
  },
];

export default personalDetailsProps;
