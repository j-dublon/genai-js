import { ReactNode } from "react";

interface NavDrawerProps {
  openState: "Opening" | "Closing";
  children: ReactNode;
}

export const NavDrawer = ({ openState, children }: NavDrawerProps) => {
  return (
    <aside
      className={`fixed inset-0 bg-white h-screen overflow-auto transition-transform duration-300 ${
        openState === "Opening"
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      }`}
    >
      <div className="p-6">{children}</div>
    </aside>
  );
};
