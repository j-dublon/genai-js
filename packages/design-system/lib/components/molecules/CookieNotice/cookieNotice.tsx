"use client";
import { Button } from "@components/atoms/Button";
import { ScrollerVertical } from "@components/atoms/ScrollerVertical";
import { ConsentParams, useCookieNotice } from "@contexts/CookieNotice";
import { useEffect, useState } from "react";

import { cookieBannerProps } from "./cookieBannerProps";
import { Preferences } from "./preferences";

export const CookieNotice = () => {
  const [checkCookies, setCheckCookies] = useState(false);
  const cookieNotice = useCookieNotice();
  const [cookiePreferences, setCookiePreferences] = useState(
    cookieNotice.choices,
  );

  useEffect(() => {
    setCookiePreferences(cookieNotice.choices);
  }, [cookieNotice.choices]);

  const handleChoice = (allowAll?: boolean) => () => {
    const prefs: ConsentParams | null = allowAll
      ? {
          functionality_storage: "granted",
          ad_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "granted",
          analytics_storage: "granted",
          personalization_storage: "granted",
          security_storage: "granted",
          ads_backend_tracking: "granted",
        }
      : cookiePreferences;

    if (prefs === null)
      return console.error("There has been an error saving preferences");

    cookieNotice.save(prefs);
    setCheckCookies(false);
  };

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-notice-container"
      aria-modal="true"
      data-testid="cookie-notice"
      tabIndex={-1}
      className="ds:fixed ds:inset-0 ds:z-[1000] ds:flex ds:items-center ds:justify-center ds:bg-[#1F1F1F33] ds:bg-opacity-50 ds:backdrop-blur-sm"
    >
      <div className="ds:max-w-md ds:p-6 ds:mx-5 ds:border-2 ds:rounded-lg ds:border-ui-grey-300 ds:bg-ui-grey-100 ds:md:p-8 ds:md:text-center">
        {checkCookies ? (
          <>
            <ScrollerVertical maxHeight="50vh">
              <h1 className="ds:text-sm ds:font-semibold ds:md:text-md">
                {cookieBannerProps.cookie_header_two}
              </h1>
              <p className="ds:mt-2 ds:text-xxs ds:text-ui-grey-500">
                {cookieBannerProps.cookie_message_two}
                <a
                  className="ds:text-ui-link"
                  href="https://cuckoo.co/legal/cookie-policy"
                >
                  {" "}
                  Cookie policy.
                </a>
              </p>
              <div className="ds:mt-4 ds:max-h-[400px] ds:space-y-2">
                {cookieBannerProps.preferences.map((preference) => {
                  const categories = preference.id.split(",");
                  const defaultChecked = categories.every(
                    (c) =>
                      cookiePreferences &&
                      cookiePreferences[c as keyof ConsentParams] === "granted",
                  );

                  return (
                    <Preferences
                      key={preference.id + preference.cookie_preferences_header}
                      header={preference.cookie_preferences_header}
                      body={preference.cookie_preferences_body}
                      defaultChecked={defaultChecked}
                      disabled={
                        preference.cookie_preference_default === "disabled"
                      }
                      onChange={(checked) => {
                        const toSet = categories.reduce((acc, category) => {
                          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
                          (acc as any)[category] = checked
                            ? "granted"
                            : "denied";
                          return acc;
                        }, {});
                        setCookiePreferences((c) => ({
                          ...c,
                          ...toSet,
                        }));
                      }}
                    />
                  );
                })}
              </div>
            </ScrollerVertical>
            <Button
              variant="solid"
              className="ds:mt-6"
              onClick={handleChoice()}
              aria-label={cookieBannerProps.cookie_button_three_text}
              fullWidth
              size="small"
            >
              {cookieBannerProps.cookie_button_three_text}
            </Button>
          </>
        ) : (
          <>
            <h1
              id="cookieNoticeHeader"
              className="ds:mb-2 ds:text-sm ds:font-semibold ds:md:text-md"
            >
              {cookieBannerProps.cookie_header_one}
            </h1>
            <div className="ds:space-y-2 ds:text-xxs ds:md:text-xxs ds:text-ui-grey-500 ds:md:space-y-4">
              <p>{cookieBannerProps.cookie_message_one}</p>
            </div>
            <div className="ds:mt-4 ds:flex ds:items-center ds:gap-4 ds:[&>*]:grow">
              <Button
                variant="solid"
                id="cookie-button-allow"
                onClick={handleChoice(true)}
                aria-label={cookieBannerProps.cookie_button_one_text}
                size="small"
              >
                {cookieBannerProps.cookie_button_one_text}
              </Button>
              <Button
                tint="grey"
                onClick={() => setCheckCookies(!checkCookies)}
                aria-label={cookieBannerProps.cookie_button_two_text}
                size="small"
              >
                {cookieBannerProps.cookie_button_two_text}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
