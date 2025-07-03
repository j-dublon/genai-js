export const API_BASE_URL =
  process.env.NEXT_PUBLIC_PAYLOAD_ENDPOINT ||
  "https://squid.cuckoohatchery-stage.com/api";

import type {
  Basket,
  KrakenSwitchMatchServiceProvider,
  VulnerabilityAndAccessibility,
} from "../../payload-types";
import {
  AddressLookupErrors,
  AddressLookupInputs,
  AddressLookupSuccess,
  AffiliateSessionErrors,
  AffiliateSessionInputs,
  AffiliateSessionSuccess,
  ApiErrorResponse,
  EngineerAppointmentErrors,
  EngineerAppointmentInputs,
  EngineerAppointmentSuccess,
  FetchError,
  GetCICSResponse,
  InitialBasket,
  InitialVulnerabilityAndAccessibility,
  QuoteLookupErrors,
  QuoteLookupInputs,
  QuoteLookupSuccess,
  ReferralSessionErrors,
  ReferralSessionInputs,
  ReferralSessionSuccess,
  ResponseStates,
  RunCreditCheckResponse,
  SendEmailCodeResponse,
  SwitchMatchLookupErrors,
  SwitchMatchLookupInputs,
  SwitchMatchLookupSuccess,
  ValidateEmailCodeResponse,
  ValidationError,
  ValidationErrorDetail,
} from "./payloadTypes";

export const fetchFromPayload = async <T>(
  path: string,
  method: "POST" | "GET" | "PATCH",
  bodyObject?: Record<string, unknown>,
): Promise<T> => {
  const url = `${API_BASE_URL}${path}`;

  const params: Record<string, unknown> = {
    method: method,
    headers: { "Content-Type": "application/json" },
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
  return data as T;
};

const getBodyValidationErrors = (body: ApiErrorResponse) => {
  if (body.errors) {
    const details: ValidationErrorDetail[] = body.errors.map((err) => ({
      label: err?.data?.errors?.[0]?.label || undefined,
      message: err.message,
      path: err?.data?.errors?.[0]?.path || undefined,
    }));

    throw new ValidationError(details);
  }
};

const getPayloadEndpoint = async <T>(path: string) => {
  return (await fetchFromPayload(path, "GET")) as T;
};

const postPayLoadEndpoint = async <TInput, TResponse>(
  path: string,
  data: TInput,
) => {
  const response = await fetchFromPayload<{ doc: TResponse }>(
    path,
    "POST",
    data as Record<string, unknown>,
  );
  return response.doc as TResponse;
};

const updatePayLoadEndpoint = async <TInput, TResponse>(
  path: string,
  data: TInput,
) => {
  const response = await fetchFromPayload<{ doc: TResponse }>(
    path,
    "PATCH",
    data as Record<string, unknown>,
  );
  return response.doc as TResponse;
};

// For the async functions, you need to define an interface for the response structure
interface AsyncResponseData<TSuccess = unknown, TError = unknown> {
  id: string;
  outputs?: {
    state?: "success" | "error" | "pending";
    apiSuccess?: TSuccess;
    apiErrors?: TError;
  };
  doc?: {
    id: string;
    outputs?: {
      state?: "success" | "error" | "pending";
      apiSuccess?: TSuccess;
      apiErrors?: TError;
    };
  };
}
const getPayLoadWithDocumentAsync = async <TSuccess, TError>(
  path: string,
): Promise<
  | { state: Extract<ResponseStates, "success">; data: TSuccess }
  | { state: Extract<ResponseStates, "error">; data: TError }
  | { state: Extract<ResponseStates, "pending">; documentID: string }
> => {
  try {
    const data = await fetchFromPayload<AsyncResponseData>(path, "GET");

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
  } catch (error) {
    throw error;
  }
};

const getPayloadWithDocumentRawAsync = async <TSuccess, TError>(
  path: string,
): Promise<
  | { state: Extract<ResponseStates, "success">; data: TSuccess }
  | { state: Extract<ResponseStates, "error">; data: TError }
  | { state: Extract<ResponseStates, "pending">; documentID: string }
> => {
  const data = await fetchFromPayload<AsyncResponseData>(path, "GET");

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
        data: { documentID: data.id, errors: data.outputs.apiErrors } as TError,
      };
    case "pending":
      return { state: "pending", documentID: data.id };
    default:
      throw new Error("Unexpected state for sync request.");
  }
};

const postPayloadWithDocumentAsync = async <TSuccess, TError>(
  path: string,
  inputs: Record<string, unknown>,
  requestProcessingType: "sync" | "async",
): Promise<
  | { state: Extract<ResponseStates, "success">; data: TSuccess }
  | { state: Extract<ResponseStates, "error">; data: TError }
  | { state: Extract<ResponseStates, "pending">; documentID: string }
> => {
  try {
    const apiRequest = { inputs: { ...inputs, requestProcessingType } };

    const data = await fetchFromPayload<AsyncResponseData>(
      path,
      "POST",
      apiRequest,
    );

    if (requestProcessingType === "sync") {
      switch (data.doc?.outputs?.state) {
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
      if (data.doc?.outputs?.state === "pending") {
        return { state: "pending", documentID: data.doc.id };
      } else {
        throw new Error("Unexpected state for async request.");
      }
    }

    throw new Error("The API did not respond properly");
  } catch (error) {
    throw error;
  }
};

export const payloadAPI = {
  createAddressLookupSync: (input: AddressLookupInputs) =>
    postPayloadWithDocumentAsync<AddressLookupSuccess, AddressLookupErrors>(
      "/addressLookups",
      input,
      "sync",
    ),
  createAddressLookupAsync: (input: AddressLookupInputs) =>
    postPayloadWithDocumentAsync<AddressLookupSuccess, AddressLookupErrors>(
      "/addressLookups",
      input,
      "async",
    ),
  getAddressLookup: (id: string) =>
    getPayLoadWithDocumentAsync<AddressLookupSuccess, AddressLookupErrors>(
      `/addressLookups/${id}`,
    ),
  createEngineerAppointmentSync: (input: EngineerAppointmentInputs) =>
    postPayloadWithDocumentAsync<
      EngineerAppointmentSuccess,
      EngineerAppointmentErrors
    >("/engineerAppointments", input, "sync"),
  createEngineerAppointmentAsync: (input: EngineerAppointmentInputs) =>
    postPayloadWithDocumentAsync<
      EngineerAppointmentSuccess,
      EngineerAppointmentErrors
    >("/engineerAppointments", input, "async"),
  getEngineerAppointment: (id: string) =>
    getPayLoadWithDocumentAsync<
      EngineerAppointmentSuccess,
      EngineerAppointmentErrors
    >(`/engineerAppointments/${id}`),

  // Switch Match Lookups
  createSwitchMatchLookupSync: (input: SwitchMatchLookupInputs) =>
    postPayloadWithDocumentAsync<
      SwitchMatchLookupSuccess,
      SwitchMatchLookupErrors
    >("/switchMatchLookups", input, "sync"),
  createSwitchMatchLookupAsync: (input: SwitchMatchLookupInputs) =>
    postPayloadWithDocumentAsync<
      SwitchMatchLookupSuccess,
      SwitchMatchLookupErrors
    >("/switchMatchLookups", input, "async"),
  getSwitchMatchLookup: (id: string) =>
    getPayLoadWithDocumentAsync<
      SwitchMatchLookupSuccess,
      SwitchMatchLookupErrors
    >(`/switchMatchLookups/${id}`),

  // Referral Sessions
  createReferralSessionSync: (input: ReferralSessionInputs) =>
    postPayloadWithDocumentAsync<ReferralSessionSuccess, ReferralSessionErrors>(
      "/referralSessions",
      input,
      "sync",
    ),
  createReferralSessionAsync: (input: ReferralSessionInputs) =>
    postPayloadWithDocumentAsync<ReferralSessionSuccess, ReferralSessionErrors>(
      "/referralSessions",
      input,
      "async",
    ),
  getReferralSession: (id: string) =>
    getPayLoadWithDocumentAsync<ReferralSessionSuccess, ReferralSessionErrors>(
      `/referralSessions/${id}`,
    ),

  // Quote Lookups
  createQuoteLookupSync: (input: QuoteLookupInputs) =>
    postPayloadWithDocumentAsync<QuoteLookupSuccess, QuoteLookupErrors>(
      "/newSaleQuoteLookups",
      input,
      "sync",
    ),
  createQuoteLookupAsync: (input: QuoteLookupInputs) =>
    postPayloadWithDocumentAsync<QuoteLookupSuccess, QuoteLookupErrors>(
      "/newSaleQuoteLookups",
      input,
      "async",
    ),
  getQuoteLookup: (id: string) =>
    getPayLoadWithDocumentAsync<QuoteLookupSuccess, QuoteLookupErrors>(
      `/newSaleQuoteLookups/${id}`,
    ),

  // Affiliate Sessions
  createAffiliateSessionSync: (input: AffiliateSessionInputs) =>
    postPayloadWithDocumentAsync<
      AffiliateSessionSuccess,
      AffiliateSessionErrors
    >("/affiliateSessions", input, "sync"),
  createAffiliateSessionAsync: (input: AffiliateSessionInputs) =>
    postPayloadWithDocumentAsync<
      AffiliateSessionSuccess,
      AffiliateSessionErrors
    >("/affiliateSessions", input, "async"),
  getAffiliateSession: (id: string) =>
    getPayLoadWithDocumentAsync<
      AffiliateSessionSuccess,
      AffiliateSessionErrors
    >(`/affiliateSessions/${id}`),

  getDefaultAffiliate: () =>
    getPayloadWithDocumentRawAsync<
      AffiliateSessionSuccess,
      AffiliateSessionErrors
    >("/affiliateSessions/default"),

  // Basket
  getBasket: (id: string) => getPayloadEndpoint<Basket>(`/baskets/${id}`),
  createBasket: (data: InitialBasket) =>
    postPayLoadEndpoint<InitialBasket, Basket>("/baskets", data),
  updateBasket: (id: string, data: Partial<Basket>) =>
    updatePayLoadEndpoint(`/baskets/${id}`, data),
  generateCICS: (basketID: string) =>
    getPayloadEndpoint(`/baskets/${basketID}/generate-cics`),
  runCreditCheck: (id: string) =>
    getPayloadEndpoint<RunCreditCheckResponse>(
      `/baskets/${id}/run-credit-check`,
    ),
  sendEmailCode: (id: string) =>
    getPayloadEndpoint<SendEmailCodeResponse>(`/baskets/${id}/send-email-code`),
  validateEmailCode: (id: string, code: string) =>
    getPayloadEndpoint<ValidateEmailCodeResponse>(
      `/baskets/${id}/validate-email-code/${code}`,
    ),

  // CI/CS
  getCICS: (basketID: string) =>
    getPayloadEndpoint<GetCICSResponse>(`/baskets/${basketID}/get-cics`),

  // V&A
  getVulnerabilityAndAccessibility: (id: string) =>
    getPayloadEndpoint<VulnerabilityAndAccessibility>(
      `/vulnerabilityAndAccessibility/${id}`,
    ),
  createVulnerabilityAndAccessibility: (
    data: InitialVulnerabilityAndAccessibility,
  ) =>
    postPayLoadEndpoint<
      InitialVulnerabilityAndAccessibility,
      VulnerabilityAndAccessibility
    >("/vulnerabilityAndAccessibility", data),
  updateVulnerabilityAndAccessibility: (
    id: string,
    data: Partial<VulnerabilityAndAccessibility>,
  ) => updatePayLoadEndpoint(`/vulnerabilityAndAccessibility/${id}`, data),

  // Kraken reference
  getAllSwitchMatchServiceProviders: () =>
    getPayloadEndpoint<KrakenSwitchMatchServiceProvider[]>(
      "/krakenSwitchMatchServiceProviders/all-active",
    ),

  //Signup
  signUpToKraken: (basketId: string) =>
    getPayloadEndpoint<Basket>(`/baskets/${basketId}/signup`),
};
