"use client";
import type { ParsedQuery } from "query-string";

// Google
const UTM_SOURCE = "utm_source";
const UTM_MEDIUM = "utm_medium";
const UTM_CAMPAIGN = "utm_campaign";
const utmParams = [UTM_SOURCE, UTM_MEDIUM, UTM_CAMPAIGN];

// Google Ads
const GOOGLE_ADS_ID = "gclid";
const googleAdsParams = [GOOGLE_ADS_ID];

// DTT
const DTT_REQID = "dtt_reqid";
const dttParams = [DTT_REQID];

// Convert Network
const CONVERT_UUID = "convert_uuid";
const CONVERT_NETWORK = "network";
const convertParams = [CONVERT_UUID, CONVERT_NETWORK];

// Partnerize
const PARTNERIZE_CLICK_REF = "clickref";
const partnerizeParams = [PARTNERIZE_CLICK_REF];

// Partners
const PARTNER = "partner";
const otherParams = [PARTNER];

const trackParams = [
  ...utmParams,
  ...dttParams,
  ...convertParams,
  ...partnerizeParams,
  ...otherParams,
  ...googleAdsParams,
];

/**
 * when the app first loads, we read the query params client-side and store them in sessionStorage.
 * If a user refreshes a page later in the journey, we do not want to lose the tracking params from when they first arrived,
 * which could happen when this block of code runs that 2nd time. For this reason, we check if ANY of the params are present
 * in the URL and only then do we replace the data in sessionStorage – that way we do not remove params when a user refreshes
 * a typical page on the site, which would not have any tracking params in it.
 */
export const userTrackingParams = (query: ParsedQuery): void => {
  if (
    Object.keys(query).length > 0 &&
    trackParams.some((name) => name in query)
  ) {
    trackParams.forEach((name) => {
      const value = query[name] as string;
      if (Array.isArray(value)) {
        // Use the first value if it's an array
        sessionStorage.setItem(name, value[0].trim());
      } else if (typeof value === "string" && value.trim() !== "") {
        sessionStorage.setItem(name, value.trim());
      } else {
        sessionStorage.removeItem(name);
      }
    });
  }
};
