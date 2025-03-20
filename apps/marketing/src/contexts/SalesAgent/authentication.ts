import { parse } from "cookie";
import { fromUnixTime, isSameWeek } from "date-fns";
import jwt from "jsonwebtoken";

import { SALES_AGENT_AUTH_COOKIE } from "./constants";

enum SalesAgentType {
  FieldSales = "FIELD_SALES",
  TeleSales = "TELE_SALES",
  VenueSales = "VENUE_SALES",
}

export interface SalesAgentCookieData {
  firstName: string;
  lastName: string;
  salesAgentId: string;
  salesAgentType: SalesAgentType;
  email: string;
  token: string;
  groups: string[];
  affiliateCode?: string;
}

export interface SalesAgent {
  firstName: string;
  lastName: string;
  id: string;
  type: SalesAgentType;
  token: string;
  groups: string[];
  affiliateCode?: string;
}

export const getSalesAgentFromCookie = (
  cookieHeader: string,
): SalesAgent | null => {
  const cookies = parse(cookieHeader);
  const salesAgentAuthCookie = cookies[SALES_AGENT_AUTH_COOKIE];

  if (salesAgentAuthCookie) {
    const salesAgentData = JSON.parse(salesAgentAuthCookie);
    return {
      firstName: salesAgentData.firstName,
      lastName: salesAgentData.lastName,
      id: salesAgentData.salesAgentId,
      type: salesAgentData.salesAgentType,
      token: salesAgentData.token,
      groups: salesAgentData.groups,
      affiliateCode: salesAgentData.affiliateCode,
    };
  }

  return null;
};

interface SalesAgentsToken extends jwt.JwtPayload {
  auth_time: string;
}

export function isValidSalesAgentUserSession(salesAgentToken: string): boolean {
  const token = jwt.decode(salesAgentToken) as SalesAgentsToken;
  const dateTimeOfAuthorisation = fromUnixTime(parseInt(token?.auth_time));

  /**
   * We want the sales agents to be forced to re login every monday.
   * If they already logged in on the same week then its a valid session
   */
  const isTheSameWeek = isSameWeek(Date.now(), dateTimeOfAuthorisation, {
    // Week starts on 1 = Monday, by default its Sunday
    weekStartsOn: 1,
  });

  return isTheSameWeek;
}
