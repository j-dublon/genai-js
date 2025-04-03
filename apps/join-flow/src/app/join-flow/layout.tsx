import "@react-component-library/ui/ui.css";
import "../globals.css";

import RouteGuard from "@/validation/routeGuard";

const JoinFlowLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="join-flow-container">
      <RouteGuard>{children}</RouteGuard>
    </div>
  );
};

export default JoinFlowLayout;
