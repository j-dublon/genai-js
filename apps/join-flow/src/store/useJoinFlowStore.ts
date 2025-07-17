"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  AffiliateSessionSuccess,
  QuoteLookupSuccess,
} from "@/services/payloadTypes";

import {
  EngineerAppointment,
  NewSaleQuoteLookup,
  RegradeQuoteLookup,
  RenewalQuoteLookup,
  SwitchMatchLookup,
  VulnerabilityAndAccessibility,
} from "../../payload-types";

export type AffiliateSession = {
  id: string;
  sessionId: string;
  affiliateName: string;
  displayItems: AffiliateSessionSuccess["response"]["displayItems"];
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
  code: string;
  family: string;
  selectionIdentifier: string;
  price: number;
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
  accountNumber?: string;
  sortCode?: string;
  billingAddress: Omit<StoreAddress, "identifiers"> | undefined;
  sameAsServiceAddress?: boolean;
  termsAgreed: boolean;
  isAccountHolder: boolean;
  directDebitAgreed: boolean;
  creditSearchAgreed: boolean;
  allTermsAgreed: boolean;
};

export type GoLiveDetails = {
  selectedDate: string;
  engineerTimeSlot?: {
    startDateTime: string;
    endDateTime: string;
    selectionIdentifier: string;
  };
};

export type AccessibilityRequirements = {
  blindVisionImpaired?: boolean;
  deafOrHardOfHearing?: boolean;
  neurodivergent?: boolean;
  learningDisability?: boolean;
  thirdPartyAssistance?: boolean;
  thirdPartyName?: string;
  thirdPartyPhone?: string;
  thirdPartyEmail?: string;
  physicalIllness?: boolean;
  physicalDisability?: boolean;
  communicationDifficulties?: boolean;
  otherIllness?: boolean;
  additionalInformation?: string;
};

type ContactPreference =
  | { audio: true; braille?: false; largePrint?: false }
  | { braille: true; audio?: false; largePrint?: false }
  | { largePrint: true; audio?: false; braille?: false };

type ContentType =
  | { monthlyBills: true; cics?: boolean; termsAndConditions?: boolean }
  | { monthlyBills?: boolean; cics: true; termsAndConditions?: boolean }
  | { monthlyBills?: boolean; cics?: boolean; termsAndConditions: true };

export type AccessibilityCommunicationPreferences = {
  contentTypes: ContentType;
  contactPreferences: ContactPreference;
};

type Promotion = {
  id: string;
  term?: "wholeContract" | null;
  value?:
    | (
        | {
            value: number;
            id?: string | null;
            blockType: "percentageBased";
          }
        | {
            value: number;
            id?: string | null;
            blockType: "fixedValue";
          }
      )[]
    | null;
};

export type Offer =
  | {
      blockType: "giftCardBlock";
      value: number;
    }
  | {
      blockType: "promotionBlock";
      promotion: Promotion;
    }
  | {
      blockType: "billCreditBlock";
      value: number;
      isDiscretionary?: boolean | null;
    };

export type StoreSelectedPackage = {
  krakenProductCode: string;
  frontendIdentifier: string;
  frontendTitle: string;
  termMonths: number;
  selectionIdentifier: string;
  installationRequired: boolean;
  appliedPromotionUUIDs?:
    | {
        id: string | null;
      }[]
    | null;
  prices: {
    basePrice: number;
    discountedPrice: number;
    annualPriceRise?:
      | {
          price: number;
          date: string;
          id?: string | null;
        }[]
      | null;
  };
  speeds: {
    download: number;
    upload: number;
  };
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
              family: string;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  offers?: Offer[] | null;
  id?: string | null;
};

export type StoreBasket = {
  id: string;
  locked?: boolean | null;
  optIns?: {
    termsAgreed?: boolean | null;
    directDebitAgreed?: boolean | null;
    creditSearchAgreed?: boolean | null;
    isAccountHolder?: boolean | null;
    hasSmartPhone?: boolean | null;
    marketingConsent?: boolean | null;
  };
  product?: {
    quoteLookup?:
      | ({
          relationTo: "newSaleQuoteLookups";
          value: string | NewSaleQuoteLookup;
        } | null)
      | ({
          relationTo: "regradeQuoteLookups";
          value: string | RegradeQuoteLookup;
        } | null)
      | ({
          relationTo: "renewalQuoteLookups";
          value: string | RenewalQuoteLookup;
        } | null);
    selectionIdentifier?: string | null;
    extras?:
      | { family: string; selectionIdentifier: string; id?: string | null }[]
      | null;
  };
  engineer?: {
    engineerAppointment?: (string | null) | EngineerAppointment;
    selectionIdentifier?: string | null;
  };
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
    bankAccountHolder?: string | null;
    bankAccountNumber?: string | null;
    bankSortCode?: string | null;
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
  vulnerabilityAndAccessibility?:
    | (string | null)
    | VulnerabilityAndAccessibility;
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
  accessibilityCommunicationPreferences: AccessibilityCommunicationPreferences | null;
  quoteResponse: QuoteLookupSuccess | null;
  basket: StoreBasket | null;
  softCreditCheck: SoftCreditCheck | null;
  roiPostcode: string | null;
  isLoadingModalOpen: boolean;

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
  setAccessibilityCommunicationPreferences: (
    preferences: AccessibilityCommunicationPreferences | null,
  ) => void;
  setBasket: (basket: StoreBasket) => void;
  setSoftCreditCheck: (softCreditCheck: SoftCreditCheck) => void;
  setRoiPostcode: (roiPostcode: string | null) => void;
  setIsLoadingModalOpen: (open: boolean) => void;
  resetFlow: () => void;
  resetAffiliateSession: () => void;
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
      accessibilityCommunicationPreferences: null,
      quoteResponse: null,
      basket: null,
      softCreditCheck: null,
      roiPostcode: null,
      isLoadingModalOpen: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      setCurrentStep: (step) => set({ currentStep: step }),
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
      setAccessibilityCommunicationPreferences: (preferences) =>
        set({ accessibilityCommunicationPreferences: preferences }),
      setQuoteResponse: (response) => set({ quoteResponse: response }),
      setBasket: (basket) => set({ basket }),
      setSoftCreditCheck: (softCreditCheck) => set({ softCreditCheck }),
      setRoiPostcode: (roiPostcode) => set({ roiPostcode }),
      setIsLoadingModalOpen: (open) => set({ isLoadingModalOpen: open }),
      resetFlow: () =>
        set({
          currentStep: 0,
          selectedPackage: null,
          billingAddress: null,
          serviceAddress: null,
          personalDetails: null,
          eeroSelection: null,
          switchingDetails: null,
          paymentDetails: null,
          goLiveDetails: null,
          accessibilityRequirements: null,
          accessibilityCommunicationPreferences: null,
          quoteResponse: null,
          basket: null,
          softCreditCheck: null,
          roiPostcode: null,
          isLoadingModalOpen: false,
        }),
      resetAffiliateSession: () => set({ affiliateSession: null }),
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
