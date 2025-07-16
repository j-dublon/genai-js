export interface RegisterOfInterestProps {
  formTitle: string;
  formDescription: string;
  buttonText: string;
  tooltipText: string;
  tooltipContent: string;
  privacyNoticeText: string;
  privacyNoticeLinkText: string;
  submittedPageTitle: string;
  submittedDescription: string[];
  submittedButtonText: string;
  submittedButtonUrl: string;
  privacyNoticeUrl: string;
  errorTipCardTitle: string;
  formErrorText: string;
}

export const SharedProps = {
  privacyNoticeText:
    "By clicking the button below, you confirm that you consent to Cuckoo Fibre processing and storing your details in accordance with our Privacy Notice and using these details to send you information about Cuckoo Fibre's services. You may change your mind and unsubscribe at any time.",
  privacyNoticeLinkText: "Privacy Notice",
  privacyNoticeUrl: "/legal/privacy",
  submittedPageTitle: "You're all set!",
  submittedDescription: [
    "Thanks for registering your interest. We'll let you know when Cuckoo's ready for you.",
    "We'll drop you an email, so keep an eye on your inbox. In the meantime, feel free to have a browse around the nest. We've got plenty of help guides and updates if you fancy learning more.",
  ],
  submittedButtonText: "Take a peek at Cuckoo guides",
  submittedButtonUrl: "/guide",
  buttonText: "Tell me when it's available",
  tooltipText: "Why can't I get Cuckoo right now?",
  errorTipCardTitle: "Whoops, before we continue",
  formErrorText:
    "There was an error submitting your details. Please try again, or give our lovely Customer Care team a ring on 0330 912 9955. Lines are open: 8am to 8pm Monday - Friday, 9am to 5.30pm weekends and bank holidays.",
};

export const NotShownText: RegisterOfInterestProps = {
  formTitle: "The early bird catches the worm",
  formDescription:
    "Be first on the list! Pop your details down and we'll let you know as soon as you can get Cuckoo in your area.",
  tooltipContent:
    "Our address checker was unable to find your address so we do not know where to connect your broadband at this time.",
  ...SharedProps,
};

export const CannotServiceAddressText: RegisterOfInterestProps = {
  formTitle: "The early bird catches the worm",
  formDescription:
    "Be first on the list! Pop your details down and we'll let you know as soon as you can get Cuckoo in your area.",
  tooltipContent:
    "Our broadband only uses full fibre, because it's the fastest and most reliable technology available. And unfortunately, it's not yet available at the address you gave us. But the good news is that the entire UK network is being upgraded so it should only be a matter of time.",
  ...SharedProps,
};

export const UnavailableText: RegisterOfInterestProps = {
  formTitle: "Unexpected queue in the joining area",
  formDescription:
    "Phew. It seems like the whole world (and their dog) is signing up for fast, fair, feel-good broadband all at once. But fear not, just pop your details below and we'll be back in touch very soon. You'll be part of the flock in no time.",
  tooltipContent:
    "We're currently moving Cuckoo across networks and so have a limited sign up capacity. As soon as we're ready for more customers we'll send you an email to get you signed up.",
  ...SharedProps,
};
