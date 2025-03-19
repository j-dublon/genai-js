export interface PaymentDetailsProps {
  title: string;
  paymentDetailsTitle: string;
  directDebitDetailsTitle: string;
  packageSpeedLabel: string;
  monthlyPaymentTitle: string;
  monthlyLabel: string;
  totalMonthlyPaymentTitle: string;
  accountHolderNamePlaceholder: string;
  accountHolderNameError: string;
  accountNumberPlaceholder: string;
  accountNumberError: string;
  futurePriceIncreaseText: string;
  sortCodePlaceholder: string;
  sortCodeError: string;
  backButtonText: string;
  submitButtonText: string;
  submittingButtonText: string;
  signUpText: string;
  termsAndConditionsTitle: string;
  termsCheckboxText: string;
  directDebitCheckboxText: string;
  creditSearchCheckboxText: string;
}

export const paymentDetailsText: PaymentDetailsProps = {
  title: "Payment Details",
  paymentDetailsTitle: "Please enter your bank account details",
  directDebitDetailsTitle: "Your direct debit payment details",
  monthlyPaymentTitle: "Your monthly payment",
  totalMonthlyPaymentTitle: "Your total monthly payment",
  packageSpeedLabel: "Mbps download / Mbps upload",
  monthlyLabel: "per month",
  accountHolderNamePlaceholder: "Account holder name",
  accountHolderNameError: "Account holder name is required",
  accountNumberPlaceholder: "Account number",
  futurePriceIncreaseText: "From April 1 2026 an increase of £",
  accountNumberError: "Valid 8-digit account number is required",
  sortCodePlaceholder: "Sort code",
  sortCodeError: "Valid sort code (xx-xx-xx) is required",
  backButtonText: "Back",
  submitButtonText: "Next",
  submittingButtonText: "Processing...",
  signUpText: "Sign me up",
  termsAndConditionsTitle: "Terms & Conditions",
  termsCheckboxText:
    "I agree to Cuckoo's Terms & Conditions and I've read Cuckoo's Privacy Notice and Contract Summary",
  directDebitCheckboxText:
    "I confirm I'm authorised to make Direct Debits using the account details provided",
  creditSearchCheckboxText:
    "I agree to a credit search being carried out on my file",
};
