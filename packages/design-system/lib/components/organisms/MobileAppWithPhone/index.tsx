import { Phone } from "@icons/Phone";
import { MobileApp, MobileAppProps } from "@components/molecules/MobileApp";

export const MobileAppWithPhone = (props: MobileAppProps) => {
  return (
    <div className="md:flex md:gap-20 items-center bg-core-yellow md:p-20 justify-center">
      <div
        className="flex px-5"
        aria-hidden="true"
        aria-label="Phone mockup displaying My Account"
      >
        <Phone />
      </div>

      <MobileApp {...props} />
    </div>
  );
};
