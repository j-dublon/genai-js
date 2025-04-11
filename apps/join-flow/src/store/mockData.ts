//TO DO: DEPRECATE THIS AND COLOCATE THEM NEXT TO THEIR INDIVIDUAL PAGES AS PROPS

import { BroadbandProvider } from "../store/useJoinFlowStore";

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
