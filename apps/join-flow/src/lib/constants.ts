// PRE_REG: User cannot get Cuckoo yet at their address, based on an availability check.
// SERVICEABLE_ROI:  User did an availability check, can get Cuckoo,but not ready to register.
// STOP_SELL_ROI:  Website stop sell page is up, and user wants to come back, and continue.
// ERROR_ROI: There was an error during quoting and a customer submitted. They may or may not be serviceable.
export enum ROIOriginJourney {
  PRE_REG = "PRE_REG",
  SERVICEABLE_ROI = "SERVICEABLE_ROI",
  ERROR_ROI = "ERROR_ROI",
  STOP_SELL_ROI = "STOP_SELL_ROI",
}
