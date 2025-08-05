"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { ErrorPage } from "@/components/ErrorPage";
import useJoinFlowStore, { type ErrorInfo } from "@/store/useJoinFlowStore";

import { type ErrorAction, errorProps } from "./errorProps";

const getErrorContent = (errorInfo: ErrorInfo | null) => {
  if (!errorInfo) {
    return errorProps.generalError;
  }
  return errorProps[errorInfo.type] || errorProps.generalError;
};

const createActionHandler =
  (router: ReturnType<typeof useRouter>) => (action: ErrorAction) => {
    switch (action) {
      case "restart":
        router.push("/join-flow/");
        break;
      case "retry":
        // TODO: retry logic?
        router.back();
        break;
      default:
        console.warn(`Unknown action: ${action}`);
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

  const errorPageProps = {
    ...errorContent,
    button: errorContent.button
      ? {
          text: errorContent.button.text,
          onClick: () =>
            createActionHandler(router)(errorContent.button!.action),
        }
      : undefined,
  };

  return <ErrorPage {...errorPageProps} />;
}
