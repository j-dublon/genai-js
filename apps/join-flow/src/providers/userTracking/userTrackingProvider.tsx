import { Suspense } from "react";

import { UserTracking } from "./userTracking";

interface UserTrackingProviderProps {
  children: React.ReactNode;
}

export const UserTrackingProvider = ({
  children,
}: UserTrackingProviderProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserTracking>{children}</UserTracking>
    </Suspense>
  );
};
