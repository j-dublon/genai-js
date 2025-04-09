export interface PaymentDetailsProps {
  title: string;
  paymentDetailsTitle: string;
  directDebitDetailsTitle: string;
  packageSpeedLabel: string;
  monthlyPaymentTitle: string;
  monthlyLabel: string;
  totalMonthlyPaymentTitle: string;
  accountholderNamePlaceholder: string;
  accountholderNameError: string;
  accountNumberPlaceholder: string;
  accountNumberError: string;
  futurePriceIncreaseText: string;
  sortCodePlaceholder: string;
  sortCodeError: string;
  backButtonText: string;
  submitButtonText: string;
  submittingButtonText: string;
}

export const paymentDetailsText: PaymentDetailsProps = {
  title: "Payment Details",
  paymentDetailsTitle: "Please enter your bank account details",
  directDebitDetailsTitle: "Your direct debit payment details",
  packageSpeedLabel: "Mbps download / Mbps upload",
  monthlyPaymentTitle: "Your monthly payment",
  monthlyLabel: "per month",
  totalMonthlyPaymentTitle: "Your total monthly payment",
  accountholderNamePlaceholder: "Account holder name",
  accountholderNameError: "Account holder name is required",
  accountNumberPlaceholder: "Account number",
  accountNumberError: "Valid 8-digit account number is required",
  futurePriceIncreaseText: "From April 1 2026 an increase of £",
  sortCodePlaceholder: "Sort code",
  sortCodeError: "Valid sort code (xx-xx-xx) is required",
  backButtonText: "Back",
  submitButtonText: "Next",
  submittingButtonText: "Processing...",
};
