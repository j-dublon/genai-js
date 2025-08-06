import { LoadingModalSlide } from "@/hooks/useLoadingModal";
import { getAssetPath } from "@/lib/get-asset-path";

export const paymentConfirmationText = {
  title: "Review your info and join",
  accountHolderLabel: "Account holder",
  accountNumberLabel: "Account number",
  addressDetailsLabel: "Your home and installation address",
  accountDetailsTitle: "Your account details",
  billingAddressLabel: "Your billing address",
  goLiveDetailsTitle: "Your go live date",
  directDebitDetailsTitle: "Your direct debit payment details",
  monthlyPaymentTitle: "Your monthly payment",
  totalMonthlyPaymentTitle: "Your total monthly payment",
  backButtonText: "Back",
  sortCodeLabel: "Sort code",
  signUpText: "Sign me up",
  yourAgreementTitle: "Your agreement",
  yourAgreementText:
    "By agreeing, you’re confirming that you’ve read, downloaded and understood the following before joining Cuckoo: Contract Information, Contract Summary, Our Terms & Conditions and Privacy Notice",
  termsCheckboxText:
    "I’ve read and consented to Cuckoo’s Contract Summary, Terms & Conditions and Privacy Notice",
  directDebitCheckboxText:
    "I confirm I'm authorised to make Direct Debits using the account details provided",
  creditSearchCheckboxText:
    "I agree to a credit search being carried out on my file",
  creditSearchHref:
    "https://www.transunion.co.uk/consumer/credit-report-help/what-is-a-search-on-my-credit-report",
  eeroProductContent: [
    {
      code: "EERO_MESH_ROUTER_X1",
      heading: "No additional Eero needed",
      description: "Just one eero provided by us.",
      totalCount: 1,
      imageURL: getAssetPath("/images/x1_eeros.png"),
    },
    {
      code: "EERO_MESH_ROUTER_X2",
      heading: "Add one extra eero to your plan",
      description:
        "2 eeros will cover an area of approximately XXX square metres and is perfect for most UK homes.",
      totalCount: 2,
      imageURL: getAssetPath("/images/x2_eeros.png"),
    },
    {
      code: "EERO_MESH_ROUTER_X3",
      heading: "Add 2 extra eeros to your plan",
      description:
        "3 eero routers will cover an area of approximately XXX square metres, and is perfect for really large homes, multiple floors and connection outside.",
      totalCount: 3,
      imageURL: getAssetPath("/images/x3_eeros.png"),
    },
  ],
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
