import {
  Button,
  ColorPill,
  ReferralCard,
  ReferralCardWrapper,
} from "@react-component-library/ui";
import Link from "next/link";

const DottedLine = () => {
  return (
    <span
      className="
          bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSIxMyIgdmlld0JveD0iMCAwIDQgMTMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMiAwLjVDMy4xMDQ1NyAwLjUgNCAxLjQxNzI3IDQgMi41NDg3OEw0IDEwLjQ1MTJDNCAxMS41ODI3IDMuMTA0NTcgMTIuNSAyIDEyLjVDMC44OTU0MyAxMi41IC00Ljg0NDQxZS0wNyAxMS41ODI3IC00LjM0OTgyZS0wNyAxMC40NTEyTC04Ljk1NTVlLTA4IDIuNTQ4NzhDLTQuMDA5NTJlLTA4IDEuNDE3MjcgMC44OTU0MzEgMC41IDIgMC41WiIgZmlsbD0iIzFGMUYxRiIvPgo8L3N2Zz4K')]
          bg-center
          bg-repeat-space
          bg-[length:5px_12px]
          rounded-[2px]
          flex-grow
          h-[32px]
          w-[5px]
          my-[4px]
          mx-auto

          md:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iNSIgdmlld0JveD0iMCAwIDEyIDUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNLTEuNzQ4NDZlLTA3IDIuNUMtNy44MjgxZS0wOCAxLjM5NTQzIDAuOTE3MjcxIDAuNSAyLjA0ODc4IDAuNUw5Ljk1MTIyIDAuNTAwMDAxQzExLjA4MjcgMC41MDAwMDEgMTIgMS4zOTU0MyAxMiAyLjVDMTIgMy42MDQ1NyAxMS4wODI3IDQuNSA5Ljk1MTIyIDQuNUwyLjA0ODc4IDQuNUMwLjkxNzI3MSA0LjUgLTIuNzE0MWUtMDcgMy42MDQ1NyAtMS43NDg0NmUtMDcgMi41WiIgZmlsbD0iIzFGMUYxRiIvPgo8L3N2Zz4K')]
          md:bg-[length:20px_5px]
          md:h-[5px]
          md:my-auto>
        "
    />
  );
};

const EveryoneWinsSection = () => {
  return (
    <div className="py-12 bg-core-white px-mobile sm:px-tablet lg:px-desktop md:px-10 md:py-20">
      <div className="ds:grid ds:grid-cols-1 ds:md:grid-cols-1 ds:gap-4 ds:md:gap-10 ds:max-w-[1152px] ds:justify-center ds:items-center ds:mx-auto">
        <h2 className="font-semibold text-[26px] sm:text-3xl md:text-5xl text-core-black max-w-[90%] md:max-w-[75%]">
          Everyone wins (woohoo!)
        </h2>

        <div className="mb-8 sm:mb-16">
          <p className="text-lg md:text-[36px] max-w-[90%] md:max-w-[85%]">
            There are no hidden surprises when you refer a friend to us. Once
            they&apos;re a fully fledged member of the flock, you&apos;ll both
            get £50* of referral credit added into your accounts.
          </p>
          <p className="text-lg md:text-[36px] mt-5">
            Here&apos;s how to do it in 3 easy steps:
          </p>
        </div>

        <ReferralCardWrapper>
          <ReferralCard>
            <ColorPill
              colorPillText="Step 1"
              backgroundColor="pink"
              size="small"
            />
            <div className="flex flex-col mt-8 space-y-6">
              <img
                src="https://images.prismic.io/cuckoo-egg/Z8AS8J7c43Q3gSiE_LtF.png?auto=format,compress"
                className="ds:max-w-24 ds:max-h-24 ds:mb-6"
                alt="Step 1"
              />
              <p className="font-bold">Invite your pals</p>
              <p>
                Send them your unique referral link (found in your online
                account).
              </p>
            </div>
          </ReferralCard>
          <DottedLine />
          <ReferralCard>
            <ColorPill
              colorPillText="Step 2"
              backgroundColor="pink"
              size="small"
            />
            <div className="flex flex-col mt-8 space-y-6">
              <img
                src="https://images.prismic.io/cuckoo-egg/Z9BkLBsAHJWomW3j_Signingup.png?auto=format,compress"
                className="ds:max-w-24 ds:max-h-24 ds:mb-6"
                alt="Step 1"
              />
              <p className="font-bold">Nudge them to sign up</p>
              <p>
                It only takes 5 minutes – just remind them to use your unique
                link.
              </p>
            </div>
          </ReferralCard>

          <DottedLine />

          <ReferralCard>
            <ColorPill
              colorPillText="Step 3"
              backgroundColor="pink"
              size="small"
            />
            <div className="flex flex-col mt-8 space-y-6">
              <img
                src="https://images.prismic.io/cuckoo-egg/Z9BilRsAHJWomW1D_Present.png?auto=format,compress"
                className="ds:max-w-24 ds:max-h-24 ds:mb-6"
                alt="Step 1"
              />
              <p className="font-bold">Reap the rewards</p>
              <p>
                Once they&apos;re fully signed up, you&apos;ll both get credit
                in your accounts. win-win.
              </p>
            </div>
          </ReferralCard>
        </ReferralCardWrapper>

        <div className="flex flex-col">
          <span className="text-[20px] my-8 sm:mt-0 sm:mb-16">
            <Link
              href="/legal/promotional-terms"
              target="_blank"
              className="text-[#5A06D8]"
            >
              Ts&Cs
            </Link>{" "}
            apply.
          </span>
          <Button
            variant="outline"
            size="large"
            tint="white"
            href="/account/login"
          >
            Refer a friend now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EveryoneWinsSection;
