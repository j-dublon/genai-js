import { ReactNode } from "react";

interface ScrollerVerticalProps {
  children: ReactNode;
  maxHeight?: "50vh" | "100vh";
}

export const ScrollerVertical = (props: ScrollerVerticalProps) => {
  const { children, maxHeight } = props;

  return (
    <div
      className="ds:-ml-1 ds:-mr-2 ds:overflow-y-scroll ds:overscroll-y-contain ds:px-1 ds:[&::-webkit-scrollbar-thumb]:w-[4px] ds:[&::-webkit-scrollbar-thumb]:rounded-[50px] ds[&::-webkit-scrollbar-thumb]:bg-core-black ds:[&::-webkit-scrollbar-track]:w-[4px] ds:[&::-webkit-scrollbar-track]:rounded-[50px] ds:[&::-webkit-scrollbar-track]:bg-ui-grey-300 ds:[&::-webkit-scrollbar]:w-[4px]"
      style={{ maxHeight }}
    >
      {children}
    </div>
  );
};
