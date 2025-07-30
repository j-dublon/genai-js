"use client";

import { ErrorPage } from "@/components/ErrorPage";

import { errorProps } from "./errorProps";

export default function Error() {
  return (
    <ErrorPage
      title={errorProps.generalError.title}
      paragraphs={errorProps.generalError.paragraphs}
    />
  );
}
