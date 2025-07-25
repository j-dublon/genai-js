"use client";
import { getStorageValue, useBrowserStorage } from "@hooks/useBrowserStorage";
import Script from "next/script";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { defaultChoices } from "./defaultChoices";

export enum CookieState {
  Chosen = "CHOSEN",
  FirstTime = "FIRST_TIME",
  Update = "UPDATE",
}

export function shouldShowCookieNotice(state: CookieState): boolean {
  return state !== CookieState.Chosen;
}

export interface ConsentParams extends Gtag.ConsentParams {
  ads_backend_tracking?: "granted" | "denied";
}

interface CookieNoticeContextProps {
  /**
   * What permissions the user gave when prompted. If they have not been
   * provided yet, then defaults are applied.
   */
  choices: ConsentParams | null;
  /**
   * Update our local storage record as well as any relevant 3rd parties, e.g.
   * Google, PostHog
   */
  save: (choices: ConsentParams) => void;
  /**
   * How a user has interacted with making their choices
   */
  state: CookieState;
}

const CookieNoticeContext = createContext<CookieNoticeContextProps>({
  choices: defaultChoices,
  save: () => {},
  state: CookieState.FirstTime,
});

interface CookieNoticeProviderProps {
  children: ReactNode;
  /** Google Tag Manager ID */
  gtmId?: string;
}

const LOCAL_STORAGE_KEY = "cookieNotice";

export function CookieNoticeProvider(props: CookieNoticeProviderProps) {
  const { children, gtmId } = props;

  const [choices, setChoices] = useBrowserStorage(
    LOCAL_STORAGE_KEY,
    defaultChoices,
  );
  const [state, setState] = useState(CookieState.FirstTime);

  // To keep a consistent render between client and server, we never render the
  // CookieNotice on the server by using a useEffect to conditionally enable
  // the CookieNotice when necessary on the client.
  useEffect(() => {
    const landingUrl = new URL(location.href);
    // Headless-mode implies default cookies, essential cookies only
    if (landingUrl.searchParams.has("headless")) {
      setChoices((c) => c);
      setState(CookieState.Chosen);
      return;
    }

    // If local storage has a value then the user previously made a selection
    const currentChoices = getStorageValue<ConsentParams>(LOCAL_STORAGE_KEY);
    if (currentChoices !== undefined) {
      gtag("consent", "update", currentChoices);
      setState(CookieState.Chosen);
      return;
    }
  }, [setChoices]);

  const save: CookieNoticeContextProps["save"] = (nextChoices) => {
    gtag("consent", "update", nextChoices);
    setChoices(nextChoices);
    setState(CookieState.Chosen);

    // Remove the `#cookie-notice` from the URL so that the notice will not
    // reappear if the user were to reload the page
    history.replaceState(
      null,
      document.title,
      `${location.pathname}${location.search}`,
    );
  };

  return (
    <CookieNoticeContext.Provider value={{ choices, save, state }}>
      {children}
      {/*
      We're using what Google refers to as 'Basic consent mode' which means we
      do not load any of the Google Tag Manager code until after we gain the
      user's consent about their preferences.

      See: https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic#tag-manager
       */}
      {state !== CookieState.FirstTime && (
        <>
          {/*
          This launches the 'Container Loaded' event so you want to ensure this
          happens after 'Consent Update' has happened
          */}
          <Script
            id="gtm-load-pre"
            dangerouslySetInnerHTML={{
              __html: `
          dataLayer.push({'gtm.start': new Date().getTime(), 'event': 'gtm.js'});`,
            }}
          />
          {gtmId && (
            <Script
              async
              id="gtm-load"
              src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
            />
          )}
        </>
      )}
    </CookieNoticeContext.Provider>
  );
}

export function useCookieNotice(): CookieNoticeContextProps {
  return useContext(CookieNoticeContext);
}
