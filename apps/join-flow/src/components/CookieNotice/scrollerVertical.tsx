import { ReactNode } from "react";

interface ScrollerVerticalProps {
  children: ReactNode;
  maxHeight?: "50vh" | "100vh";
}

export const ScrollerVertical = (props: ScrollerVerticalProps) => {
  const { children, maxHeight } = props;

  return (
    <div
      className="-ml-1 -mr-2 overflow-y-scroll overscroll-y-contain px-1 [&::-webkit-scrollbar-thumb]:w-[4px] [&::-webkit-scrollbar-thumb]:rounded-[50px] [&::-webkit-scrollbar-thumb]:bg-core-black [&::-webkit-scrollbar-track]:w-[4px] [&::-webkit-scrollbar-track]:rounded-[50px] [&::-webkit-scrollbar-track]:bg-ui-grey-300 [&::-webkit-scrollbar]:w-[4px]"
      style={{ maxHeight }}
    >
      {children}
    </div>
  );
};
