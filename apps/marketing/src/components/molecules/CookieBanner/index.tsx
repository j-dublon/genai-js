"use client";
// TODO: REPLACE THIS WITH REAL COOKIE BANNER

import { useState } from "react";

import { ConsentParams, useCookieNotice } from "@/contexts/cookieNotice";

export default function Banner() {
  const [showBanner, setShowBanner] = useState(true);
  const cookieNotice = useCookieNotice();

  const handleAcceptCookies = () => {
    const prefs: ConsentParams = {
      functionality_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
      personalization_storage: "granted",
      security_storage: "granted",
      ads_backend_tracking: "granted",
    };
    cookieNotice.save(prefs);
    setShowBanner(false);
  };

  const handleDeclineCookies = () => {
    const prefs: ConsentParams = {
      functionality_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      personalization_storage: "denied",
      security_storage: "denied",
      ads_backend_tracking: "denied",
    };
    cookieNotice.save(prefs);
    setShowBanner(false);
  };

  return (
    <div>
      {showBanner && (
        <div>
          <p>
            We use tracking cookies to understand how you use the product and
            help us improve it. Please accept cookies to help us improve.
          </p>
          <button type="button" onClick={handleAcceptCookies}>
            Accept cookies
          </button>
          <span> </span>
          <button type="button" onClick={handleDeclineCookies}>
            Decline cookies
          </button>
        </div>
      )}
    </div>
  );
}
