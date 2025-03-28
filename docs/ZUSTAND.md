# Join Flow Store

## Overview

This store manages the state for the multi-step join flow, handling user progress through the journey from package selection to order confirmation. It uses Zustand with persistence to maintain state across page refreshes.

Our key is named "cuckoo-join-flow-storage", and this can be seen persisted in the network tab localStorage

## Features

- **Persistent storage**: User progress is saved in localStorage
- **Type-safe**: Full TypeScript support
- **Hydration tracking**: Prevents race conditions with localStorage
- **Step management**: Tracks current step and prevents illegal navigation

For information on hydration tracking:

https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md#hydration-and-asynchronous-storages

## Store Structure

### State

| Property            | Type                        | Description                                     |
| ------------------- | --------------------------- | ----------------------------------------------- |
| `_hasHydrated`      | `boolean`                   | Indicates if store has loaded from localStorage |
| `currentStep`       | `number`                    | Current step in the flow (0-6)                  |
| `selectedPackage`   | `BroadbandPackage \| null`  | User's selected broadband package               |
| `personalDetails`   | `PersonalDetails \| null`   | User's personal and address details             |
| `eeroSelection`     | `EeroProduct \| null`       | Selected WiFi router option                     |
| `switchingDetails`  | `SwitchingDetails \| null`  | Current provider and switching details          |
| `goLiveDetails`     | `GoLiveDetails \| null`     | Selected installation date and time             |
| `paymentDetails`    | `PaymentDetails \| null`    | User's payment method information               |
| `priceIncreaseInfo` | `PriceIncreaseInfo \| null` | Information about future price increases        |

### Actions

| Action                 | Parameters                  | Description                               |
| ---------------------- | --------------------------- | ----------------------------------------- |
| `setHasHydrated`       | `state: boolean`            | Updates hydration status                  |
| `setCurrentStep`       | `step: number`              | Sets the current step                     |
| `selectPackage`        | `pkg: BroadbandPackage`     | Selects a broadband package               |
| `setPersonalDetails`   | `details: PersonalDetails`  | Stores personal details                   |
| `selectEeroProduct`    | `product: EeroProduct`      | Selects a WiFi router option              |
| `setSwitchingDetails`  | `details: SwitchingDetails` | Sets provider switching details           |
| `setGoLiveDetails`     | `details: GoLiveDetails`    | Sets installation date and time           |
| `setPaymentDetails`    | `details: PaymentDetails`   | Stores payment information                |
| `setPriceIncreaseInfo` | `info: PriceIncreaseInfo`   | Sets future price increase info           |
| `resetFlow`            | none                        | Clears all flow data and resets to step 0 |

## Usage

### Basic Usage

```tsx
import useJoinFlowStore from "@/store/useJoinFlowStore";

const MyComponent = () => {
  const { currentStep, selectedPackage, selectPackage } = useJoinFlowStore();

  return (
    <div>
      <h2>Current step: {currentStep}</h2>
      {selectedPackage ? (
        <p>Selected: {selectedPackage.name}</p>
      ) : (
        <p>No package selected</p>
      )}

      <button onClick={() => selectPackage(somePackage)}>Select Package</button>
    </div>
  );
};
```
