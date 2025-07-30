"use client";

import "@react-component-library/ui/ui.css";
import "./globals.css";

import { ErrorPage } from "@/components/ErrorPage";

import { errorProps } from "./errorProps";

export default function GlobalError() {
  return (
    <html>
      <body>
        <ErrorPage
          title={errorProps.generalError.title}
          paragraphs={errorProps.generalError.paragraphs}
        />
      </body>
    </html>
  );
}
