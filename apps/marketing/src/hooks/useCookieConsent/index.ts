import { useEffect, useState } from "react";

import { ConsentParams } from "@/contexts/CookieNotice";

type ConsentGrants = {
  analyticsConsent: boolean;
  adStorageConsent: boolean;
  personalizationConsent: boolean;
  adsBackendTrackingConsent: boolean;
};

const initialConsents: ConsentGrants = {
  analyticsConsent: false,
  adStorageConsent: false,
  personalizationConsent: false,
  adsBackendTrackingConsent: false,
};

const consentKeyMap = {
  analytics_storage: "analyticsConsent",
  ad_storage: "adStorageConsent",
  personalization_storage: "personalizationConsent",
  ads_backend_tracking: "adsBackendTrackingConsent",
} as const;

const LOCAL_STORAGE_KEY = "cookieNotice";

export const useHasConsent = (): ConsentGrants => {
  const [consents, setConsents] = useState<ConsentGrants>(initialConsents);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const checkConsent = () => {
      try {
        const storedConsent = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (!storedConsent) {
          setConsents(initialConsents);
          return;
        }

        const consentData = JSON.parse(storedConsent) as ConsentParams;
        const updatedConsents = Object.entries(
          consentKeyMap,
        ).reduce<ConsentGrants>(
          (acc, [paramKey, grantKey]) => ({
            ...acc,
            [grantKey]:
              consentData[paramKey as keyof ConsentParams] === "granted",
          }),
          initialConsents,
        );

        setConsents(updatedConsents);
      } catch (error) {
        console.error("Error reading cookie consent:", error);
      }
    };

    checkConsent();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === LOCAL_STORAGE_KEY) {
        checkConsent();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return consents;
};
