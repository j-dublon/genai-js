"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Address = {
  line1: string;
  line2?: string;
  line3?: string;
  postcode: string;
  addressKey: string;
  addressKeyType: string;
  naduprn?: string;
};

export type PersonalDetails = {
  firstName: string;
  lastName: string;
  phone: string;
  hasSmartphone: "yes" | "no"; //Keep this as a string due to react hook form needing string values
  email: string;
  confirmEmail: string;
  marketingConsent?: boolean;
  verificationCode: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  residencyDuration: "over-year" | "under-year";
  personalDetailsStep: "details" | "verification" | "additional";
  personalDetailsCompleted?: boolean;
};

export type EeroProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  isSelected: boolean;
};

export type BroadbandProvider = {
  id: string;
  name: string;
  description: string;
};

export type SwitchingDetails = {
  isWillingToSwitch: boolean;
  currentProvider?: BroadbandProvider;
  switchOrderReference?: string;
};

export type PaymentDetails = {
  accountholderName: string;
  cardToken: string;
  accountNumber?: string;
  sortCode?: string;
  billingAddress: Address | null;
  sameAsServiceAddress?: boolean;
  termsAgreed: boolean;
  directDebitAgreed: boolean;
  creditSearchAgreed: boolean;
  allTermsAgreed: boolean;
};

export type GoLiveDetails = {
  selectedDate: string;
  engineerSlot?: {
    date: string;
    timeSlot: string;
  };
};

export type BroadbandPackage = {
  id: string;
  name: string;
  speed: {
    download: number;
    upload: number;
  };
  price: {
    monthly: number;
    setup: number;
  };
  priceIncrease: {
    nextYearIncrease: number;
    followingYearIncrease: number;
  };
  contractLength: number;
  description: string;
  features?: string[];
};

export type JoinFlowState = {
  _hasHydrated: boolean;
  currentStep: number;
  selectedPackage: BroadbandPackage | null;
  serviceAddress: Address | null;
  personalDetails: PersonalDetails | null;
  eeroSelection: EeroProduct | null;
  switchingDetails: SwitchingDetails | null;
  paymentDetails: PaymentDetails | null;
  goLiveDetails: GoLiveDetails | null;

  // Actions
  setHasHydrated: (state: boolean) => void;
  setCurrentStep: (step: number) => void;
  selectPackage: (pkg: BroadbandPackage) => void;
  setServiceAddress: (address: Address) => void;
  setPersonalDetails: (details: PersonalDetails) => void;
  selectEeroProduct: (product: EeroProduct) => void;
  setSwitchingDetails: (details: SwitchingDetails) => void;
  setPaymentDetails: (details: PaymentDetails) => void;
  setGoLiveDetails: (details: GoLiveDetails) => void;
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
      personalDetails: null,
      eeroSelection: null,
      switchingDetails: null,
      paymentDetails: null,
      goLiveDetails: null,

      // Actions
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      setCurrentStep: (step) => set({ currentStep: step }),
      selectPackage: (pkg) => set({ selectedPackage: pkg, currentStep: 1 }),
      setServiceAddress: (address) => set({ serviceAddress: address }),
      setPersonalDetails: (details) => set({ personalDetails: details }),
      selectEeroProduct: (product) => set({ eeroSelection: product }),
      setSwitchingDetails: (details) => set({ switchingDetails: details }),
      setPaymentDetails: (details) => set({ paymentDetails: details }),
      setGoLiveDetails: (details) => set({ goLiveDetails: details }),
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
