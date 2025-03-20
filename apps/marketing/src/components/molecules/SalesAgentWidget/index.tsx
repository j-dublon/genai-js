"use client";

import { Button, ColorPill } from "@react-component-library/ui";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { useSalesAgent } from "@/contexts/SalesAgent";
import { useBrowserStorage } from "@/hooks/useBrowserStorage";

export default function SalesWidget() {
  const pathname = usePathname();
  const { agent } = useSalesAgent();
  const [hidden, setIsHidden] = useBrowserStorage("salesWidgetHidden", false);

  if (!agent || pathname.includes("/sales-agent/admin")) {
    return null;
  }

  return (
    <div
      data-testid="sales-agent"
      className="fixed left-1/2 top-[12px] z-[1000] -translate-x-1/2 justify-items-center md:bottom-6 md:left-auto md:right-12 md:top-auto md:transform-none bg-white grid md:place-items-end"
    >
      <AnimatePresence>
        {hidden ? (
          <motion.button
            key="sales-agent-activate-detail"
            initial={{ borderRadius: "16px" }}
            layoutId="morph"
            className={`h-12 w-12 bg-secondary-blue bg-[url(/vc-ap-marketing/assets/images/egg-white.png)] bg-[length:70%] bg-center bg-no-repeat [grid-area:stack] md:h-20 md:w-20`}
            onClick={() => setIsHidden(false)}
          >
            <span className="sr-only">Toggle sales widget</span>
          </motion.button>
        ) : (
          <motion.div
            key="sales-agent-detail"
            initial={{ borderRadius: "22px" }}
            layoutId="morph"
            className="border-core-black border-2 border-solid bg-core-white [grid-area:stack]"
          >
            <div className="flex flex-col gap-4 p-4">
              <ColorPill
                size="small"
                backgroundColor="yellow"
                colorPillText="Sales agent"
              />
              <h5 className="text-md font-semibold">
                Welcome back,
                <br />
                {agent.firstName} {agent.lastName}
              </h5>

              <div className="gap-4 flex flex-col md:flex-row">
                <Button
                  as="a"
                  href="/sales-agent/login"
                  size="small"
                  variant="solid"
                >
                  Switch agent
                </Button>
                <Button
                  size="small"
                  variant="solid"
                  onClick={() => setIsHidden(true)}
                >
                  Hide me
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
