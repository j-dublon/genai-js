"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import useJoinFlowStore from "@/store/useJoinFlowStore";

export const LoadingModalRouteReset = () => {
  const setIsLoadingModalOpen = useJoinFlowStore(
    (s) => s.setIsLoadingModalOpen,
  );
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    if (prevPath.current !== null && prevPath.current !== pathname) {
      setIsLoadingModalOpen(false);
    }
    prevPath.current = pathname;
  }, [pathname, setIsLoadingModalOpen]);

  return null;
};
