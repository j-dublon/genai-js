import { ReactNode } from "react";

interface NavDrawerProps {
  openState: "Opening" | "Closing";
  children: ReactNode;
}

export const NavDrawer = ({ openState, children }: NavDrawerProps) => {
  return (
    <aside
      className={`ds:fixed ds:te ds:inset-0 ds:bg-core-white ds:h-screen ds:overflow-auto ds:transition-transform ds:duration-300 ${
        openState === "Opening"
          ? "ds:translate-x-0 ds:opacity-100"
          : "ds:translate-x-full ds:opacity-0"
      }`}
    >
      <div className="ds:p-6">{children}</div>
    </aside>
  );
};
