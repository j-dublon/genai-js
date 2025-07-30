import { LoadingModalSlide } from "@/hooks/useLoadingModal";

export const paymentDetailsText = {
  title: "Your payment details",
  subtitle:
    "Add all your bank details below and double-check we've got the right info for you.",
  addressDetailsTitle: "Your address",
  paymentDetailsTitle: "Enter your bank account details",
  directDebitDetailsTitle: "Your Direct Debit payment details",
  monthlyPaymentTitle: "Your monthly payment",
  totalMonthlyPaymentTitle: "Your total monthly payment",
  accountholderNamePlaceholder: "Account holder name",
  accountholderNameError: "Account holder name is required",
  accountNumberPlaceholder: "Account number",
  confirmAccountHolder: "I confirm that I'm the account holder",
  sortCodePlaceholder: "Sort code",
  validationErrorMessage:
    "Unable to validate bank details, please check your details and try again.",
  backButtonText: "Back",
  submitButtonText: "Next",
  submittingButtonText: "Processing...",
  saveBillingAddress: "Save Billing Address",
  tipCardText: "You can always add or remove eeros in your account later.",
  tipCardSubtitle: "Good to know:",
};

export const slides: LoadingModalSlide[] = [
  {
    src: "/images/world-animated.gif",
    message: "Nesting your order safely...",
  },
  {
    src: "/images/sunglasses-animated.gif",
    message: "Just finalising the contract so everything's sunny side up.",
  },
  {
    src: "/images/rocket-animated.gif",
    message: "You're one peck away from broadband bliss!",
  },
];
