import logger from "@/lib/logger";
import { StoreBasket } from "@/store/useJoinFlowStore";

import { payloadAPI } from "../payloadClient";
import { GenerateCICSResponse } from "../payloadTypes";

export const generateCICS = async (
  basket: StoreBasket,
  setBasket: (basket: StoreBasket) => void,
): Promise<void> => {
  const updatedBasket = basket;
  try {
    const response = (await payloadAPI.generateCICS(
      basket.id,
    )) as GenerateCICSResponse;

    if (!response.success) {
      logger.error("CICS generation failed for basket", basket);
      setBasket(basket);
    } else {
      logger.info("Successfully generated CICS report", basket);
      updatedBasket.cics = response.cics;
      setBasket(updatedBasket);
    }
  } catch (error) {
    console.log("error: ", error);
    logger.error("Could not make a CICS request for given basket", basket);
  }
};
