export const API_BASE_URL = process.env.NEXT_PUBLIC_PAYLOAD_ENDPOINT || null;

import {
  Basket,
  KrakenSwitchMatchServiceProvider,
  Page,
  VulnerabilityAndAccessibility,
} from "../../payload-types";
import {
  AddressLookupErrors,
  AddressLookupInputs,
  AddressLookupSuccess,
  AffiliateSessionErrors,
  AffiliateSessionInputs,
  AffiliateSessionSuccess,
  EngineerAppointmentErrors,
  EngineerAppointmentInputs,
  EngineerAppointmentSuccess,
  FetchError,
  GetCICSResponse,
  GetGoLiveDatesResponse,
  InitialBasket,
  InitialVulnerabilityAndAccessibility,
  QuoteLookupErrors,
  QuoteLookupInputs,
  QuoteLookupSuccess,
  ReferralSessionErrors,
  ReferralSessionInputs,
  ReferralSessionSuccess,
  RegisterOfInterestSubmissionsErrors,
  RegisterOfInterestSubmissionsInputs,
  RegisterOfInterestSubmissionsSuccess,
  RegradeQuoteLookupErrors,
  RegradeQuoteLookupInputs,
  RegradeQuoteLookupSuccess,
  RegradeResponse,
  RenewalQuoteLookupErrors,
  RenewalQuoteLookupInputs,
  RenewalQuoteLookupSuccess,
  RenewalResponse,
  ResponseStates,
  RunCreditCheckResponse,
  SendEmailCodeResponse,
  SignupResponse,
  SwitchMatchLookupErrors,
  SwitchMatchLookupInputs,
  SwitchMatchLookupSuccess,
  ValidateEmailCodeResponse,
  ValidationError,
  ValidationErrorDetail,
} from "./payloadTypes";

async function doSquidRequest(
  path: string,
  method: "POST" | "GET" | "PATCH",
  token: string | null,
  bodyObject?: Record<string, unknown>,
) {
  if (API_BASE_URL === null) {
    throw new Error(
      "API_BASE_URL/NEXT_PUBLIC_PAYLOAD_ENDPOINT must be set but is currently null",
    );
  }

  const url = `${API_BASE_URL}${path}`;

  // do the headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // we add a server side header so it works with the WAF
  if (typeof window === "undefined") {
    headers["User-Agent"] =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 CuckooBot/1.0";
  }

  if (token !== null) {
    headers["Authorization"] = token;
  }

  // make the request
  const params: RequestInit = {
    method,
    headers,
  };

  if (bodyObject) {
    params.body = JSON.stringify(bodyObject);
  }

  const response = await fetch(url, params);

  if (!response.ok) {
    try {
      const body = await response.json();
      getBodyValidationErrors(body);
    } catch (error) {
      if (error instanceof ValidationError) throw error;
    }

    throw new FetchError(
      response.status,
      response.statusText,
      url,
      params,
      response,
    );
  }

  const body = await response.json();
  getBodyValidationErrors(body);

  const data = body;
  return data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getBodyValidationErrors = (body: any) => {
  if (body.errors) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const details: ValidationErrorDetail[] = body.errors.map((err: any) => ({
      label: err?.data?.errors?.[0]?.label || undefined,
      message: err.message,
      path: err?.data?.errors?.[0]?.path || undefined,
    }));

    throw new ValidationError(details);
  }
};

async function doGetSquidEndpoint<T>(path: string, token: string | null) {
  return (await doSquidRequest(path, "GET", token)) as T;
}

async function doCreateSquidEndpoint<TInput, TResponse>(
  path: string,
  data: TInput,
  token: string | null,
) {
  const response = await doSquidRequest(
    path,
    "POST",
    token,
    data as Record<string, unknown>,
  );
  return response.doc as TResponse;
}

async function doUpdateSquidEndpoint<TInput, TResponse>(
  path: string,
  data: TInput,
  token: string | null,
) {
  const response = await doSquidRequest(
    path,
    "PATCH",
    token,
    data as Record<string, unknown>,
  );
  return response.doc as TResponse;
}

async function doGetSquidDocumentAsyncSyncStyle<TSuccess, TError>(
  path: string,
  token: string | null,
): Promise<
  | { state: Extract<ResponseStates, "success">; data: TSuccess }
  | { state: Extract<ResponseStates, "error">; data: TError }
  | { state: Extract<ResponseStates, "pending">; documentID: string }
> {
  const data = await doSquidRequest(path, "GET", token);

  switch (data.outputs?.state) {
    case "success":
      return {
        state: "success",
        data: {
          documentID: data.id,
          response: data.outputs.apiSuccess,
        } as TSuccess,
      };
    case "error":
      return {
        state: "error",
        data: {
          documentID: data.id,
          errors: data.outputs.apiErrors,
        } as TError,
      };
    case "pending":
      return { state: "pending", documentID: data.id };
    default:
      throw new Error("Unexpected state for sync request.");
  }
}

async function doAsyncSyncStyleFetchRequest<TSuccess, TError>(
  path: string,
  token: string | null,
): Promise<
  | { state: Extract<ResponseStates, "success">; data: TSuccess }
  | { state: Extract<ResponseStates, "error">; data: TError }
  | { state: Extract<ResponseStates, "pending">; documentID: string }
> {
  const data = await doSquidRequest(path, "GET", token);

  switch (data.outputs?.state) {
    case "success":
      return {
        state: "success",
        data: {
          documentID: data.id,
          response: data.outputs.apiSuccess,
        } as TSuccess,
      };
    case "error":
      return {
        state: "error",
        data: {
          documentID: data.id,
          errors: data.outputs.apiErrors,
        } as TError,
      };
    case "pending":
      return { state: "pending", documentID: data.id };
    default:
      throw new Error("Unexpected state for sync request.");
  }
}

function doAsyncSyncStyleCreateRequest<TSuccess, TError>(
  path: string,
  inputs: Record<string, unknown>,
  requestProcessingType: "sync",
  token: string | null,
): Promise<
  | { state: Extract<ResponseStates, "success">; data: TSuccess }
  | { state: Extract<ResponseStates, "error">; data: TError }
>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function doAsyncSyncStyleCreateRequest<TSuccess, TError>(
  path: string,
  inputs: Record<string, unknown>,
  requestProcessingType: "async",
  token: string | null,
): Promise<{ state: Extract<ResponseStates, "pending">; documentID: string }>;

async function doAsyncSyncStyleCreateRequest<TSuccess, TError>(
  path: string,
  inputs: Record<string, unknown>,
  requestProcessingType: "sync" | "async",
  token: string | null,
): Promise<
  | { state: Extract<ResponseStates, "success">; data: TSuccess }
  | { state: Extract<ResponseStates, "error">; data: TError }
  | { state: Extract<ResponseStates, "pending">; documentID: string }
> {
  const apiRequest = { inputs: { ...inputs, requestProcessingType } };
  const data = await doSquidRequest(path, "POST", token, apiRequest);

  if (requestProcessingType === "sync") {
    switch (data.doc.outputs?.state) {
      case "success":
        return {
          state: "success",
          data: {
            documentID: data.doc.id,
            response: data.doc.outputs.apiSuccess,
          } as TSuccess,
        };
      case "error":
        return {
          state: "error",
          data: {
            documentID: data.doc.id,
            errors: data.doc.outputs.apiErrors,
          } as TError,
        };
      default:
        throw new Error("Unexpected state for sync request.");
    }
  } else if (requestProcessingType === "async") {
    if (data.doc.outputs?.state === "pending") {
      return { state: "pending", documentID: data.doc.id };
    } else {
      throw new Error("Unexpected state for async request.");
    }
  }

  throw new Error("The API did not respond properly");
}

export const squidAPI = {
  // Address Lookups
  createAddressLookupSync: (
    input: AddressLookupInputs,
    token?: string | null,
  ) =>
    doAsyncSyncStyleCreateRequest<AddressLookupSuccess, AddressLookupErrors>(
      "/api/addressLookups",
      input,
      "sync",
      token || null,
    ),
  createAddressLookupAsync: (
    input: AddressLookupInputs,
    token?: string | null,
  ) =>
    doAsyncSyncStyleCreateRequest<AddressLookupSuccess, AddressLookupErrors>(
      "/api/addressLookups",
      input,
      "async",
      token || null,
    ),
  getAddressLookup: (id: string, token?: string | null) =>
    doGetSquidDocumentAsyncSyncStyle<AddressLookupSuccess, AddressLookupErrors>(
      `/api/addressLookups/${id}`,
      token || null,
    ),

  // Engineer Appointments
  createEngineerAppointmentSync: (
    input: EngineerAppointmentInputs,
    token?: string | null,
  ) =>
    doAsyncSyncStyleCreateRequest<
      EngineerAppointmentSuccess,
      EngineerAppointmentErrors
    >("/api/engineerAppointments", input, "sync", token || null),
  createEngineerAppointmentAsync: (
    input: EngineerAppointmentInputs,
    token?: string | null,
  ) =>
    doAsyncSyncStyleCreateRequest<
      EngineerAppointmentSuccess,
      EngineerAppointmentErrors
    >("/api/engineerAppointments", input, "async", token || null),
  getEngineerAppointment: (id: string, token?: string | null) =>
    doGetSquidDocumentAsyncSyncStyle<
      EngineerAppointmentSuccess,
      EngineerAppointmentErrors
    >(`/api/engineerAppointments/${id}`, token || null),

  // Switch Match Lookups
  createSwitchMatchLookupSync: (
    input: SwitchMatchLookupInputs,
    token?: string | null,
  ) =>
    doAsyncSyncStyleCreateRequest<
      SwitchMatchLookupSuccess,
      SwitchMatchLookupErrors
    >("/api/switchMatchLookups", input, "sync", token || null),
  createSwitchMatchLookupAsync: (
    input: SwitchMatchLookupInputs,
    token?: string | null,
  ) =>
    doAsyncSyncStyleCreateRequest<
      SwitchMatchLookupSuccess,
      SwitchMatchLookupErrors
    >("/api/switchMatchLookups", input, "async", token || null),
  getSwitchMatchLookup: (id: string, token?: string | null) =>
    doGetSquidDocumentAsyncSyncStyle<
      SwitchMatchLookupSuccess,
      SwitchMatchLookupErrors
    >(`/api/switchMatchLookups/${id}`, token || null),
  getSwitchMatchServiceProviders: (token?: string | null) =>
    doGetSquidEndpoint<KrakenSwitchMatchServiceProvider[]>(
      `/api/krakenSwitchMatchServiceProviders/all-active`,
      token || null,
    ),

  // Referral Sessions
  createReferralSessionSync: (
    input: ReferralSessionInputs,
    token?: string | null,
  ) =>
    doAsyncSyncStyleCreateRequest<
      ReferralSessionSuccess,
      ReferralSessionErrors
    >("/api/referralSessions", input, "sync", token || null),
  createReferralSessionAsync: (
    input: ReferralSessionInputs,
    token?: string | null,
  ) =>
    doAsyncSyncStyleCreateRequest<
      ReferralSessionSuccess,
      ReferralSessionErrors
    >("/api/referralSessions", input, "async", token || null),
  getReferralSession: (id: string, token?: string | null) =>
    doGetSquidDocumentAsyncSyncStyle<
      ReferralSessionSuccess,
      ReferralSessionErrors
    >(`/api/referralSessions/${id}`, token || null),

  // Quote Lookups
  createQuoteLookupSync: (input: QuoteLookupInputs, token?: string | null) =>
    doAsyncSyncStyleCreateRequest<QuoteLookupSuccess, QuoteLookupErrors>(
      "/api/newSaleQuoteLookups",
      input,
      "sync",
      token || null,
    ),
  createQuoteLookupAsync: (input: QuoteLookupInputs, token?: string | null) =>
    doAsyncSyncStyleCreateRequest<QuoteLookupSuccess, QuoteLookupErrors>(
      "/api/newSaleQuoteLookups",
      input,
      "async",
      token || null,
    ),
  getQuoteLookup: (id: string, token?: string | null) =>
    doGetSquidDocumentAsyncSyncStyle<QuoteLookupSuccess, QuoteLookupErrors>(
      `/api/newSaleQuoteLookups/${id}`,
      token || null,
    ),

  // Affiliate Sessions
  createAffiliateSessionSync: (
    input: AffiliateSessionInputs,
    token?: string | null,
  ) =>
    doAsyncSyncStyleCreateRequest<
      AffiliateSessionSuccess,
      AffiliateSessionErrors
    >("/api/affiliateSessions", input, "sync", token || null),
  createAffiliateSessionAsync: (
    input: AffiliateSessionInputs,
    token?: string | null,
  ) =>
    doAsyncSyncStyleCreateRequest<
      AffiliateSessionSuccess,
      AffiliateSessionErrors
    >("/api/affiliateSessions", input, "async", token || null),
  getAffiliateSession: (id: string, token?: string | null) =>
    doGetSquidDocumentAsyncSyncStyle<
      AffiliateSessionSuccess,
      AffiliateSessionErrors
    >(`/api/affiliateSessions/${id}`, token || null),

  getDefaultAffiliate: (token?: string | null) =>
    doAsyncSyncStyleFetchRequest<
      AffiliateSessionSuccess,
      AffiliateSessionErrors
    >("/api/affiliateSessions/default", token || null),

  getDefaultReferralAffiliate: (token?: string | null) =>
    doAsyncSyncStyleFetchRequest<
      AffiliateSessionSuccess,
      AffiliateSessionErrors
    >("/api/affiliateSessions/default-referral", token || null),

  // Basket
  getBasket: (id: string, token?: string | null) =>
    doGetSquidEndpoint<Basket>(`/api/baskets/${id}`, token || null),
  createBasket: (data: InitialBasket, token?: string | null) =>
    doCreateSquidEndpoint<InitialBasket, Basket>(
      "/api/baskets",
      data,
      token || null,
    ),
  updateBasket: (id: string, data: Partial<Basket>, token?: string | null) =>
    doUpdateSquidEndpoint<Partial<Basket>, Basket>(
      `/api/baskets/${id}`,
      data,
      token || null,
    ),
  runCreditCheck: (basketID: string, token?: string | null) =>
    doGetSquidEndpoint<RunCreditCheckResponse>(
      `/api/baskets/${basketID}/run-credit-check`,
      token || null,
    ),
  emailValidationSendCode: (basketID: string, token?: string | null) =>
    doGetSquidEndpoint<SendEmailCodeResponse>(
      `/api/baskets/${basketID}/send-email-code`,
      token || null,
    ),
  emailValidationCheckCode: (
    basketID: string,
    code: string,
    token?: string | null,
  ) =>
    doGetSquidEndpoint<ValidateEmailCodeResponse>(
      `/api/baskets/${basketID}/validate-email-code/${code}`,
      token || null,
    ),
  doSignup: (basketID: string, token?: string | null) =>
    doGetSquidEndpoint<SignupResponse>(
      `/api/baskets/${basketID}/signup`,
      token || null,
    ),
  doRenewal: (basketID: string, token?: string | null) =>
    doGetSquidEndpoint<RenewalResponse>(
      `/api/baskets/${basketID}/renew`,
      token || null,
    ),
  doRegrade: (basketID: string, token?: string | null) =>
    doGetSquidEndpoint<RegradeResponse>(
      `/api/baskets/${basketID}/regrade`,
      token || null,
    ),
  getGoLiveDates: (token?: string | null) =>
    doGetSquidEndpoint<GetGoLiveDatesResponse>(
      "/api/baskets/go-live-dates",
      token || null,
    ),
  getCICS: (basketID: string, token?: string | null) =>
    doGetSquidEndpoint<GetCICSResponse>(
      `/api/baskets/${basketID}/get-cics`,
      token || null,
    ),

  // V&A
  getVulnerabilityAndAccessibility: (id: string, token?: string | null) =>
    doGetSquidEndpoint<VulnerabilityAndAccessibility>(
      `/api/vulnerabilityAndAccessibility/${id}`,
      token || null,
    ),
  createVulnerabilityAndAccessibility: (
    data: InitialVulnerabilityAndAccessibility,
    token?: string | null,
  ) =>
    doCreateSquidEndpoint<
      InitialVulnerabilityAndAccessibility,
      VulnerabilityAndAccessibility
    >("/api/vulnerabilityAndAccessibility", data, token || null),
  updateVulnerabilityAndAccessibility: (
    id: string,
    data: Partial<VulnerabilityAndAccessibility>,
    token?: string | null,
  ) =>
    doUpdateSquidEndpoint<
      Partial<VulnerabilityAndAccessibility>,
      VulnerabilityAndAccessibility
    >(`/api/vulnerabilityAndAccessibility/${id}`, data, token || null),

  // Content
  getPageContentBySlug: (slug: string, token?: string | null) =>
    doGetSquidEndpoint<Page>(`/api/pages/${slug}`, token || null),

  // RenewalQuoteLookups
  createRenewalQuoteLookupSync: (
    input: RenewalQuoteLookupInputs,
    token?: string | null,
  ) =>
    doAsyncSyncStyleCreateRequest<
      RenewalQuoteLookupSuccess,
      RenewalQuoteLookupErrors
    >("/api/renewalQuoteLookups", input, "sync", token || null),
  createRenewalQuoteLookupAsync: (
    input: RenewalQuoteLookupInputs,
    token?: string | null,
  ) =>
    doAsyncSyncStyleCreateRequest<
      RenewalQuoteLookupSuccess,
      RenewalQuoteLookupErrors
    >("/api/renewalQuoteLookups", input, "async", token || null),
  getRenewalQuoteLookup: (id: string, token?: string | null) =>
    doGetSquidDocumentAsyncSyncStyle<
      RenewalQuoteLookupSuccess,
      RenewalQuoteLookupErrors
    >(`/api/renewalQuoteLookups/${id}`, token || null),

  // RegradeQuoteLookups
  createRegradeQuoteLookupSync: (
    input: RegradeQuoteLookupInputs,
    token?: string | null,
  ) =>
    doAsyncSyncStyleCreateRequest<
      RegradeQuoteLookupSuccess,
      RegradeQuoteLookupErrors
    >("/api/regradeQuoteLookups", input, "sync", token || null),
  createRegradeQuoteLookupAsync: (
    input: RegradeQuoteLookupInputs,
    token?: string | null,
  ) =>
    doAsyncSyncStyleCreateRequest<
      RegradeQuoteLookupSuccess,
      RegradeQuoteLookupErrors
    >("/api/regradeQuoteLookups", input, "async", token || null),
  getRegradeQuoteLookup: (id: string, token?: string | null) =>
    doGetSquidDocumentAsyncSyncStyle<
      RegradeQuoteLookupSuccess,
      RegradeQuoteLookupErrors
    >(`/api/regradeQuoteLookup/${id}`, token || null),

  // RegisterOfInterestSubmissions
  createRegisterOfInterestSubmissionSync: (
    input: RegisterOfInterestSubmissionsInputs,
    token?: string | null,
  ) =>
    doAsyncSyncStyleCreateRequest<
      RegisterOfInterestSubmissionsSuccess,
      RegisterOfInterestSubmissionsErrors
    >("/api/registerOfInterestSubmissions", input, "sync", token || null),

  // self service account
  // TODO better typing from source
  accountGetRenewalStatus: (accountNumber: string, token: string) =>
    doGetSquidEndpoint<{
      renewalState: "available" | "pastDue" | "notAvailable";
    }>(`/account-status/renewal/${accountNumber}`, token),
};
