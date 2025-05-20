import { zodResolver } from "@hookform/resolvers/zod";
import { TickWithCircle } from "@react-component-library/ui/icons";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { StoreAddress } from "@store/useJoinFlowStore";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import FormInput from "@/components/FormInput";
import { SortCodeInput } from "@/screens/PaymentDetails/components/SortCodeInput";

import { paymentDetailsText } from "../PaymentDetailsProps";
import { paymentFormSchema, PaymentFormValues } from "./formValues";
import { FormValues } from "./formValues";

export const PaymentForm = ({
  onSubmit,
  setSubmitHandler,
}: {
  onSubmit: (data: PaymentFormValues) => void;
  setSubmitHandler?: (
    submitHandler: (data: FormValues) => Promise<void>,
  ) => void;
}) => {
  const { paymentDetails, personalDetails, setPaymentDetails } =
    useJoinFlowStore();

  const billingAddress: StoreAddress | null =
    paymentDetails?.billingAddress || null;

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
    sameAsServiceAddress:
      paymentDetails?.sameAsServiceAddress === false ? false : true,
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
    formState: { errors, dirtyFields },
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

      setPaymentDetails({
        accountholderName: data.accountholderName,
        cardToken: "bank_account",
        accountNumber: data.accountNumber,
        sortCode: data.sortCode,
        billingAddress: billingAddress,
        sameAsServiceAddress: useSameAddress,
        isAccountHolder: data.isAccountHolder,
        termsAgreed: paymentDetails?.termsAgreed || false,
        directDebitAgreed: paymentDetails?.directDebitAgreed || false,
        creditSearchAgreed: paymentDetails?.creditSearchAgreed || false,
        allTermsAgreed: paymentDetails?.allTermsAgreed || false,
      });

      return true;
    },
    [billingAddress, paymentDetails, setPaymentDetails],
  );

  const formSubmitHandler = useCallback(
    async (data: FormValues) => {
      const isValid = await trigger();

      if (!data.isAccountHolder) {
        trigger("isAccountHolder");
        return;
      }

      if (isValid) {
        const saved = savePaymentDetails(data);
        if (saved) {
          onSubmit(data as PaymentFormValues);
        }
      }
    },
    [savePaymentDetails, onSubmit, trigger],
  );

  useEffect(() => {
    if (setSubmitHandler) {
      setSubmitHandler(formSubmitHandler);
    }
  }, [setSubmitHandler, formSubmitHandler]);

  const accountholderName = watch("accountholderName");
  const accountNumber = watch("accountNumber");
  const sortCode = watch("sortCode");
  const isAccountHolder = watch("isAccountHolder");

  const isFormModified =
    (accountholderName &&
      initialAccountHolderName &&
      accountholderName !== initialAccountHolderName) ||
    (accountNumber &&
      initialAccountNumber &&
      accountNumber !== initialAccountNumber) ||
    (sortCode && initialSortCode && sortCode !== initialSortCode);

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
    >
      <div className="mb-6">
        <div className="relative">
          <FormInput
            {...register("accountholderName")}
            id="accountholderName"
            placeholder={accountholderNamePlaceholder}
            error={errors.accountholderName}
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
          />
          <span className="text-sm">
            I confirm that I&apos;m the account holder
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
