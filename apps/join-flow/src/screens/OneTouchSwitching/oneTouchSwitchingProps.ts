import { BroadbandProvider } from "@/store/useJoinFlowStore";

// UK broadband providers for the switching service
export const broadbandProviders: BroadbandProvider[] = [
  { id: "bt", name: "BT", description: "British Telecom" },
  { id: "sky", name: "Sky", description: "Sky Broadband" },
  { id: "virgin", name: "Virgin Media", description: "Virgin Media Broadband" },
  { id: "talktalk", name: "TalkTalk", description: "TalkTalk Broadband" },
  { id: "vodafone", name: "Vodafone", description: "Vodafone Broadband" },
  { id: "plusnet", name: "Plusnet", description: "Plusnet Broadband" },
  { id: "ee", name: "EE", description: "EE Broadband" },
  { id: "shell", name: "Shell Energy", description: "Shell Energy Broadband" },
  { id: "RTLL", name: "NowYoYo", description: "NowYoYo Broadband" },
  { id: "other", name: "Other", description: "Other broadband provider" },
];

export const oneTouchSwitchingText = {
  title: "Switching to Cuckoo",
  subtitle:
    "We'll tell your current broadband provider that you're leaving them and joining us, so you won't have to. They'll let you know if there are any final charges from them. Find out more about one touch switching",
  providerSelectionTitle:
    "Select your current broadband provider from the list",
  oneTouchExplanation: "Find out more about One Touch Switching",
  providerSelectorDefault: "Pick your provider",
  consentLabel:
    "I'm the accountholder and happy for Cuckoo to manage my switch",
  accountNumberPrompt: "Enter your account number",
  accountNumberPlaceholder: "Enter your account number",
  noMatchMessage: "We could not match your details currently",
  skipButtonText: "Skip this step",
  submitButtonText: "Match my details",
  loadingButtonText: "Checking...",
  errorMessage: "An error occurred while processing your request",
};
