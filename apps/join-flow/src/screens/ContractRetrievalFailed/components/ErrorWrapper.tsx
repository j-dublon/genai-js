import { NavBar } from "@/components/NavBar";
import { getAssetPath } from "@/lib/get-asset-path";

interface ErrorWrapperProps {
  children: React.ReactNode;
}

export const ErrorWrapper = (props: ErrorWrapperProps) => {
  return (
    <div className="w-full">
      <NavBar isContentPage={true} />
      <div className="relative flex min-h-[calc(100vh-100px)] flex-row overflow-x-hidden px-6 pt-4 pb-10 md:py-20 md:px-40">
        <div className="pointer-events-none absolute top-[-50px] left-[800px] -z-10 hidden h-[850px] w-[850px] md:block">
          <img
            src={getAssetPath("/images/3d_evolve_full.png")}
            alt=""
            className="scale-x-[-1] rotate-[-65deg] transform"
            aria-hidden="true"
          />
        </div>
        <div className="flex w-full flex-col gap-2 md:gap-4 items-start sm:max-w-[565px]">
          {props.children}
        </div>
      </div>
    </div>
  );
};
