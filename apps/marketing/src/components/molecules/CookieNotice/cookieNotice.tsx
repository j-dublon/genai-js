"use client";
import { Button } from "@react-component-library/ui";
import { useEffect, useState } from "react";

import { ConsentParams, useCookieNotice } from "@/contexts/CookieNotice";

import { cookieBannerProps } from "./cookieBannerProps";
import { Preferences } from "./preferences";
import { ScrollerVertical } from "./scrollerVertical";

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
    <aside
      className="fixed bottom-6 right-1/2 z-[99] w-[23rem] translate-x-1/2 rounded-sm border-2 border-ui-grey-200 bg-ui-grey-100 p-6 sm:right-12 sm:translate-x-0 md:rounded-md"
      data-testid="cookie-notice"
    >
      {checkCookies ? (
        <>
          <ScrollerVertical maxHeight="50vh">
            <h1 className="text-sm md:text-md font-semibold">
              {cookieBannerProps.cookie_header_two}
            </h1>
            <p className="text-xxs mt-2 text-ui-grey-500">
              {cookieBannerProps.cookie_message_two}
              <a
                className="text-link-ui"
                href="https://cuckoo.co/legal/cookie-policy"
              >
                {" "}
                Cookie policy.
              </a>
            </p>
            <div className="mt-4 max-h-[400px] space-y-2">
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
                        (acc as any)[category] = checked ? "granted" : "denied";
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
            className="mt-6"
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
            className="text-sm md:text-md mb-2 font-semibold"
          >
            {cookieBannerProps.cookie_header_one}
          </h1>
          <div className="text-xxs md:text-xxs space-y-2 text-ui-grey-500 md:space-y-4">
            <p>{cookieBannerProps.cookie_message_one}</p>
          </div>
          <div className="mt-4 flex items-center gap-4 [&>*]:grow">
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
    </aside>
  );
};
