"use client";
import {
  shouldShowCookieNotice,
  useCookieNotice,
} from "@contexts/CookieNotice";
import dynamic from "next/dynamic";

const CookieNotice = dynamic(
  () => import("./cookieNotice").then((m) => m.CookieNotice),
  {
    ssr: false,
  },
);

export const DynamicCookieNotice = () => {
  const cookieNotice = useCookieNotice();

  if (shouldShowCookieNotice(cookieNotice.state)) {
    return <CookieNotice />;
  }

  return null;
};
