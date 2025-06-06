import { NextResponse } from "next/server";

import logger from "@/lib/logger";

import { Page } from "./types";

export const payloadRouteHandler = async (): Promise<
  | NextResponse<{
      success: boolean;
      data: Page;
    }>
  | NextResponse<{
      success: boolean;
      error: string;
    }>
> => {
  const baseUrl = process.env.PAYLOAD_DOMAIN_NAME;

  if (!baseUrl) {
    logger.error("Missing PAYLOAD_DOMAIN_NAME env variable");
    return NextResponse.json(
      { success: false, error: "Missing PAYLOAD_DOMAIN_NAME" },
      { status: 500 },
    );
  }
  const url = `${baseUrl}/api/pages/homepage`;

  try {
    logger.info(`Fetching Payload data`);
    const response = await fetch(url);

    if (response.ok) {
      const data: Page = await response.json();
      logger.info("Successfully fetched Payload data", data);
      const nextResponse: { success: boolean; data: Page } = {
        success: true,
        data: data,
      };

      return NextResponse.json(nextResponse);
    } else {
      logger.error("Failed to fetch data", {
        url,
        status: response.status,
        statusText: response.statusText,
      });
      return NextResponse.json(
        { success: false, error: "Failed to fetch data" },
        { status: 500 },
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error fetching data", { error: error.message });
    } else {
      logger.error("An unexpected non-error was thrown", { error });
    }
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
