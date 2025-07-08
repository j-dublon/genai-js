import {
  AddressLookup,
  AffiliateSession,
  Basket,
  CreditCheckExecution,
  EngineerAppointment,
  NewSaleQuoteLookup,
  ReferralSession,
  RegisterOfInterestSubmission,
  RegradeQuoteLookup,
  RenewalQuoteLookup,
  SwitchMatchLookup,
  VulnerabilityAndAccessibility,
} from "../../payload-types";

export type GenericSquidResponse = GenericSyncAsyncResponse;

export type GenericSyncAsyncResponse =
  | AddressLookup
  | AffiliateSession
  | EngineerAppointment
  | SwitchMatchLookup
  | NewSaleQuoteLookup
  | ReferralSession;

export type ResponseStates = NonNullable<
  NonNullable<GenericSyncAsyncResponse["outputs"]>["state"]
>;

export class FetchError extends Error {
  public params: RequestInit;
  public bodyString: string;
  public url: string;
  public response: Response;

  constructor(
    status: number,
    statusText: string,
    url: string,
    params: RequestInit,
    response: Response,
  ) {
    super(`HTTP Error: ${status} ${statusText}`);
    this.name = "FetchError";

    this.params = params;
    this.url = url;
    this.response = response;
    this.bodyString = JSON.stringify(params.body);
  }
}

export type ValidationErrorDetail = {
  label?: string;
  message: string;
  path?: string;
};

export class ValidationError extends Error {
  public details: ValidationErrorDetail[];
  public detailsString: string;

  constructor(details: ValidationErrorDetail[]) {
    super("Payload Validation Error");
    this.name = "PayloadValidationError";
    this.details = details;
    this.detailsString = JSON.stringify(details);
  }
}

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

export type AffiliateSessionSuccessData = NonNullable<
  NonNullable<AffiliateSession["outputs"]>["apiSuccess"]
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
export type GoLiveDateSuccess = {
  documentID: string;
  response: NonNullable<NonNullable<string[]>>;
};
export type GoLiveDateErrors = {
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
  response: NonNullable<
    NonNullable<NewSaleQuoteLookup["outputs"]>["apiSuccess"]
  >;
};
export type QuoteLookupErrors = {
  documentID: string;
  errors: NonNullable<NonNullable<NewSaleQuoteLookup["outputs"]>["apiErrors"]>;
};
export type QuoteLookupInputs = Omit<
  NonNullable<NonNullable<NewSaleQuoteLookup["inputs"]>>,
  "requestProcessingType"
>;

export type RegisterOfInterestSubmissionsSuccess = {
  documentID: string;
  response: NonNullable<
    NonNullable<RegisterOfInterestSubmission["outputs"]>["apiSuccess"]
  >;
};
export type RegisterOfInterestSubmissionsErrors = {
  documentID: string;
  errors: NonNullable<
    NonNullable<RegisterOfInterestSubmission["outputs"]>["apiErrors"]
  >;
};
export type RegisterOfInterestSubmissionsInputs = Omit<
  NonNullable<NonNullable<RegisterOfInterestSubmission["inputs"]>>,
  "requestProcessingType"
>;

export type InitialBasket = Omit<
  Omit<Omit<Basket, "createdAt">, "id">,
  "updatedAt"
>;

export type RunCreditCheckResponse = {
  status: NonNullable<
    NonNullable<CreditCheckExecution["outputs"]>["apiSuccess"]
  >["status"];
  message?: string;
};

export type SendEmailCodeResponse = {
  success: boolean;
};

export type ValidateEmailCodeResponse = {
  success: boolean;
  message?: string;
};

export type InitialVulnerabilityAndAccessibility = Omit<
  Omit<Omit<VulnerabilityAndAccessibility, "createdAt">, "id">,
  "updatedAt"
>;

export type SignupResponse =
  | {
      success: true;
      accountNumber: string;
    }
  | {
      success: false;
      // NOTE because this is not linked to payload we don't get actual block type hints, once in monorepo this will be much better
      errorBlocks?: {
        errorMessage?: string;
        blockType?: string;
      }[];
    };

export type RegradeResponse =
  | {
      success: true;
    }
  | {
      success: false;
      // NOTE because this is not linked to payload we don't get actual block type hints, once in monorepo this will be much better
      errorBlocks?: {
        errorMessage?: string;
        blockType?: string;
      }[];
    };

export type RenewalResponse =
  | {
      success: true;
    }
  | {
      success: false;
      // NOTE because this is not linked to payload we don't get actual block type hints, once in monorepo this will be much better
      errorBlocks?: {
        errorMessage?: string;
        blockType?: string;
      }[];
    };

export type GenerateCICSResponse =
  | {
      success: true;
      cics?: {
        informationHref: string;
        summaryHref: string;
      };
    }
  | {
      success: false;
      // NOTE because this is not linked to payload we don't get actual block type hints, once in monorepo this will be much better
      errorBlocks?: {
        errorMessage?: string;
        blockType?: string;
      }[];
    };

export type GetCICSResponse = Basket["cics"];

export type RenewalQuoteLookupSuccess = {
  documentID: string;
  response: NonNullable<
    NonNullable<RenewalQuoteLookup["outputs"]>["apiSuccess"]
  >;
};
export type RenewalQuoteLookupErrors = {
  documentID: string;
  errors: NonNullable<NonNullable<RenewalQuoteLookup["outputs"]>["apiErrors"]>;
};
export type RenewalQuoteLookupInputs = Omit<
  NonNullable<NonNullable<RenewalQuoteLookup["inputs"]>>,
  "requestProcessingType"
>;

export type RegradeQuoteLookupSuccess = {
  documentID: string;
  response: NonNullable<
    NonNullable<RegradeQuoteLookup["outputs"]>["apiSuccess"]
  >;
};
export type RegradeQuoteLookupErrors = {
  documentID: string;
  errors: NonNullable<NonNullable<RegradeQuoteLookup["outputs"]>["apiErrors"]>;
};
export type RegradeQuoteLookupInputs = Omit<
  NonNullable<NonNullable<RegradeQuoteLookup["inputs"]>>,
  "requestProcessingType"
>;
