"use client";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useEffect } from "react";

import { userTrackingParams } from "@/hooks/useTrackingParams";

export const UserTracking = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams !== null) {
      userTrackingParams(queryString.parse(searchParams.toString()));
    }
  }, [searchParams]);

  return <></>;
};
