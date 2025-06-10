"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { QuoteLookupSuccess } from "@/services/payloadTypes";

import { Affiliate, QuoteLookup, SwitchMatchLookup } from "../../payload-types";

export type AffiliateSession = {
  id: string;
  sessionId: string;
  affiliateName: string;
  useCreditcheckResult: boolean;
  doEmailValidation: boolean;
  cuckooAffiliate: string | Affiliate;
};

export type StoreAddressIdentifier = {
  value: string;
  scheme: string;
  id: string;
};

export type StoreAddress = {
  line1: string;
  line2: string;
  line3: string;
  postcode: string;
  identifiers: StoreAddressIdentifier[];
};

export type ExtendedStoreAddress = StoreAddress & {
  id: string; //Keep this as a string due to react hook form needing string values
  selectionIdentifier: string;
};

export type PersonalDetails = {
  firstName: string;
  lastName: string;
  phone: string;
  hasSmartphone: "yes" | "no";
  email: string;
  confirmEmail: string;
  marketingConsent?: boolean;
  isVerified: boolean;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  residencyDuration: "over-year" | "under-year" | null;
  personalDetailsStep: "details" | "verification" | "additional";
  personalDetailsCompleted?: boolean;
  requiresLandline: boolean;
};

export type EeroProduct = {
  id: string;
  name: string;
  heading?: string | null;
  imageURL?: string | null;
  description?: string;
  totalCount?: number | null;
  price: number;
  isSelected: boolean;
};

export type BroadbandProvider = {
  losingRcpid: string;
  name: string;
};

export type OTSSwitchStatus =
  | "FIRST_ATTEMPT_FAILED"
  | "SWITCH_SUCCESS"
  | "OTS_FAILED"
  | "SKIPPED";

export type SwitchingDetails = {
  currentProvider?: BroadbandProvider;
  switchOrderReference?: string;
  otsSwitchStatus: OTSSwitchStatus;
};

export type PaymentDetails = {
  accountholderName: string;
  cardToken: string;
  accountNumber?: string;
  sortCode?: string;
  billingAddress: StoreAddress | null;
  sameAsServiceAddress?: boolean;
  termsAgreed: boolean;
  isAccountHolder: boolean;
  directDebitAgreed: boolean;
  creditSearchAgreed: boolean;
  allTermsAgreed: boolean;
};

export type GoLiveDetails = {
  selectedDate: string;
  engineerSlot?: { date: string; timeSlot: string };
};

export type AccessibilityRequirements = {
  visionImpaired?: boolean;
  hearingImpaired?: boolean;
  neurodiverse?: boolean;
  learningDisability?: boolean;
  thirdPartyAssistance?: boolean;
  thirdPartyName?: string;
  thirdPartyPhone?: string;
  thirdPartyEmail?: string;
  physicalIllness?: boolean;
  physicalDisability?: boolean;
  communicationNeeds?: boolean;
  mentalIllness?: boolean;
  additionalInformation?: string;
};

export type BroadbandPackage = {
  id: string;
  name: string;
  speed: { download: number; upload: number };
  price: { monthly: number; setup: number };
  priceIncrease: { nextIncrease: number; followingIncrease: number };
  contractLength: number;
  description: string;
  features?: string[];
};

export type GiftcardCampaign = {
  id: string;
  name: string;
  campaignIdentifier: string;
  updatedAt: string;
  createdAt: string;
};

export type Promotion = {
  id: string;
  name: string;
  krakenPromotionCode: string;
  term?: "wholeContract" | null;
  value?:
    | (
        | {
            value: number;
            id?: string | null;
            blockName?: string | null;
            blockType: "percentageBased";
          }
        | {
            value: number;
            id?: string | null;
            blockName?: string | null;
            blockType: "fixedValue";
          }
      )[]
    | null;
  updatedAt: string;
  createdAt: string;
};

export type StoreSelectedPackage = {
  krakenProductCode: string;
  frontendIdentifier: string;
  termMonths: string;
  selectionIdentifier: string;
  installationRequired: boolean;
  appliedPromotionUUIDs?: { id: string | null }[] | null;
  prices: {
    basePrice: number;
    discountedPrice: number;
    annualPriceRise?:
      | { price: number; date: string; id?: string | null }[]
      | null;
  };
  speeds: { download: number; upload: number };
  extras?:
    | {
        family: string;
        availableExtras?:
          | {
              code: string;
              name: string;
              description: string;
              price: number;
              selectionIdentifier: string;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  offers?:
    | (
        | {
            campaign: string | GiftcardCampaign;
            value: number;
            id?: string | null;
            blockName?: string | null;
            blockType: "giftCard";
          }
        | {
            promotion: string | Promotion;
            id?: string | null;
            blockName?: string | null;
            blockType: "promotion";
          }
        | {
            value: number;
            isDiscretionary?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "billCredit";
          }
      )[]
    | null;
  id?: string | null;
};

export type StoreBasket = {
  id: string;
  locked?: boolean | null;
  product?: {
    quoteLookup?: (string | null) | QuoteLookup;
    selectionIdentifier?: string | null;
    extras?:
      | { family: string; selectionIdentifier: string; id?: string | null }[]
      | null;
  };
  engineer?: { selectionIdentifier?: string | null };
  goLiveDate?: string | null;
  addressHistory?:
    | {
        line1?: string | null;
        line2?: string | null;
        line3?: string | null;
        postcode?: string | null;
        id?: string | null;
      }[]
    | null;
  billingAddress?: {
    line1?: string | null;
    line2?: string | null;
    line3?: string | null;
    postcode?: string | null;
  };
  payment?: {
    accountHolder?: string | null;
    accountNumber?: string | null;
    sortCode?: string | null;
  };
  personalDetails?: {
    firstName?: string | null;
    lastName?: string | null;
    dateOfBirth?: string | null;
    email?: string | null;
    phone?: string | null;
  };
  switchMatchLookup?: (string | null) | SwitchMatchLookup;
  sales?: {
    discretionaryBillCreditsAmount?: number | null;
  };
  cics?: {
    summaryHref?: string | null;
    informationHref?: string | null;
  };
  updatedAt: string;
  createdAt: string;
};

export type SoftCreditCheck = {
  latestStatus: "PASSED" | "FAILED" | "NO_MATCH" | null;
  attempts: number;
};

export type JoinFlowState = {
  _hasHydrated: boolean;
  currentStep: number;
  selectedPackage: StoreSelectedPackage | null;
  serviceAddress: StoreAddress | null;
  billingAddress: StoreAddress | null;
  personalDetails: PersonalDetails | null;
  eeroSelection: EeroProduct | null;
  switchingDetails: SwitchingDetails | null;
  paymentDetails: PaymentDetails | null;
  goLiveDetails: GoLiveDetails | null;
  affiliateSession: AffiliateSession | null;
  accessibilityRequirements: AccessibilityRequirements | null;
  quoteResponse: QuoteLookupSuccess | null;
  basket: StoreBasket | null;
  softCreditCheck: SoftCreditCheck | null;

  // Actions
  setHasHydrated: (state: boolean) => void;
  setCurrentStep: (step: number) => void;
  selectPackage: (pkg: StoreSelectedPackage) => void;
  setServiceAddress: (address: ExtendedStoreAddress) => void;
  setBillingAddress: (address: StoreAddress) => void;
  setPersonalDetails: (details: PersonalDetails) => void;
  selectEeroProduct: (product: EeroProduct) => void;
  setSwitchingDetails: (details: SwitchingDetails) => void;
  setPaymentDetails: (details: PaymentDetails) => void;
  setAffiliateSession: (session: AffiliateSession) => void;
  setGoLiveDetails: (details: GoLiveDetails) => void;
  setQuoteResponse: (response: QuoteLookupSuccess) => void;
  setAccessibilityRequirements: (
    requirements: AccessibilityRequirements | null,
  ) => void;
  setBasket: (basket: StoreBasket) => void;
  setSoftCreditCheck: (softCreditCheck: SoftCreditCheck) => void;
  resetFlow: () => void;
};

// Create the store with persistence
const useJoinFlowStore = create<JoinFlowState>()(
  persist(
    (set) => ({
      _hasHydrated: false,
      currentStep: 0,
      selectedPackage: null,
      serviceAddress: null,
      billingAddress: null,
      personalDetails: null,
      eeroSelection: null,
      switchingDetails: null,
      paymentDetails: null,
      goLiveDetails: null,
      affiliateSession: null,
      accessibilityRequirements: null,
      quoteResponse: null,
      basket: null,
      softCreditCheck: null,

      setHasHydrated: (state) => set({ _hasHydrated: state }),
      setCurrentStep: (step) => set({ currentStep: step }),
      // BROADBAND PACKAGE's selectpackage
      // selectPackage: (pkg) => set({ selectedPackage: pkg, currentStep: 1 }),
      selectPackage: (pkg) =>
        set({
          selectedPackage: pkg,
          currentStep: 1,
        }),
      setServiceAddress: (address) => set({ serviceAddress: address }),
      setBillingAddress: (address) => set({ billingAddress: address }),
      setPersonalDetails: (details) => set({ personalDetails: details }),
      selectEeroProduct: (product) => set({ eeroSelection: product }),
      setSwitchingDetails: (details) => set({ switchingDetails: details }),
      setPaymentDetails: (details) => set({ paymentDetails: details }),
      setGoLiveDetails: (details) => set({ goLiveDetails: details }),
      setAffiliateSession: (session) => set({ affiliateSession: session }),
      setAccessibilityRequirements: (requirements) =>
        set({ accessibilityRequirements: requirements }),
      setQuoteResponse: (response) => set({ quoteResponse: response }),
      setBasket: (basket) => set({ basket }),
      setSoftCreditCheck: (softCreditCheck) => set({ softCreditCheck }),
      resetFlow: () =>
        set({
          currentStep: 0,
          selectedPackage: null,
          serviceAddress: null,
          personalDetails: null,
          eeroSelection: null,
          switchingDetails: null,
          paymentDetails: null,
          goLiveDetails: null,
          affiliateSession: null,
          accessibilityRequirements: null,
          quoteResponse: null,
          basket: null,
          softCreditCheck: null,
        }),
    }),
    {
      name: "cuckoo-join-flow-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          useJoinFlowStore.setState({ _hasHydrated: true });
        }
      },
    },
  ),
);

export default useJoinFlowStore;
