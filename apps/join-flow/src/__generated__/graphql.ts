import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export enum AccountStatus {
  Cancelled = "CANCELLED",
  Live = "LIVE",
  Prelive = "PRELIVE",
}

export type AddRouterInput = {
  desiredQuantity: Scalars["Int"]["input"];
};

export type AddRouterResponse = {
  __typename?: "AddRouterResponse";
  success: Scalars["Boolean"]["output"];
};

export type Address = {
  __typename?: "Address";
  addressKey?: Maybe<Scalars["String"]["output"]>;
  addressKeyType?: Maybe<AddressKeyType>;
  dependentLocality?: Maybe<Scalars["String"]["output"]>;
  locality?: Maybe<Scalars["String"]["output"]>;
  postcode?: Maybe<Scalars["String"]["output"]>;
  streetAddress?: Maybe<Scalars["String"]["output"]>;
};

export type AddressInput = {
  addressKey: Scalars["String"]["input"];
  addressKeyType: AddressKeyType;
  postcode: Scalars["String"]["input"];
};

export enum AddressKeyType {
  Alk = "ALK",
  Nad = "NAD",
  Uprn = "UPRN",
}

/**   We need this type because appsync wont let us reuse the EngineerAppointment type for authed queries */
export type AuthedEngineerAppointment = {
  __typename?: "AuthedEngineerAppointment";
  appointmentSlotEnd?: Maybe<Scalars["String"]["output"]>;
  appointmentSlotStart?: Maybe<Scalars["String"]["output"]>;
  date?: Maybe<Scalars["String"]["output"]>;
  slot?: Maybe<EngineerAppointmentSlot>;
};

export enum AvailabilityCheckError {
  AddressBlocked = "ADDRESS_BLOCKED",
  AddressNotShown = "ADDRESS_NOT_SHOWN",
  AlkNotFound = "ALK_NOT_FOUND",
  CannotServiceAddress = "CANNOT_SERVICE_ADDRESS",
  CannotServicePostcode = "CANNOT_SERVICE_POSTCODE",
  ExchangeNotLive = "EXCHANGE_NOT_LIVE",
  OpenOrder = "OPEN_ORDER",
}

export type AvailabilityCheckResponse = {
  __typename?: "AvailabilityCheckResponse";
  error?: Maybe<AvailabilityCheckError>;
  mobileService?: Maybe<Scalars["Boolean"]["output"]>;
  products?: Maybe<Array<Maybe<SpeedProduct>>>;
  quotingCode?: Maybe<Scalars["String"]["output"]>;
};

export type AvailableExtra = {
  __typename?: "AvailableExtra";
  description: Scalars["String"]["output"];
  displayPrice: Scalars["String"]["output"];
  family: ExtraFamily;
  name: Scalars["String"]["output"];
  price: Scalars["Int"]["output"];
  productExtraCode: ProductExtraCode;
};

export type Benefit = {
  __typename?: "Benefit";
  durationInMonths?: Maybe<Scalars["Int"]["output"]>;
  krakenPromotionCode?: Maybe<Scalars["String"]["output"]>;
  label?: Maybe<Scalars["String"]["output"]>;
  recipient?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<BenefitType>;
  valueInPence?: Maybe<Scalars["Int"]["output"]>;
  valueInPercent?: Maybe<Scalars["String"]["output"]>;
};

export enum BenefitType {
  BillCredits = "BillCredits",
  Discount = "Discount",
  Donation = "Donation",
  EmployeeDiscount = "EmployeeDiscount",
  RewardCard = "RewardCard",
}

export type Bill = {
  __typename?: "Bill";
  description?: Maybe<Scalars["String"]["output"]>;
  invoiceNumber?: Maybe<Scalars["String"]["output"]>;
  taxAmount?: Maybe<Scalars["String"]["output"]>;
  timestamp?: Maybe<Scalars["String"]["output"]>;
  total?: Maybe<Scalars["String"]["output"]>;
};

export type BillConnection = {
  __typename?: "BillConnection";
  currentBillingPeriodStartDate?: Maybe<Scalars["String"]["output"]>;
  edges?: Maybe<Array<Maybe<BillEdge>>>;
  pageInfo: PageInfo;
};

export type BillEdge = {
  __typename?: "BillEdge";
  /**   Pagination index */
  cursor: Scalars["String"]["output"];
  node?: Maybe<KrakenBill>;
};

export type BillPaginationInput = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  /**   Ie "First 5 after 'cursor-id'" */
  first?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Billing = {
  __typename?: "Billing";
  bills?: Maybe<Array<Maybe<Bill>>>;
  estFirstBillDate?: Maybe<Scalars["String"]["output"]>;
  nextBillDate?: Maybe<Scalars["String"]["output"]>;
};

export type BookEngineerAppointmentResponse = {
  __typename?: "BookEngineerAppointmentResponse";
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

export type BookInstallationAppointmentInput = {
  endDateTime: Scalars["String"]["input"];
  identifier?: InputMaybe<Scalars["String"]["input"]>;
  startDateTime: Scalars["String"]["input"];
};

export type BookedInstallationAppointment = {
  __typename?: "BookedInstallationAppointment";
  success: Scalars["Boolean"]["output"];
};

export type Broadband = {
  __typename?: "Broadband";
  connectionLive?: Maybe<Scalars["Boolean"]["output"]>;
  estInstallDate?: Maybe<Scalars["String"]["output"]>;
  product?: Maybe<OwnedBroadbandProduct>;
};

export type CheckAsyncAvailabilityCheckResponse = {
  __typename?: "CheckAsyncAvailabilityCheckResponse";
  error?: Maybe<AvailabilityCheckError>;
  isComplete?: Maybe<Scalars["Boolean"]["output"]>;
  quotingCode?: Maybe<Scalars["String"]["output"]>;
};

export type ChooseBroadbandExtrasInput = {
  affiliateCode?: InputMaybe<Scalars["String"]["input"]>;
  affiliateSessionId?: InputMaybe<Scalars["String"]["input"]>;
  krakenPromotionCode?: InputMaybe<Scalars["String"]["input"]>;
  productExtras: Array<ProductExtrasFamilyInput>;
  quotingCode: Scalars["String"]["input"];
};

export type ChooseBroadbandExtrasResponse = {
  __typename?: "ChooseBroadbandExtrasResponse";
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

export type ChooseBroadbandProductResponse = {
  __typename?: "ChooseBroadbandProductResponse";
  success: Scalars["Boolean"]["output"];
};

export enum CommsAddressKey {
  Alk = "ALK",
  Nad = "NAD",
  Uprn = "UPRN",
}

export type CommsSubscribeAddress = {
  additionalAddressKeys?: InputMaybe<Array<InputMaybe<ServiceLocationInput>>>;
  addressKey: Scalars["String"]["input"];
  addressKeyType: CommsAddressKey;
  formattedAddress: Scalars["String"]["input"];
  postcode?: InputMaybe<Scalars["String"]["input"]>;
};

export enum ComplaintSubType {
  AccountManagementDetailChanges = "ACCOUNT_MANAGEMENT__DETAIL_CHANGES",
  AccountManagementServiceTerminated = "ACCOUNT_MANAGEMENT__SERVICE_TERMINATED",
  AccountManagementUnableToLog = "ACCOUNT_MANAGEMENT__UNABLE_TO_LOG",
  BillingFinalBill = "BILLING__FINAL_BILL",
  BillingIncorrectBill = "BILLING__INCORRECT_BILL",
  BillingMissedInvoice = "BILLING__MISSED_INVOICE",
  BillingMissingCredits = "BILLING__MISSING_CREDITS",
  BillingMissingDiscounts = "BILLING__MISSING_DISCOUNTS",
  BillingNoBillReceived = "BILLING__NO_BILL_RECEIVED",
  BillingVoipUsage = "BILLING__VOIP_USAGE",
  ConstructionAccess = "CONSTRUCTION__ACCESS",
  ConstructionCableUtilitiesStrike = "CONSTRUCTION__CABLE_UTILITIES_STRIKE",
  ConstructionDamage = "CONSTRUCTION__DAMAGE",
  ConstructionEquipmentRemainingAtSite = "CONSTRUCTION__EQUIPMENT_REMAINING_AT_SITE",
  ConstructionNoNotification = "CONSTRUCTION__NO_NOTIFICATION",
  ConstructionQualityOfWorks = "CONSTRUCTION__QUALITY_OF_WORKS",
  ConstructionStaffBehaviour = "CONSTRUCTION__STAFF_BEHAVIOUR",
  CustomerServiceCommunicationFailedCommitments = "CUSTOMER_SERVICE__COMMUNICATION_FAILED_COMMITMENTS",
  CustomerServiceStaffBehaviour = "CUSTOMER_SERVICE__STAFF_BEHAVIOUR",
  CustomerServiceWaitTime = "CUSTOMER_SERVICE__WAIT_TIME",
  CustomerServiceWebsiteIssues = "CUSTOMER_SERVICE__WEBSITE_ISSUES",
  InstallationAppointedRescheduledAtShortNotice = "INSTALLATION__APPOINTED_RESCHEDULED_AT_SHORT_NOTICE",
  InstallationDamageToProperty = "INSTALLATION__DAMAGE_TO_PROPERTY",
  InstallationDelayedInstallation = "INSTALLATION__DELAYED_INSTALLATION",
  InstallationMissingAddOns = "INSTALLATION__MISSING_ADD_ONS",
  InstallationMissingEquipment = "INSTALLATION__MISSING_EQUIPMENT",
  InstallationQualityOfWorks = "INSTALLATION__QUALITY_OF_WORKS",
  InstallationRouterLocation = "INSTALLATION__ROUTER_LOCATION",
  InstallationStaffBehaviour = "INSTALLATION__STAFF_BEHAVIOUR",
  InstallationTimeKeeping = "INSTALLATION__TIME_KEEPING",
  InstallationWrongSpeedAssigned = "INSTALLATION__WRONG_SPEED_ASSIGNED",
  MarketingMisleadingCampaign = "MARKETING__MISLEADING_CAMPAIGN",
  MarketingUnsolicitedContact = "MARKETING__UNSOLICITED_CONTACT",
  MovingHomeAccountNotRegisteredToNewAddress = "MOVING_HOME__ACCOUNT_NOT_REGISTERED_TO_NEW_ADDRESS",
  MovingHomeServiceNotLive = "MOVING_HOME__SERVICE_NOT_LIVE",
  MovingHomeWaitTime = "MOVING_HOME__WAIT_TIME",
  OrderConfusionOnDeliveryDate = "ORDER__CONFUSION_ON_DELIVERY_DATE",
  OrderIncorrectProductService = "ORDER__INCORRECT_PRODUCT_SERVICE",
  OrderMissingAddOns = "ORDER__MISSING_ADD_ONS",
  OrderNoOrderConfirmationReceived = "ORDER__NO_ORDER_CONFIRMATION_RECEIVED",
  PaymentsDirectDebitInstructions = "PAYMENTS__DIRECT_DEBIT_INSTRUCTIONS",
  PaymentsDirectDebitSchedule = "PAYMENTS__DIRECT_DEBIT_SCHEDULE",
  PaymentsIncorrectPayment = "PAYMENTS__INCORRECT_PAYMENT",
  PaymentsMissedDirectDebit = "PAYMENTS__MISSED_DIRECT_DEBIT",
  PaymentsOneOffPayment = "PAYMENTS__ONE_OFF_PAYMENT",
  PaymentsPaymentPlanVulnerableCustomers = "PAYMENTS__PAYMENT_PLAN_VULNERABLE_CUSTOMERS",
  PaymentsReferAFriendDiscountMissing = "PAYMENTS__REFER_A_FRIEND_DISCOUNT_MISSING",
  PortingNumberNumberIncorrect = "PORTING_NUMBER__NUMBER_INCORRECT",
  PortingNumberNumberNotPorted = "PORTING_NUMBER__NUMBER_NOT_PORTED",
  ProductsIssueConnectingRouterToOwnRouter = "PRODUCTS__ISSUE_CONNECTING_ROUTER_TO_OWN_ROUTER",
  ProductsIssueWithBoosters = "PRODUCTS__ISSUE_WITH_BOOSTERS",
  ProductsIssueWithRouterLoggingIn = "PRODUCTS__ISSUE_WITH_ROUTER_LOGGING_IN",
  ProductsOther = "PRODUCTS__OTHER",
  ProductsVoipIssuesQuality = "PRODUCTS__VOIP_ISSUES_QUALITY",
  SalesCustomerService = "SALES__CUSTOMER_SERVICE",
  SalesMissSoldFieldAgency = "SALES__MISS_SOLD_FIELD_AGENCY",
  SalesMissSoldFieldOwnBrand = "SALES__MISS_SOLD_FIELD_OWN_BRAND",
  SalesMissSoldOnline = "SALES__MISS_SOLD_ONLINE",
  SalesMissSoldPhone = "SALES__MISS_SOLD_PHONE",
  ServicePerformanceLossOfConnection = "SERVICE_PERFORMANCE__LOSS_OF_CONNECTION",
  ServicePerformanceSpeedIssuesLowInconsistent = "SERVICE_PERFORMANCE__SPEED_ISSUES_LOW_INCONSISTENT",
  ServicePerformanceWifi = "SERVICE_PERFORMANCE__WIFI",
  UnauthorisedActivityUnauthorisedActivity = "UNAUTHORISED_ACTIVITY__UNAUTHORISED_ACTIVITY",
}

export enum ComplaintTopic {
  AccountManagement = "ACCOUNT_MANAGEMENT",
  Billing = "BILLING",
  Construction = "CONSTRUCTION",
  CustomerService = "CUSTOMER_SERVICE",
  Gdpr = "GDPR",
  Installation = "INSTALLATION",
  Marketing = "MARKETING",
  MovingHome = "MOVING_HOME",
  Order = "ORDER",
  Payments = "PAYMENTS",
  Products = "PRODUCTS",
  Sales = "SALES",
  ServicePerformance = "SERVICE_PERFORMANCE",
}

export type ConfirmResetSalesAgentPasswordInput = {
  confirmationCode: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type ConfirmResetSalesAgentPasswordResponse = {
  __typename?: "ConfirmResetSalesAgentPasswordResponse";
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

export type ConnectionAvailabilitySubscribeResponse = {
  __typename?: "ConnectionAvailabilitySubscribeResponse";
  subscribed?: Maybe<Scalars["Boolean"]["output"]>;
};

export type Contract = {
  __typename?: "Contract";
  active?: Maybe<Scalars["Boolean"]["output"]>;
  contractPlanId?: Maybe<Scalars["String"]["output"]>;
  end?: Maybe<Scalars["String"]["output"]>;
  length?: Maybe<Scalars["Int"]["output"]>;
  planId?: Maybe<Scalars["String"]["output"]>;
  planName?: Maybe<Scalars["String"]["output"]>;
};

export type ContractSummaryOutput = {
  __typename?: "ContractSummaryOutput";
  contractInformation?: Maybe<Scalars["String"]["output"]>;
  contractSummary?: Maybe<Scalars["String"]["output"]>;
};

export enum ContractType {
  EighteenMonth = "EIGHTEEN_MONTH",
  TwelveMonth = "TWELVE_MONTH",
  TwentyFourMonth = "TWENTY_FOUR_MONTH",
}

export type ConvertTrackingInput = {
  convert_uuid?: InputMaybe<Scalars["String"]["input"]>;
  network?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateAffiliateSessionInput = {
  subdomain: Scalars["String"]["input"];
};

export type CreateAffiliateSessionResponse = {
  __typename?: "CreateAffiliateSessionResponse";
  organisationName?: Maybe<Scalars["String"]["output"]>;
  sessionId?: Maybe<Scalars["String"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

export type CreateAsyncAvailabilityCheckResponse = {
  __typename?: "CreateAsyncAvailabilityCheckResponse";
  quoteToken: Scalars["String"]["output"];
};

export type CreateAuthTokenInput = {
  organizationSecretKey?: InputMaybe<Scalars["String"]["input"]>;
  refreshToken?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateAuthTokenResponse = {
  __typename?: "CreateAuthTokenResponse";
  refreshToken?: Maybe<Scalars["String"]["output"]>;
  token?: Maybe<Scalars["String"]["output"]>;
};

export type CreateContractSummaryInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  quotingCode: Scalars["String"]["input"];
};

export type CreateMagicLinkResponse = {
  __typename?: "CreateMagicLinkResponse";
  code: Scalars["Int"]["output"];
  message: Scalars["String"]["output"];
};

export type CreateSalesAgentAuthTokenInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type CreateSalesAgentAuthTokenResponse = {
  __typename?: "CreateSalesAgentAuthTokenResponse";
  affiliateCode?: Maybe<Scalars["String"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  firstName?: Maybe<Scalars["String"]["output"]>;
  groups?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  lastName?: Maybe<Scalars["String"]["output"]>;
  salesAgentId?: Maybe<Scalars["String"]["output"]>;
  salesAgentType?: Maybe<SalesAgentType>;
  token?: Maybe<Scalars["String"]["output"]>;
};

export type CreateSalesAgentInput = {
  affiliateCode?: InputMaybe<Scalars["String"]["input"]>;
  agency: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  hub?: InputMaybe<Scalars["String"]["input"]>;
  lastName: Scalars["String"]["input"];
  type?: InputMaybe<SalesAgentType>;
};

export type CreateSalesAgentResponse = {
  __typename?: "CreateSalesAgentResponse";
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

export type CreateTokenInput = {
  authSession: Scalars["String"]["input"];
};

export type CustomerComplaintInput = {
  complaintText: Scalars["String"]["input"];
  complaintTopic: ComplaintTopic;
  email: Scalars["String"]["input"];
  mobilePhone: Scalars["String"]["input"];
  preferedCommunicationMethod?: InputMaybe<PreferedCommunicationMethod>;
  timeSlot?: InputMaybe<TimeSlot>;
};

export type CustomerComplaintResponse = {
  __typename?: "CustomerComplaintResponse";
  complaintId?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type DeleteSalesAgentResponse = {
  __typename?: "DeleteSalesAgentResponse";
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

export type DeliveryAddress = {
  buildingNumber: Scalars["String"]["input"];
  postCode: Scalars["String"]["input"];
  postTown: Scalars["String"]["input"];
  street: Scalars["String"]["input"];
  subBuilding: Scalars["String"]["input"];
};

export type DeliveryAddressType = {
  __typename?: "DeliveryAddressType";
  line1?: Maybe<Scalars["String"]["output"]>;
  line2?: Maybe<Scalars["String"]["output"]>;
  line3?: Maybe<Scalars["String"]["output"]>;
  postcode?: Maybe<Scalars["String"]["output"]>;
};

export type EmailAvailability = {
  __typename?: "EmailAvailability";
  available: Scalars["Boolean"]["output"];
};

export type EmailValidationResponse = {
  __typename?: "EmailValidationResponse";
  message?: Maybe<Scalars["String"]["output"]>;
  status: EmailValidationResponseStatus;
};

export enum EmailValidationResponseStatus {
  Error = "ERROR",
  RateLimitExceeded = "RATE_LIMIT_EXCEEDED",
  Success = "SUCCESS",
}

export type EngineerAppointment = {
  __typename?: "EngineerAppointment";
  appointmentSlotEnd?: Maybe<Scalars["String"]["output"]>;
  /**   Kraken appointments */
  appointmentSlotStart?: Maybe<Scalars["String"]["output"]>;
  date?: Maybe<Scalars["String"]["output"]>;
  identifier?: Maybe<Scalars["String"]["output"]>;
  slot?: Maybe<EngineerAppointmentSlot>;
};

export enum EngineerAppointmentSlot {
  Am = "AM",
  Pm = "PM",
}

export type Equipment = {
  __typename?: "Equipment";
  orderLines?: Maybe<Array<Maybe<EquipmentOrderLineType>>>;
};

export type EquipmentOrderLineType = {
  __typename?: "EquipmentOrderLineType";
  createdAt?: Maybe<Scalars["String"]["output"]>;
  quantity?: Maybe<Scalars["Int"]["output"]>;
  shipment?: Maybe<ShipmentType>;
  sku?: Maybe<Scalars["String"]["output"]>;
};

export enum ExtraFamily {
  MeshRouters = "mesh_routers",
}

export type FaultInput = {
  description: Scalars["String"]["input"];
  email?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  mobilePhone?: InputMaybe<Scalars["String"]["input"]>;
  preferedCommunicationMethod: PreferedCommunicationMethod;
  subType?: InputMaybe<FaultSubType>;
  timeSlot?: InputMaybe<TimeSlot>;
  type?: InputMaybe<FaultType>;
};

export enum FaultSubType {
  BroadbandTechnicalCompleteLos = "BROADBAND_TECHNICAL__COMPLETE_LOS",
  BroadbandTechnicalConnectionProblems = "BROADBAND_TECHNICAL__CONNECTION_PROBLEMS",
  BroadbandTechnicalMso = "BROADBAND_TECHNICAL__MSO",
  BroadbandTechnicalOntFault = "BROADBAND_TECHNICAL__ONT_FAULT",
  BroadbandTechnicalOther = "BROADBAND_TECHNICAL__OTHER",
  BroadbandTechnicalRouterFault = "BROADBAND_TECHNICAL__ROUTER_FAULT",
  BroadbandTechnicalSlowSpeeds = "BROADBAND_TECHNICAL__SLOW_SPEEDS",
  BroadbandTechnicalThirdPartyEquipment = "BROADBAND_TECHNICAL__THIRD_PARTY_EQUIPMENT",
  BroadbandTechnicalWifiProblems = "BROADBAND_TECHNICAL__WIFI_PROBLEMS",
}

export enum FaultType {
  BroadbandTechnical = "BROADBAND_TECHNICAL",
}

export type FindOneTouchSwitchingCustomerInput = {
  /**   Account number of the customer in the losing providers systems. */
  accountNumber?: InputMaybe<Scalars["String"]["input"]>;
  address: SignUpAddressInput;
  /**   RCPID of the losing provider. (It can be found on OneTouchSwitchingBrand type) */
  losingProviderRCPID: Scalars["String"]["input"];
  /**   The unique broadband service identifier, or a Voice directoy number. (Totsco docs for broadband: Use of IAS(broadband) serviceIdentifier in the match request is expected to be low volume. It is most likely needed where the customer has multiple IAS services on a single billing account) */
  serviceIdentifier?: InputMaybe<Scalars["String"]["input"]>;
  surname: Scalars["String"]["input"];
};

export type FindOneTouchSwitchingCustomerResponse = {
  __typename?: "FindOneTouchSwitchingCustomerResponse";
  /**   Switch match request ID. */
  matchRequestId?: Maybe<Scalars["String"]["output"]>;
};

export type GetAddressesResponse = {
  __typename?: "GetAddressesResponse";
  addressKey?: Maybe<Scalars["String"]["output"]>;
  addressKeyType?: Maybe<AddressKeyType>;
  alk?: Maybe<Scalars["String"]["output"]>;
  line1?: Maybe<Scalars["String"]["output"]>;
  line2?: Maybe<Scalars["String"]["output"]>;
  line3?: Maybe<Scalars["String"]["output"]>;
  nad?: Maybe<Scalars["String"]["output"]>;
  postcode?: Maybe<Scalars["String"]["output"]>;
  uprn?: Maybe<Scalars["String"]["output"]>;
};

export type GetCompletedAsyncAvailabilityCheckResponse = {
  __typename?: "GetCompletedAsyncAvailabilityCheckResponse";
  products?: Maybe<Array<Maybe<SpeedProduct>>>;
  quotingCode: Scalars["String"]["output"];
  salesAgentMessage?: Maybe<Scalars["String"]["output"]>;
};

export type GetSalesAgentsResponse = {
  __typename?: "GetSalesAgentsResponse";
  agents?: Maybe<Array<Maybe<SalesAgent>>>;
};

export type Hardware = {
  __typename?: "Hardware";
  pastDeliveries?: Maybe<Array<Maybe<PastDeliveryType>>>;
  upcomingDeliveries?: Maybe<Array<Maybe<UpcomingDeliveryType>>>;
};

export type InitialPaymentCharge = {
  __typename?: "InitialPaymentCharge";
  description: Scalars["String"]["output"];
  price: Scalars["Int"]["output"];
};

export type InitialPaymentDetails = {
  __typename?: "InitialPaymentDetails";
  charges?: Maybe<Array<Maybe<InitialPaymentCharge>>>;
  retrievalToken?: Maybe<Scalars["String"]["output"]>;
  secretToken?: Maybe<Scalars["String"]["output"]>;
  total?: Maybe<Scalars["Int"]["output"]>;
};

/**   This returns credentials that can be used with Stripe. */
export type InitiateStandalonePayment = {
  __typename?: "InitiateStandalonePayment";
  retrievalToken: Scalars["String"]["output"];
  secretToken: Scalars["String"]["output"];
};

export type InitiateStandalonePaymentInput = {
  amount: Scalars["Int"]["input"];
};

export type InputEngineerAppointment = {
  appointmentSlotEnd?: InputMaybe<Scalars["String"]["input"]>;
  /**  Kraken input */
  appointmentSlotStart?: InputMaybe<Scalars["String"]["input"]>;
  date?: InputMaybe<Scalars["String"]["input"]>;
  quotingCode?: InputMaybe<Scalars["String"]["input"]>;
  slot?: InputMaybe<EngineerAppointmentSlot>;
};

export type InputSelectedPlan = {
  plan: Plans;
};

export type KrakenBill = {
  __typename?: "KrakenBill";
  billDocumentId?: Maybe<Scalars["String"]["output"]>;
  billPeriodEnd?: Maybe<Scalars["String"]["output"]>;
  billPeriodStart?: Maybe<Scalars["String"]["output"]>;
  dueDate?: Maybe<Scalars["String"]["output"]>;
  pdfUrl?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  totalCharge?: Maybe<Scalars["Int"]["output"]>;
};

export type KrakenBilling = {
  __typename?: "KrakenBilling";
  accountBalance?: Maybe<Scalars["Int"]["output"]>;
  bills?: Maybe<BillConnection>;
  currentBillingPeriodEndDate?: Maybe<Scalars["String"]["output"]>;
  currentBillingPeriodStartDate?: Maybe<Scalars["String"]["output"]>;
  nextBillingDate?: Maybe<Scalars["String"]["output"]>;
  paymentDay?: Maybe<Scalars["Int"]["output"]>;
  periodStartDay?: Maybe<Scalars["Int"]["output"]>;
  totalAmountOwed?: Maybe<Scalars["Int"]["output"]>;
};

export type KrakenBillingBillsArgs = {
  input: BillPaginationInput;
};

export enum LegacyBrand {
  Giganet = "GIGANET",
  Jurassic = "JURASSIC",
  Swish = "SWISH",
}

export type LineSpeed = {
  __typename?: "LineSpeed";
  maxDownloadSpeed?: Maybe<Scalars["Float"]["output"]>;
  minDownloadSpeed?: Maybe<Scalars["Float"]["output"]>;
  speedAverage?: Maybe<Scalars["Float"]["output"]>;
};

export type MatchResultType = {
  __typename?: "MatchResultType";
  /**   A container of the services requested to be switched. */
  services?: Maybe<Array<Maybe<MatchedServices>>>;
  /**   UUID created by the losing provider to represent the match result actions. */
  switchOrderReference?: Maybe<Scalars["String"]["output"]>;
};

export type MatchedServices = {
  __typename?: "MatchedServices";
  information?: Maybe<OneTouchSwitchingServiceInformation>;
  type?: Maybe<OneTouchSwitchingServiceType>;
};

export type Me = {
  __typename?: "Me";
  accountNumber: Scalars["String"]["output"];
  availableActivationDates?: Maybe<Array<Scalars["String"]["output"]>>;
  availableInstallationAppointments?: Maybe<Array<Maybe<EngineerAppointment>>>;
  billing?: Maybe<Billing>;
  broadband: Broadband;
  contracts?: Maybe<Array<Maybe<Contract>>>;
  correspondanceAddress?: Maybe<Address>;
  customerId: Scalars["String"]["output"];
  dateOfBirth?: Maybe<Scalars["String"]["output"]>;
  email: Scalars["String"]["output"];
  engineerAppointment?: Maybe<AuthedEngineerAppointment>;
  equipment?: Maybe<Equipment>;
  firstName: Scalars["String"]["output"];
  installationAddress: Address;
  intercomUserHash?: Maybe<Scalars["String"]["output"]>;
  krakenBilling?: Maybe<KrakenBilling>;
  lastName: Scalars["String"]["output"];
  mobilePhone?: Maybe<Scalars["String"]["output"]>;
  partner?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  portfolio?: Maybe<Scalars["Boolean"]["output"]>;
  referralSummary?: Maybe<ReferralSummary>;
  router?: Maybe<Router>;
  signupDate?: Maybe<Scalars["String"]["output"]>;
  /**   Kraken specific property detailing account status */
  status?: Maybe<AccountStatus>;
  title?: Maybe<Scalars["String"]["output"]>;
};

export type MeMutation = {
  __typename?: "MeMutation";
  addRouter?: Maybe<AddRouterResponse>;
  bookInstallationAppointment?: Maybe<BookedInstallationAppointment>;
  initiateStandalonePayment?: Maybe<InitiateStandalonePayment>;
  moveHome?: Maybe<MoveHomeResponse>;
  sendReferralInvite?: Maybe<ReferralInviteStatus>;
  submitCustomerComplaint: CustomerComplaintResponse;
  submitFault: SubmitFaultResponse;
  switchSpeeds?: Maybe<SwitchStatus>;
  updateActivationDate?: Maybe<UpdateActivationDateResponse>;
  updateDetails: UpdateDetailsResponse;
  updateDirectDebitMandate?: Maybe<UpdateDirectDebitMandateResponse>;
};

export type MeMutationAddRouterArgs = {
  input: AddRouterInput;
};

export type MeMutationBookInstallationAppointmentArgs = {
  input: BookInstallationAppointmentInput;
};

export type MeMutationInitiateStandalonePaymentArgs = {
  input: InitiateStandalonePaymentInput;
};

export type MeMutationMoveHomeArgs = {
  moveHomeInput: MoveHomeInput;
  test?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type MeMutationSendReferralInviteArgs = {
  email: Scalars["String"]["input"];
};

export type MeMutationSubmitCustomerComplaintArgs = {
  input: CustomerComplaintInput;
};

export type MeMutationSubmitFaultArgs = {
  input: FaultInput;
};

export type MeMutationSwitchSpeedsArgs = {
  switchData: SwitchData;
};

export type MeMutationUpdateActivationDateArgs = {
  input: UpdateActivationDateInput;
};

export type MeMutationUpdateDetailsArgs = {
  input: UpdateDetailsInput;
};

export type MeMutationUpdateDirectDebitMandateArgs = {
  input: UpdateDirectDebitMandateInput;
};

export type MetaTracking = {
  browserId?: InputMaybe<Scalars["String"]["input"]>;
  clickId?: InputMaybe<Scalars["String"]["input"]>;
};

export type MoveHomeInput = {
  address: AddressInput;
  averageLineSpeed: Scalars["String"]["input"];
  date?: InputMaybe<Scalars["String"]["input"]>;
  engineerAppointment?: InputMaybe<InputEngineerAppointment>;
  selectedPlan: InputSelectedPlan;
};

export type MoveHomeResponse = {
  __typename?: "MoveHomeResponse";
  estGoLiveDate?: Maybe<Scalars["String"]["output"]>;
  plan?: Maybe<Plans>;
  successful?: Maybe<Scalars["Boolean"]["output"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  bookEngineerAppointment: BookEngineerAppointmentResponse;
  chooseBroadbandExtras?: Maybe<ChooseBroadbandExtrasResponse>;
  chooseBroadbandProduct?: Maybe<ChooseBroadbandProductResponse>;
  confirmResetSalesAgentPassword?: Maybe<ConfirmResetSalesAgentPasswordResponse>;
  connectionAvailabilitySubscribe?: Maybe<ConnectionAvailabilitySubscribeResponse>;
  createAffiliateSession: CreateAffiliateSessionResponse;
  createAsyncAvailabilityCheck?: Maybe<CreateAsyncAvailabilityCheckResponse>;
  createAuthToken?: Maybe<CreateAuthTokenResponse>;
  createContractSummary: ContractSummaryOutput;
  createMagicLink?: Maybe<CreateMagicLinkResponse>;
  createSalesAgent?: Maybe<CreateSalesAgentResponse>;
  createSalesAgentAuthToken?: Maybe<CreateSalesAgentAuthTokenResponse>;
  createToken?: Maybe<TokenResponse>;
  deleteSalesAgent?: Maybe<DeleteSalesAgentResponse>;
  findOneTouchSwitchingCustomer?: Maybe<FindOneTouchSwitchingCustomerResponse>;
  meMutation: MeMutation;
  refreshToken?: Maybe<TokenResponse>;
  requestResetSalesAgentPassword?: Maybe<RequestResetSalesAgentPasswordResponse>;
  resendEmailValidationCode?: Maybe<EmailValidationResponse>;
  resendSalesAgentInvite?: Maybe<ResendSalesAgentInviteResponse>;
  respondToSalesAgentAuthChallenge?: Maybe<SalesAgentAuthChallengeResponse>;
  sendEmailValidationCode?: Maybe<EmailValidationResponse>;
  signUp?: Maybe<SignUpResponse>;
  startReferralJourney?: Maybe<StartReferralJourneyResponse>;
  updateSalesAgent?: Maybe<UpdateSalesAgentResponse>;
};

export type MutationBookEngineerAppointmentArgs = {
  input: InputEngineerAppointment;
};

export type MutationChooseBroadbandExtrasArgs = {
  input: ChooseBroadbandExtrasInput;
};

export type MutationChooseBroadbandProductArgs = {
  productCode: Scalars["String"]["input"];
  quotingCode: Scalars["String"]["input"];
};

export type MutationConfirmResetSalesAgentPasswordArgs = {
  confirmResetSalesAgentPasswordInput?: InputMaybe<ConfirmResetSalesAgentPasswordInput>;
};

export type MutationConnectionAvailabilitySubscribeArgs = {
  address: CommsSubscribeAddress;
  affiliateCode?: InputMaybe<Scalars["String"]["input"]>;
  email: Scalars["String"]["input"];
  endOfContractDate?: InputMaybe<Scalars["String"]["input"]>;
  fullName?: InputMaybe<Scalars["String"]["input"]>;
  legacyBrand?: InputMaybe<LegacyBrand>;
  network?: InputMaybe<Network>;
  originJourney?: InputMaybe<RoiOriginJourney>;
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationCreateAffiliateSessionArgs = {
  input: CreateAffiliateSessionInput;
};

export type MutationCreateAsyncAvailabilityCheckArgs = {
  additionalAddressKeys?: InputMaybe<Array<InputMaybe<ServiceLocationInput>>>;
  addressKey: Scalars["String"]["input"];
  addressKeyType: Scalars["String"]["input"];
  affiliateSessionId?: InputMaybe<Scalars["ID"]["input"]>;
  postcode: Scalars["String"]["input"];
  salesAgentId?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationCreateAuthTokenArgs = {
  input: CreateAuthTokenInput;
};

export type MutationCreateContractSummaryArgs = {
  input: CreateContractSummaryInput;
};

export type MutationCreateMagicLinkArgs = {
  email: Scalars["String"]["input"];
};

export type MutationCreateSalesAgentArgs = {
  createSalesAgentInput?: InputMaybe<CreateSalesAgentInput>;
};

export type MutationCreateSalesAgentAuthTokenArgs = {
  input: CreateSalesAgentAuthTokenInput;
};

export type MutationCreateTokenArgs = {
  input: CreateTokenInput;
};

export type MutationDeleteSalesAgentArgs = {
  email: Scalars["String"]["input"];
};

export type MutationFindOneTouchSwitchingCustomerArgs = {
  input: FindOneTouchSwitchingCustomerInput;
};

export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};

export type MutationRequestResetSalesAgentPasswordArgs = {
  email: Scalars["String"]["input"];
};

export type MutationResendEmailValidationCodeArgs = {
  emailAddress: Scalars["String"]["input"];
};

export type MutationResendSalesAgentInviteArgs = {
  email: Scalars["String"]["input"];
};

export type MutationRespondToSalesAgentAuthChallengeArgs = {
  input: SalesAgentAuthChallengeInput;
};

export type MutationSendEmailValidationCodeArgs = {
  emailAddress: Scalars["String"]["input"];
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationStartReferralJourneyArgs = {
  referralCode: Scalars["String"]["input"];
  referralType: ReferralType;
};

export type MutationUpdateSalesAgentArgs = {
  updateSalesAgentInput: UpdateSalesAgentInput;
};

export enum Network {
  Bt = "BT",
  Cf = "CF",
}

export enum OfferType {
  BillCredits = "BILL_CREDITS",
  RewardCard = "REWARD_CARD",
}

/**   List of all UK communication providers registered with TOTSCo. */
export type OneTouchSwitchingBrand = {
  __typename?: "OneTouchSwitchingBrand";
  /**   URL for customer assistance. */
  customerAssistUrl?: Maybe<Scalars["String"]["output"]>;
  /**   Identity ID (RCPID) of the provider. */
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type OneTouchSwitchingCustomerMatchResult = {
  __typename?: "OneTouchSwitchingCustomerMatchResult";
  /**    services that the customer can possibly switch over to us if they wanted and we offer them */
  additionalMatches?: Maybe<Array<Maybe<MatchResultType>>>;
  /**   the match results that we requested on the switchMatchRequest (aka in cuckoo graph through the mutation findOneTouchSwitchingCustomer). internally in there we only create a switch match request for broadband, because that what we offer only currently. */
  requestedMatchResult?: Maybe<MatchResultType>;
};

export type OneTouchSwitchingServiceInformation = {
  __typename?: "OneTouchSwitchingServiceInformation";
  /**
   *   Human-readable text value useful to the customer clearly identifying the service instance. This could contain the product/speed, the install date, the install location etc.
   *  Example: 1GB, Installed 25th September 2022 (Garage)
   */
  description?: Maybe<Scalars["String"]["output"]>;
  /**
   *   The UK formatted number is expressed in all digits without spaces.
   *  Example 01213339999
   */
  directoryNumber?: Maybe<Scalars["String"]["output"]>;
  networkOperator?: Maybe<Scalars["String"]["output"]>;
  /**   The UK formatted number is masked so only the final 2 digits are identifiable. */
  partialDirectoryNumber?: Maybe<Scalars["String"]["output"]>;
};

export enum OneTouchSwitchingServiceType {
  Broadband = "BROADBAND",
  Voice = "VOICE",
}

export type OrderTrackingInput = {
  affiliate?: InputMaybe<Scalars["String"]["input"]>;
  convert?: InputMaybe<ConvertTrackingInput>;
  googleAdsId?: InputMaybe<Scalars["String"]["input"]>;
  meta?: InputMaybe<MetaTracking>;
  partnerize?: InputMaybe<PartnerizeInput>;
  userAllowsAdsStroage?: InputMaybe<Scalars["Boolean"]["input"]>;
  userAllowsAdsTracking?: InputMaybe<Scalars["Boolean"]["input"]>;
  utm_campaign?: InputMaybe<Scalars["String"]["input"]>;
  utm_medium?: InputMaybe<Scalars["String"]["input"]>;
  utm_source?: InputMaybe<Scalars["String"]["input"]>;
};

export type OwnedBroadbandProduct = {
  __typename?: "OwnedBroadbandProduct";
  contract?: Maybe<Scalars["String"]["output"]>;
  displayPrice?: Maybe<Scalars["String"]["output"]>;
  planName?: Maybe<Scalars["String"]["output"]>;
  price?: Maybe<Scalars["String"]["output"]>;
  setupDate?: Maybe<Scalars["String"]["output"]>;
  speedAverage?: Maybe<Scalars["String"]["output"]>;
  technology?: Maybe<Scalars["String"]["output"]>;
  uploadAverage?: Maybe<Scalars["String"]["output"]>;
  usage?: Maybe<Scalars["String"]["output"]>;
};

export type PageInfo = {
  __typename?: "PageInfo";
  /**   The last item in the current page */
  endCursor?: Maybe<Scalars["String"]["output"]>;
  hasNextPage: Scalars["Boolean"]["output"];
  hasPreviousPage: Scalars["Boolean"]["output"];
  startCursor?: Maybe<Scalars["String"]["output"]>;
};

export type PartnerizeInput = {
  clickref?: InputMaybe<Scalars["String"]["input"]>;
};

export type PastDeliveryType = {
  __typename?: "PastDeliveryType";
  actualDeliveryDate?: Maybe<Scalars["String"]["output"]>;
  deliveryAddress?: Maybe<DeliveryAddressType>;
  deliveryStatus?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  expectedDeliveryDate?: Maybe<Scalars["String"]["output"]>;
};

export enum PlanCode {
  Fttp150EighteenMonth = "FTTP150_EIGHTEEN_MONTH",
  Fttp150TwelveMonth = "FTTP150_TWELVE_MONTH",
  Fttp150TwentyFourMonth = "FTTP150_TWENTY_FOUR_MONTH",
  Fttp500EighteenMonth = "FTTP500_EIGHTEEN_MONTH",
  Fttp500TwelveMonth = "FTTP500_TWELVE_MONTH",
  Fttp500TwentyFourMonth = "FTTP500_TWENTY_FOUR_MONTH",
  Fttp900EighteenMonth = "FTTP900_EIGHTEEN_MONTH",
  Fttp900TwelveMonth = "FTTP900_TWELVE_MONTH",
  Fttp900TwentyFourMonth = "FTTP900_TWENTY_FOUR_MONTH",
  Kraken = "Kraken",
  Plans = "plans",
}

export enum Plans {
  Fttp115 = "FTTP115",
  Fttp1000 = "FTTP1000",
}

export enum PreferedCommunicationMethod {
  Email = "EMAIL",
  Mobile = "MOBILE",
}

export enum ProductCode {
  Fttp115 = "FTTP115",
  Fttp1000 = "FTTP1000",
  TwelveMonth = "TWELVE_MONTH",
}

export enum ProductExtraCode {
  EeroMeshRouterX1 = "EERO_MESH_ROUTER_X1",
  EeroMeshRouterX2 = "EERO_MESH_ROUTER_X2",
  EeroMeshRouterX3 = "EERO_MESH_ROUTER_X3",
}

export type ProductExtrasFamilyInput = {
  family: ExtraFamily;
  productExtraCode: ProductExtraCode;
};

export type PromotionConfig = {
  __typename?: "PromotionConfig";
  announcementBannerText?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  shortAnnouncementBannerText?: Maybe<Scalars["String"]["output"]>;
  termsAndConditionsLink?: Maybe<Scalars["String"]["output"]>;
  welcomeBannerSubtitle?: Maybe<Scalars["String"]["output"]>;
  welcomeBannerText?: Maybe<Scalars["String"]["output"]>;
  welcomeBannerTitle?: Maybe<Scalars["String"]["output"]>;
};

export type Query = {
  __typename?: "Query";
  availabilityCheck?: Maybe<AvailabilityCheckResponse>;
  checkAsyncAvailabilityCheck?: Maybe<CheckAsyncAvailabilityCheckResponse>;
  checkStopSell: StopSellResponse;
  findOneTouchSwitchingCustomerResult?: Maybe<OneTouchSwitchingCustomerMatchResult>;
  getAddresses?: Maybe<Array<Maybe<GetAddressesResponse>>>;
  getAvailableEngineerAppointments?: Maybe<Array<Maybe<EngineerAppointment>>>;
  getAvailableExtras: Array<Maybe<AvailableExtra>>;
  getCompletedAsyncAvailabilityCheck?: Maybe<GetCompletedAsyncAvailabilityCheckResponse>;
  getOneTouchSwitchingBrands?: Maybe<Array<Maybe<OneTouchSwitchingBrand>>>;
  getSalesAgents?: Maybe<GetSalesAgentsResponse>;
  getSpecialCircumstanceTypes?: Maybe<Array<Maybe<SpecialCircumstance>>>;
  getTimeCalculations?: Maybe<TimeCalculations>;
  me: Me;
  promotions: Array<PromotionConfig>;
  verifyEmailCode?: Maybe<EmailValidationResponse>;
};

export type QueryAvailabilityCheckArgs = {
  addressKey: Scalars["String"]["input"];
  addressKeyType: AddressKeyType;
  postcode?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryCheckAsyncAvailabilityCheckArgs = {
  affiliateSessionId?: InputMaybe<Scalars["String"]["input"]>;
  quoteToken: Scalars["String"]["input"];
};

export type QueryFindOneTouchSwitchingCustomerResultArgs = {
  matchRequestId: Scalars["String"]["input"];
};

export type QueryGetAddressesArgs = {
  postcode: Scalars["String"]["input"];
};

export type QueryGetAvailableEngineerAppointmentsArgs = {
  addressKey?: InputMaybe<Scalars["String"]["input"]>;
  quotingCode?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGetAvailableExtrasArgs = {
  quotingCode: Scalars["String"]["input"];
};

export type QueryGetCompletedAsyncAvailabilityCheckArgs = {
  affiliateCode?: InputMaybe<Scalars["String"]["input"]>;
  enableBTProducts?: InputMaybe<Scalars["Boolean"]["input"]>;
  isSalesAgent?: InputMaybe<Scalars["Boolean"]["input"]>;
  nad?: InputMaybe<Scalars["String"]["input"]>;
  quotingCode: Scalars["String"]["input"];
  uprn?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGetTimeCalculationsArgs = {
  engineerVisitDate?: InputMaybe<Scalars["String"]["input"]>;
  quotingCode?: InputMaybe<Scalars["String"]["input"]>;
  scheduledGoLiveDate?: InputMaybe<Scalars["String"]["input"]>;
  time?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryPromotionsArgs = {
  affiliateCode?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryVerifyEmailCodeArgs = {
  emailAddress: Scalars["String"]["input"];
  verificationCode: Scalars["String"]["input"];
};

/**
 *   PRE_REG: User cannot get Cuckoo yet at their address, based on an availability check.
 *  SERVICEABLE_ROI:  User did an availability check, can get Cuckoo,but not ready to register.
 *  STOP_SELL_ROI:  Website stop sell page is up, and user wants to come back, and continue.
 *  ERROR_ROI: There was an error during quoting and a customer submitted. They may or may not be serviceable.
 */
export enum RoiOriginJourney {
  ErrorRoi = "ERROR_ROI",
  PreReg = "PRE_REG",
  ServiceableRoi = "SERVICEABLE_ROI",
  StopSellRoi = "STOP_SELL_ROI",
}

export type Referral = {
  __typename?: "Referral";
  key?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  paymentState?: Maybe<Scalars["String"]["output"]>;
  signUpDate?: Maybe<Scalars["String"]["output"]>;
};

export type ReferralInviteStatus = {
  __typename?: "ReferralInviteStatus";
  sent?: Maybe<Scalars["Boolean"]["output"]>;
};

export type ReferralSummary = {
  __typename?: "ReferralSummary";
  referralCode?: Maybe<Scalars["String"]["output"]>;
  referrals?: Maybe<Array<Maybe<Referral>>>;
  totalCharityContribution?: Maybe<Scalars["Float"]["output"]>;
  totalEarned?: Maybe<Scalars["Float"]["output"]>;
  totalReferrals?: Maybe<Scalars["Int"]["output"]>;
};

export enum ReferralType {
  Customer = "CUSTOMER",
  Employee = "EMPLOYEE",
}

export type RefreshTokenInput = {
  refreshToken: Scalars["String"]["input"];
};

export type RequestResetSalesAgentPasswordResponse = {
  __typename?: "RequestResetSalesAgentPasswordResponse";
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

export type ResendSalesAgentInviteResponse = {
  __typename?: "ResendSalesAgentInviteResponse";
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

export type Router = {
  __typename?: "Router";
  cpeFamily?: Maybe<Scalars["String"]["output"]>;
  currentQuantity?: Maybe<Scalars["Int"]["output"]>;
  routerType?: Maybe<RouterType>;
  supportedQuantities?: Maybe<Array<Maybe<Scalars["Int"]["output"]>>>;
};

export enum RouterType {
  EeroRouter = "EERO_ROUTER",
}

export type SalesAgent = {
  __typename?: "SalesAgent";
  affiliateCode?: Maybe<Scalars["String"]["output"]>;
  agency: Scalars["String"]["output"];
  disabled?: Maybe<Scalars["Boolean"]["output"]>;
  email: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  hub?: Maybe<Scalars["String"]["output"]>;
  lastName: Scalars["String"]["output"];
  type?: Maybe<SalesAgentType>;
};

export type SalesAgentAuthChallengeInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  session: Scalars["String"]["input"];
};

export type SalesAgentAuthChallengeResponse = {
  __typename?: "SalesAgentAuthChallengeResponse";
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

export enum SalesAgentType {
  FieldSales = "FIELD_SALES",
  TeleSales = "TELE_SALES",
  VenueSales = "VENUE_SALES",
}

export type ServiceLocationInput = {
  addressKey: Scalars["String"]["input"];
  addressKeyType: AddressKeyType;
};

export type ShipmentType = {
  __typename?: "ShipmentType";
  carrier?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["String"]["output"];
  deliveredAt?: Maybe<Scalars["String"]["output"]>;
  estimatedDeliveryDate?: Maybe<Scalars["String"]["output"]>;
  shippedAt?: Maybe<Scalars["String"]["output"]>;
  trackingCode?: Maybe<Scalars["String"]["output"]>;
  trackingUrl?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["String"]["output"];
};

export type SignUpAddress = {
  line1?: InputMaybe<Scalars["String"]["input"]>;
  line2?: InputMaybe<Scalars["String"]["input"]>;
  line3?: InputMaybe<Scalars["String"]["input"]>;
  postCode: Scalars["String"]["input"];
};

export type SignUpAddressInput = {
  address: SignUpAddress;
  addressKey: Scalars["String"]["input"];
  addressKeyType: AddressKeyType;
  propertyType?: InputMaybe<Scalars["String"]["input"]>;
};

export type SignUpBillingInput = {
  accountHolder?: InputMaybe<Scalars["String"]["input"]>;
  accountNumber?: InputMaybe<Scalars["String"]["input"]>;
  accountType?: InputMaybe<Scalars["String"]["input"]>;
  bankCode?: InputMaybe<Scalars["String"]["input"]>;
  branchCode?: InputMaybe<Scalars["String"]["input"]>;
  iban?: InputMaybe<Scalars["String"]["input"]>;
  sortCode?: InputMaybe<Scalars["String"]["input"]>;
};

export type SignUpHardwareInput = {
  deliveryAddress?: InputMaybe<DeliveryAddress>;
  ownRouter: Scalars["Boolean"]["input"];
  wifiInfo?: InputMaybe<WifiInformation>;
};

export type SignUpInput = {
  address: SignUpAddressInput;
  affiliateCode?: InputMaybe<Scalars["String"]["input"]>;
  billing: SignUpBillingInput;
  contractType: ContractType;
  dateOfBirth?: InputMaybe<Scalars["String"]["input"]>;
  email: Scalars["String"]["input"];
  engineerAppointment?: InputMaybe<InputEngineerAppointment>;
  firstName: Scalars["String"]["input"];
  goLiveDate: Scalars["String"]["input"];
  hardware: SignUpHardwareInput;
  lastName: Scalars["String"]["input"];
  marketingConsent?: InputMaybe<Scalars["Boolean"]["input"]>;
  mobilePhone: Scalars["String"]["input"];
  offerCode?: InputMaybe<Scalars["String"]["input"]>;
  offerId?: InputMaybe<Scalars["String"]["input"]>;
  offerType?: InputMaybe<OfferType>;
  oneTouchSwitchingOrderReference?: InputMaybe<Scalars["String"]["input"]>;
  orderTracking?: InputMaybe<OrderTrackingInput>;
  plan: Scalars["String"]["input"];
  price: Scalars["Int"]["input"];
  quotingCode?: InputMaybe<Scalars["String"]["input"]>;
  referralCode?: InputMaybe<Scalars["String"]["input"]>;
  referralType?: InputMaybe<ReferralType>;
  salesAgentId?: InputMaybe<Scalars["String"]["input"]>;
  specialCircumstances?: InputMaybe<SpecialCircumstanceInput>;
};

export type SignUpResponse = {
  __typename?: "SignUpResponse";
  accountNumber?: Maybe<Scalars["String"]["output"]>;
  engineerAppointment?: Maybe<EngineerAppointment>;
  error?: Maybe<Scalars["String"]["output"]>;
  firstName?: Maybe<Scalars["String"]["output"]>;
  /**   Kraken fields */
  initialPayment?: Maybe<InitialPaymentDetails>;
  lineSpeed?: Maybe<LineSpeed>;
  orderNumber?: Maybe<Scalars["String"]["output"]>;
  price?: Maybe<Scalars["String"]["output"]>;
  referralCode?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type SpecialCircumstance = {
  __typename?: "SpecialCircumstance";
  code: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
};

export type SpecialCircumstanceInput = {
  codes?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  isSharingConsentGiven: Scalars["Boolean"]["input"];
  nominatedPerson?: InputMaybe<SpecialCircumstancesNominatedPersonInput>;
  otherVulnerabilityInformation?: InputMaybe<Scalars["String"]["input"]>;
};

export type SpecialCircumstancesNominatedPersonInput = {
  emailAddress?: InputMaybe<Scalars["String"]["input"]>;
  fullName: Scalars["String"]["input"];
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<SpecialCircumstancesNominatedPersonInputType>;
};

export enum SpecialCircumstancesNominatedPersonInputType {
  PowerOfAttorney = "POWER_OF_ATTORNEY",
  ThirdPartyAccountManager = "THIRD_PARTY_ACCOUNT_MANAGER",
}

export type SpeedProduct = {
  __typename?: "SpeedProduct";
  averageDownload?: Maybe<Scalars["String"]["output"]>;
  averageUpload?: Maybe<Scalars["String"]["output"]>;
  /**   Used for Nest plans - to be depracted */
  code?: Maybe<Plans>;
  contractLength?: Maybe<ContractType>;
  discountedPrice?: Maybe<Scalars["Int"]["output"]>;
  displayDiscountedPrice?: Maybe<Scalars["String"]["output"]>;
  displayPrice?: Maybe<Scalars["String"]["output"]>;
  maxDownload?: Maybe<Scalars["String"]["output"]>;
  maxUpload?: Maybe<Scalars["String"]["output"]>;
  minDownload?: Maybe<Scalars["String"]["output"]>;
  minUpload?: Maybe<Scalars["String"]["output"]>;
  newLine?: Maybe<Scalars["Boolean"]["output"]>;
  planCode?: Maybe<PlanCode>;
  price?: Maybe<Scalars["Int"]["output"]>;
  /**   Used for Kraken plans */
  productCode?: Maybe<Scalars["String"]["output"]>;
  promotion?: Maybe<SpeedProductPromotion>;
  quotedSpeed?: Maybe<Scalars["String"]["output"]>;
};

export type SpeedProductPromotion = {
  __typename?: "SpeedProductPromotion";
  benefit?: Maybe<Benefit>;
  termsAndConditionsLink?: Maybe<Scalars["String"]["output"]>;
};

export type StartReferralJourneyResponse = {
  __typename?: "StartReferralJourneyResponse";
  success: Scalars["Boolean"]["output"];
};

export type StopSellResponse = {
  __typename?: "StopSellResponse";
  stopSellEnabled?: Maybe<Scalars["Boolean"]["output"]>;
};

export type SubmitFaultResponse = {
  __typename?: "SubmitFaultResponse";
  faultId?: Maybe<Scalars["String"]["output"]>;
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

export type SwitchData = {
  addressKey: Scalars["String"]["input"];
  averageLineSpeed: Scalars["String"]["input"];
  bestMaxDownload: Scalars["String"]["input"];
  engineerAppointment?: InputMaybe<InputEngineerAppointment>;
  selectedPlan: InputSelectedPlan;
  worstMaxDownload: Scalars["String"]["input"];
};

export enum SwitchError {
  CurrentPlanSelected = "CURRENT_PLAN_SELECTED",
  EngineerAppointmentTaken = "ENGINEER_APPOINTMENT_TAKEN",
  SwitchInProgress = "SWITCH_IN_PROGRESS",
}

export type SwitchStatus = {
  __typename?: "SwitchStatus";
  error?: Maybe<SwitchError>;
  estimatedInstallDate?: Maybe<Scalars["String"]["output"]>;
  successful?: Maybe<Scalars["Boolean"]["output"]>;
};

export type TimeCalculations = {
  __typename?: "TimeCalculations";
  activationDatesWhenExistingLine?: Maybe<
    Array<Maybe<Scalars["String"]["output"]>>
  >;
  estBillDate?: Maybe<Scalars["String"]["output"]>;
  estInstallDate?: Maybe<Scalars["String"]["output"]>;
  estRouterDeliveryDate?: Maybe<Scalars["String"]["output"]>;
  setupDate?: Maybe<Scalars["String"]["output"]>;
};

export enum TimeSlot {
  Am = "AM",
  Pm = "PM",
}

export type TokenResponse = {
  __typename?: "TokenResponse";
  accessToken: Scalars["String"]["output"];
  expiresIn: Scalars["Int"]["output"];
  refreshToken: Scalars["String"]["output"];
  tokenType: Scalars["String"]["output"];
};

export type UpcomingDeliveryType = {
  __typename?: "UpcomingDeliveryType";
  deliveryAddress?: Maybe<DeliveryAddressType>;
  deliveryStatus?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  expectedDeliveryDate?: Maybe<Scalars["String"]["output"]>;
};

export type UpdateActivationDateInput = {
  date: Scalars["String"]["input"];
};

export type UpdateActivationDateResponse = {
  __typename?: "UpdateActivationDateResponse";
  success: Scalars["Boolean"]["output"];
};

export type UpdateDetailsInput = {
  dateOfBirth?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  mobilePhone?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  wifiInfo?: InputMaybe<UpdateWifiData>;
};

export type UpdateDetailsResponse = {
  __typename?: "UpdateDetailsResponse";
  loginRequired?: Maybe<Scalars["Boolean"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type UpdateDirectDebitMandateInput = {
  accountHolder: Scalars["String"]["input"];
  accountNumber: Scalars["String"]["input"];
  sortCode: Scalars["String"]["input"];
};

export type UpdateDirectDebitMandateResponse = {
  __typename?: "UpdateDirectDebitMandateResponse";
  error?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type UpdateSalesAgentInput = {
  affiliateCode?: InputMaybe<Scalars["String"]["input"]>;
  agency: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  hub?: InputMaybe<Scalars["String"]["input"]>;
  lastName: Scalars["String"]["input"];
  type?: InputMaybe<SalesAgentType>;
};

export type UpdateSalesAgentResponse = {
  __typename?: "UpdateSalesAgentResponse";
  success?: Maybe<Scalars["Boolean"]["output"]>;
};

export type UpdateWifiData = {
  password?: InputMaybe<Scalars["String"]["input"]>;
  ssid?: InputMaybe<Scalars["String"]["input"]>;
};

export type WifiInfo = {
  __typename?: "WifiInfo";
  password?: Maybe<Scalars["String"]["output"]>;
  ssid?: Maybe<Scalars["String"]["output"]>;
};

export type WifiInformation = {
  password?: InputMaybe<Scalars["String"]["input"]>;
  ssid?: InputMaybe<Scalars["String"]["input"]>;
};

export type JoinServicesGetAddressesQueryVariables = Exact<{
  postcode: Scalars["String"]["input"];
}>;

export type JoinServicesGetAddressesQuery = {
  __typename?: "Query";
  getAddresses?: Array<{
    __typename?: "GetAddressesResponse";
    line1?: string | null;
    line2?: string | null;
    line3?: string | null;
    postcode?: string | null;
    addressKey?: string | null;
    addressKeyType?: AddressKeyType | null;
  } | null> | null;
};

export const JoinServicesGetAddressesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "JoinServicesGetAddresses" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "postcode" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAddresses" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "postcode" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "postcode" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "line1" } },
                { kind: "Field", name: { kind: "Name", value: "line2" } },
                { kind: "Field", name: { kind: "Name", value: "line3" } },
                { kind: "Field", name: { kind: "Name", value: "postcode" } },
                { kind: "Field", name: { kind: "Name", value: "addressKey" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "addressKeyType" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  JoinServicesGetAddressesQuery,
  JoinServicesGetAddressesQueryVariables
>;
