import { LoadingModalSlide } from "@/hooks/useLoadingModal";

export const paymentDetailsText = {
  title: "Payment Details",
  addressDetailsTitle: "Your addresses",
  paymentDetailsTitle: "Please enter your bank account details",
  directDebitDetailsTitle: "Your direct debit payment details",
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
