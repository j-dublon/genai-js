"use client";

import { serialize } from "cookie";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getSalesAgentFromCookie,
  isValidSalesAgentUserSession,
  SalesAgent,
} from "./authentication";
import { SALES_AGENT_AUTH_COOKIE } from "./constants";

interface SalesAgentContextProps {
  agent?: SalesAgent;
}

const SalesAgentContext = createContext<SalesAgentContextProps>({});

interface SalesAgentProviderProps {
  children: ReactNode;
}

export function SalesAgentProvider(props: SalesAgentProviderProps) {
  const { children } = props;
  const pathname = usePathname();

  const [agent, setAgent] = useState<SalesAgent>();
  const router = useRouter();

  // The two effects are split below so that we can cache the parse of the
  // sales agent cookie within state.

  const cookie = global?.document?.cookie ?? "";

  useEffect(() => {
    const maybeAgent = getSalesAgentFromCookie(cookie);
    if (maybeAgent) {
      setAgent(maybeAgent);
    }
  }, [cookie]);

  useEffect(() => {
    if (!agent) return;

    if (agent && !isValidSalesAgentUserSession(agent.token)) {
      router.push("/sales-agent/login?state=authorisationExpired");
      // Delete the cookie
      global.document.cookie = serialize(SALES_AGENT_AUTH_COOKIE, "", {
        maxAge: 0,
        path: "/",
      });
      setAgent(undefined);
    }
  }, [agent, router, pathname]);

  return (
    <SalesAgentContext.Provider value={{ agent }}>
      {children}
    </SalesAgentContext.Provider>
  );
}

export function useSalesAgent(): SalesAgentContextProps {
  return useContext(SalesAgentContext);
}
