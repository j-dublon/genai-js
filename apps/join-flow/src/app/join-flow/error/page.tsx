"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { ErrorPage } from "@/components/ErrorPage";
import useJoinFlowStore, { type ErrorInfo } from "@/store/useJoinFlowStore";

import { errorProps } from "./errorProps";

const getErrorContent = (errorInfo: ErrorInfo | null) => {
  if (!errorInfo) {
    return errorProps.generalError;
  }

  switch (errorInfo.type) {
    case "networkError":
      return errorProps.networkError;

    case "validationError":
      return errorProps.validationError;

    case "unknownError":
      return errorProps.unknownError;

    case "generalError":
    default:
      return errorProps.generalError;
  }
};

export default function JoinFlowErrorPage() {
  const router = useRouter();
  const { errorInfo } = useJoinFlowStore();

  useEffect(() => {
    if (!errorInfo) {
      router.push("/join-flow");
      return;
    }
  }, [errorInfo, router]);

  const errorContent = getErrorContent(errorInfo);

  return <ErrorPage {...errorContent} />;
}
