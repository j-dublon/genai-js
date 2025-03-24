"use client";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useEffect } from "react";

import { userTrackingParams } from "@/hooks/useTrackingParams";

interface UserTrackingProps {
  children: React.ReactNode;
}

export const UserTracking = ({ children }: UserTrackingProps) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    userTrackingParams(queryString.parse(searchParams.toString()));
  }, [searchParams]);

  return <>{children}</>;
};
