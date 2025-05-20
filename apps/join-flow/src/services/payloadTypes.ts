import {
  AddressLookup,
  AffiliateSession,
  EngineerAppointment,
  QuoteLookup,
  ReferralSession,
  SwitchMatchLookup,
} from "../../payload-types";

export type GenericSquidResponse = GenericSyncAsyncResponse;

export type GenericSyncAsyncResponse =
  | AddressLookup
  | AffiliateSession
  | EngineerAppointment
  | SwitchMatchLookup
  | QuoteLookup
  | ReferralSession;

export type ResponseStates = NonNullable<
  NonNullable<GenericSyncAsyncResponse["outputs"]>["state"]
>;

export class FetchError extends Error {
  constructor(
    public status: number,
    public statusText: string,
  ) {
    super(`HTTP Error: ${status} ${statusText}`);
    this.name = "FetchError";
  }
}

export type ValidationErrorDetail = {
  label?: string;
  message: string;
  path?: string;
};

export class ValidationError extends Error {
  public details: ValidationErrorDetail[];

  constructor(details: ValidationErrorDetail[]) {
    super("Payload Validation Error");
    this.name = "PayloadValidationError";
    this.details = details;

    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

// Define the type for an identifier from the API response

export type AddressLookupSuccess = {
  documentID: string;
  response: NonNullable<NonNullable<AddressLookup["outputs"]>["apiSuccess"]>;
};
export type AddressLookupErrors = {
  documentID: string;
  errors: NonNullable<NonNullable<AddressLookup["outputs"]>["apiErrors"]>;
};
export type AddressLookupInputs = Omit<
  NonNullable<NonNullable<AddressLookup["inputs"]>>,
  "requestProcessingType"
>;

export type AffiliateSessionSuccess = {
  documentID: string;
  response: NonNullable<NonNullable<AffiliateSession["outputs"]>["apiSuccess"]>;
};
export type AffiliateSessionErrors = {
  documentID: string;
  errors: NonNullable<NonNullable<AffiliateSession["outputs"]>["apiErrors"]>;
};
export type AffiliateSessionInputs = Omit<
  NonNullable<NonNullable<AffiliateSession["inputs"]>>,
  "requestProcessingType"
>;

export type EngineerAppointmentSuccess = {
  documentID: string;
  response: NonNullable<
    NonNullable<EngineerAppointment["outputs"]>["apiSuccess"]
  >;
};
export type EngineerAppointmentErrors = {
  documentID: string;
  errors: NonNullable<NonNullable<EngineerAppointment["outputs"]>["apiErrors"]>;
};
export type EngineerAppointmentInputs = Omit<
  NonNullable<NonNullable<EngineerAppointment["inputs"]>>,
  "requestProcessingType"
>;

export type SwitchMatchLookupSuccess = {
  documentID: string;
  response: NonNullable<
    NonNullable<SwitchMatchLookup["outputs"]>["apiSuccess"]
  >;
};
export type SwitchMatchLookupErrors = {
  documentID: string;
  errors: NonNullable<NonNullable<SwitchMatchLookup["outputs"]>["apiErrors"]>;
};
export type SwitchMatchLookupInputs = Omit<
  NonNullable<NonNullable<SwitchMatchLookup["inputs"]>>,
  "requestProcessingType"
>;

export type ReferralSessionSuccess = {
  documentID: string;
  response: NonNullable<NonNullable<ReferralSession["outputs"]>["apiSuccess"]>;
};
export type ReferralSessionErrors = {
  documentID: string;
  errors: NonNullable<NonNullable<ReferralSession["outputs"]>["apiErrors"]>;
};
export type ReferralSessionInputs = Omit<
  NonNullable<NonNullable<ReferralSession["inputs"]>>,
  "requestProcessingType"
>;

export type QuoteLookupSuccess = {
  documentID: string;
  response: NonNullable<NonNullable<QuoteLookup["outputs"]>["apiSuccess"]>;
};
export type QuoteLookupErrors = {
  documentID: string;
  errors: NonNullable<NonNullable<QuoteLookup["outputs"]>["apiErrors"]>;
};
export type QuoteLookupInputs = Omit<
  NonNullable<NonNullable<QuoteLookup["inputs"]>>,
  "requestProcessingType"
>;
