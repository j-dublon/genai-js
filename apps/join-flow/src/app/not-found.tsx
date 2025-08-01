"use client";
import { useRouter } from "next/navigation";

import { ErrorPage } from "@/components/ErrorPage";

export default function NotFound() {
  const router = useRouter();

  return (
    <ErrorPage
      title="Page not found"
      paragraphs={[
        "The page you're looking for doesn't exist.",
        "It might have been moved, deleted, or you entered the wrong URL.",
      ]}
      button={{
        text: "Go home",
        onClick: () => router.push("/join-flow"),
      }}
    />
  );
}
