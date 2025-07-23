import { zodResolver } from "@hookform/resolvers/zod";
import { TickWithCircle } from "@react-component-library/ui/icons";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { usePostHog } from "posthog-js/react";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import FormInput from "@/components/FormInput";
import { SortCodeInput } from "@/screens/PaymentDetails/components/SortCodeInput";

import { paymentDetailsText } from "../PaymentDetailsProps";
import { FormValues, paymentFormSchema, PaymentFormValues } from "./formValues";

export const PaymentForm = ({
  onSubmit,
}: {
  onSubmit: (data: PaymentFormValues) => Promise<boolean>;
}) => {
  const {
    paymentDetails,
    personalDetails,
    setPaymentDetails,
    serviceAddress,
    billingAddress,
  } = useJoinFlowStore();

  const posthog = usePostHog();

  const {
    accountholderNamePlaceholder,
    accountNumberPlaceholder,
    sortCodePlaceholder,
  } = paymentDetailsText;

  const initialAccountHolderName =
    paymentDetails?.accountholderName ||
    (personalDetails
      ? `${personalDetails.firstName} ${personalDetails.lastName}`
      : "");
  const initialAccountNumber = paymentDetails?.accountNumber || "";
  const initialSortCode = paymentDetails?.sortCode || "";

  const defaultValues: FormValues = {
    accountholderName: initialAccountHolderName,
    accountNumber: initialAccountNumber,
    sortCode: initialSortCode,
    sameAsServiceAddress: billingAddress ? false : true,
    isAccountHolder: paymentDetails?.isAccountHolder || false,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitting },
    watch,
    trigger,
    setValue,
  } = form;

  const fieldsModified = Object.keys(dirtyFields).length > 0;

  useEffect(() => {
    try {
      const isInModal = document.querySelector("dialog[open]") !== null;

      if (isInModal && !fieldsModified && paymentDetails?.isAccountHolder) {
        setValue("isAccountHolder", true);
      } else if (fieldsModified) {
        setValue("isAccountHolder", false);
      }
    } catch (err) {
      console.error("Error updating isAccountHolder checkbox state:", err);
    }
  }, [fieldsModified, paymentDetails?.isAccountHolder, setValue]);

  const savePaymentDetails = useCallback(
    (data: FormValues) => {
      const useSameAddress = data.sameAsServiceAddress;

      if (!data.isAccountHolder) {
        return false;
      }

      if (!serviceAddress) {
        return false;
      }

      let resolvedBillingAddress = undefined;

      if (useSameAddress) {
        resolvedBillingAddress = {
          line1: serviceAddress.line1,
          line2: serviceAddress.line2,
          line3: serviceAddress.line3,
          postcode: serviceAddress.postcode,
        };
      } else {
        resolvedBillingAddress = billingAddress
          ? {
              line1: billingAddress.line1,
              line2: billingAddress.line2,
              line3: billingAddress.line3,
              postcode: billingAddress.postcode,
            }
          : undefined;
      }

      setPaymentDetails({
        accountholderName: data.accountholderName,
        accountNumber: data.accountNumber,
        sortCode: data.sortCode,
        billingAddress: resolvedBillingAddress,
        sameAsServiceAddress: useSameAddress,
        isAccountHolder: data.isAccountHolder,
        termsAgreed: paymentDetails?.termsAgreed || false,
        directDebitAgreed: paymentDetails?.directDebitAgreed || false,
        creditSearchAgreed: paymentDetails?.creditSearchAgreed || false,
        allTermsAgreed: paymentDetails?.allTermsAgreed || false,
      });

      return true;
    },
    [
      setPaymentDetails,
      paymentDetails?.termsAgreed,
      paymentDetails?.directDebitAgreed,
      paymentDetails?.creditSearchAgreed,
      paymentDetails?.allTermsAgreed,
      serviceAddress,
      billingAddress,
    ],
  );

  const formSubmitHandler = useCallback(
    async (data: FormValues) => {
      posthog.capture("join_flow_submitted_payment_details");
      if (!data.isAccountHolder) {
        await trigger("isAccountHolder");
        return;
      }

      const isValid = await trigger();

      if (!isValid) return;

      const submitSuccess = await onSubmit(data as PaymentFormValues);

      if (submitSuccess) {
        savePaymentDetails(data);
      }
    },
    [savePaymentDetails, onSubmit, trigger],
  );

  const accountholderName = watch("accountholderName");
  const accountNumber = watch("accountNumber");
  const sortCode = watch("sortCode");
  const isAccountHolder = watch("isAccountHolder");

  const isFormModified =
    (!!accountholderName &&
      !!initialAccountHolderName &&
      accountholderName !== initialAccountHolderName) ||
    (!!accountNumber &&
      !!initialAccountNumber &&
      accountNumber !== initialAccountNumber) ||
    (!!sortCode && !!initialSortCode && sortCode !== initialSortCode);

  const isAccountholderNameValid = accountholderName?.trim().length > 0;
  const isAccountNumberValid = /^\d{8}$/.test(accountNumber || "");
  const isSortCodeValid = /^\d{2}-\d{2}-\d{2}$/.test(sortCode || "");

  const isAccountHolderChecked = !!isAccountHolder;

  const { ref: accountHolderRegisterRef, ...accountHolderRegisterRest } =
    register("isAccountHolder", {
      required: "You must confirm that you are the account holder",
    });

  const combineRefs = (element: HTMLInputElement | null) => {
    accountHolderRegisterRef(element);

    if (element && paymentDetails?.isAccountHolder && !fieldsModified) {
      element.checked = true;
    }
  };

  return (
    <form
      id="payment-form"
      data-testid="payment-form"
      onSubmit={handleSubmit(formSubmitHandler)}
      noValidate
      aria-busy={isSubmitting}
    >
      <div className="mb-6">
        <div className="relative">
          <FormInput
            {...register("accountholderName")}
            id="accountholderName"
            placeholder={accountholderNamePlaceholder}
            error={errors.accountholderName}
            disabled={isSubmitting}
          />
          {isAccountholderNameValid && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <TickWithCircle width={22} height={22} circleFill={"#009EA8"} />
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <FormInput
            {...register("accountNumber")}
            id="accountNumber"
            placeholder={accountNumberPlaceholder}
            error={errors.accountNumber}
            disabled={isSubmitting}
          />
          {isAccountNumberValid && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <TickWithCircle width={22} height={22} circleFill={"#009EA8"} />
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <SortCodeInput
            register={register("sortCode")}
            id="sortCode"
            placeholder={sortCodePlaceholder}
            error={errors.sortCode}
            inputProps={{
              disabled: isSubmitting,
            }}
          />
          {isSortCodeValid && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <TickWithCircle width={22} height={22} circleFill={"#009EA8"} />
            </div>
          )}
        </div>
      </div>

      <div className="mb-6" id="account-holder-container">
        <label className="flex items-center">
          <input
            type="checkbox"
            className={`w-5 h-5 mr-3 ${isAccountHolderChecked ? "border-green-500" : ""}`}
            id="isAccountHolder"
            defaultChecked={paymentDetails?.isAccountHolder}
            ref={combineRefs}
            {...accountHolderRegisterRest}
            data-unchanged={!isFormModified}
            disabled={isSubmitting}
          />
          <span className="text-sm">
            {paymentDetailsText.confirmAccountHolder}
          </span>
        </label>
        {errors.isAccountHolder && (
          <p
            className="text-ui-error text-sm mt-2 ml-8"
            id="account-holder-error"
          >
            {errors.isAccountHolder.message}
          </p>
        )}
      </div>
    </form>
  );
};
