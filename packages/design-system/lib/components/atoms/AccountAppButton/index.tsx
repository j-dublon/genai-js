import { AppStore } from "@icons/AppStore";
import { GooglePlay } from "@icons/GooglePlay";
import Link from "next/link";

const Apple = () => (
  <Link
    href="https://apps.apple.com/app/id6738845205"
    target="_blank"
    aria-label="Download the app from the Apple App Store"
  >
    <AppStore />
  </Link>
);

const Google = () => (
  <Link
    href="https://play.google.com/store/apps/details?id=co.cuckoo.neo.prod&hl=en"
    target="_blank"
    aria-label="Download the app from the Google Play Store"
  >
    <GooglePlay aria-label="Download the app from the Google Play Store" />
  </Link>
);

export const AccountAppButton = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
      <Apple />
      <Google />
    </div>
  );
};
