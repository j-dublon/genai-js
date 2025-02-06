import Link from "next/link";
import { AppStore } from "@icons/AppStore";
import { GooglePlay } from "@icons/GooglePlay";

const Apple = () => (
  <Link href="https://apps.apple.com/app/id6738845205" target="_blank">
    <AppStore aria-label="Download the app from the Apple App Store" />
  </Link>
);

const Google = () => (
  <Link
    href="https://play.google.com/store/apps/details?id=co.cuckoo.neo"
    target="_blank"
  >
    <GooglePlay aria-label="Download the app from the Google Play Store" />
  </Link>
);

export const AccountAppButton = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <Apple />
      <Google />
    </div>
  );
};
