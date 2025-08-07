import { LoadingModalSlide } from "@/hooks/useLoadingModal";

export const oneTouchSwitchingText = {
  nextStepPillText: "Payment & join Cuckoo",
  title: "Switching to Cuckoo",
  subtitle:
    "We'll tell your current broadband provider that you're leaving them and joining us, so you won't have to. They'll let you know if there are any final charges from them.",
  providerSelectionTitle:
    "Select your current broadband provider from the list",
  providerErrorMessage:
    "Sorry, an error occurred. Please try again later or skip this step.",
  providerSelectorDefault: "Pick your provider",
  consentLabel:
    "I'm the account holder and happy for Cuckoo to manage my switch",
  accountNumberPrompt: "Enter your account number",
  accountNumberPlaceholder: "e.g: 178247bv",
  noMatchMessage:
    "Sorry, we couldn't match your details with the info we currently have. You can either skip this step, or add your current broadband account number and we'll try to find it again.",
  helpText:
    "You should be able to find your account number with your current provider on a recent bill, or in your online account.",
  tipSubtitle: "Good to know:",
  tipText:
    "This process is designed to make it easy to switch to Cuckoo, but if you'd rather let your provider know yourself, just hit 'skip this step'.",
  tipTextHighlight: "let your provider know yourself",
  firstAttemptFailTitle: "We need a bit more info.",
  firstAttemptFailText:
    "Sorry, we couldn't match your details with the info we currently have. You can either skip this step, or add your current broadband account number and we'll try to find it again.",
  skipButtonText: "Skip this step",
  retryButtonText: "Retry",
  submitButtonText: "Match my details",
  loadingButtonText: "Checking...",
  errorMessage: "An error occurred while processing your request",
};

export const slides: LoadingModalSlide[] = [
  {
    src: "/images/megaphone-animated.gif",
    message: "Crossing all the T's and dotting all the I's",
  },
  {
    src: "/images/news-animated.gif",
    message: "What do those T's and I's stand for anyway?",
  },
  {
    src: "/images/egg-animated.gif",
    message: "Never mind - we're very nearly there...",
  },
];
