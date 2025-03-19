import {
  BroadbandPackage,
  BroadbandProvider,
  EeroProduct,
} from "../store/useJoinFlowStore";

// Broadband packages based on current Cuckoo offerings
export const broadbandPackages: BroadbandPackage[] = [
  {
    id: "c-150",
    name: "C-150",
    speed: {
      download: 150,
      upload: 30,
    },
    price: {
      monthly: 32,
      setup: 0,
    },
    contractLength: 12,
    description: "Full fibre speeds",
  },
  {
    id: "c-500",
    name: "C-500",
    speed: {
      download: 500,
      upload: 20,
    },
    price: {
      monthly: 37,
      setup: 0,
    },
    contractLength: 12,
    description: "Full fibre speeds",
  },
  {
    id: "c-900",
    name: "C-900",
    speed: {
      download: 1000,
      upload: 100,
    },
    price: {
      monthly: 54.99,
      setup: 0,
    },
    contractLength: 12,
    description: "Full fibre speeds",
  },
];

export const eeroProducts: EeroProduct[] = [
  {
    id: "eero-6",
    name: "eero 6",
    description: "Add one extra eero",
    price: 5.0,
    isSelected: false,
  },
  {
    id: "eero-6-plus",
    name: "eero 6 Plus",
    description: "Add one two extra eeros",
    price: 7.5,
    isSelected: false,
  },
  {
    id: "no-eero",
    name: "No eero device",
    description: "Use your own router with our service.",
    price: 0,
    isSelected: true,
  },
];

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
  { id: "other", name: "Other", description: "Other broadband provider" },
];

// Mock response for address lookup
export const mockAddressLookupResponse = {
  addresses: [
    {
      line1: "10 Downing Street",
      line2: "",
      line3: "",
      postcode: "SW1A 2AA",
      addressKey: "UPRN10000000001",
      addressKeyType: "UPRN",
      naduprn: "10000000001",
    },
    {
      line1: "11 Downing Street",
      line2: "",
      line3: "",
      postcode: "SW1A 2AB",
      addressKey: "UPRN10000000002",
      addressKeyType: "UPRN",
      naduprn: "10000000002",
    },
  ],
};

// Mock available installation dates
export const availableInstallationDates = [
  {
    date: "2025-03-15",
    slots: [
      { id: "1", timeSlot: "8:00 - 10:00" },
      { id: "2", timeSlot: "10:00 - 12:00" },
      { id: "3", timeSlot: "13:00 - 15:00" },
      { id: "4", timeSlot: "15:00 - 17:00" },
    ],
  },
  {
    date: "2025-03-16",
    slots: [
      { id: "5", timeSlot: "8:00 - 10:00" },
      { id: "6", timeSlot: "10:00 - 12:00" },
      { id: "7", timeSlot: "13:00 - 15:00" },
    ],
  },
  {
    date: "2025-03-17",
    slots: [
      { id: "8", timeSlot: "10:00 - 12:00" },
      { id: "9", timeSlot: "13:00 - 15:00" },
      { id: "10", timeSlot: "15:00 - 17:00" },
    ],
  },
];

// Mock switching response
export const mockSwitchingResponse = {
  switchOrderReference: "SOR123456789",
  services: [
    {
      type: "BROADBAND",
      information: {
        networkOperator: "BT",
        description: "BT Superfast Fibre 2",
      },
    },
  ],
};
