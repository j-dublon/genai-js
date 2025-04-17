import { zodResolver } from "@hookform/resolvers/zod";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { Address } from "@store/useJoinFlowStore";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import FormInput from "@/components/FormInput";

import { paymentDetailsText } from "../PaymentDetailsProps";
import { paymentFormSchema, PaymentFormValues } from "./formValues";

export const PaymentForm = ({
  onSubmit,
}: {
  onSubmit: (data: PaymentFormValues) => void;
}) => {
  const { paymentDetails, personalDetails, setPaymentDetails } =
    useJoinFlowStore();

  //TO DO: billing address to be changed once review your basket is completed
  const billingAddress: Address | null = paymentDetails?.billingAddress || null;

  const {
    accountholderNamePlaceholder,
    accountNumberPlaceholder,
    sortCodePlaceholder,
  } = paymentDetailsText;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      accountholderName:
        paymentDetails?.accountholderName ||
        (personalDetails
          ? `${personalDetails.firstName} ${personalDetails.lastName}`
          : ""),
      accountNumber: paymentDetails?.accountNumber || "",
      sortCode: paymentDetails?.sortCode || "",
      sameAsServiceAddress: paymentDetails?.sameAsServiceAddress ?? true,
    },
  });

  const savePaymentDetails = useCallback(
    (data: PaymentFormValues) => {
      const useSameAddress = data.sameAsServiceAddress ?? true;

      setPaymentDetails({
        accountholderName: data.accountholderName,
        cardToken: "bank_account",
        accountNumber: data.accountNumber,
        sortCode: data.sortCode,
        billingAddress: billingAddress,
        sameAsServiceAddress: useSameAddress,
        termsAgreed: paymentDetails?.termsAgreed || false,
        directDebitAgreed: paymentDetails?.directDebitAgreed || false,
        creditSearchAgreed: paymentDetails?.creditSearchAgreed || false,
        allTermsAgreed: paymentDetails?.allTermsAgreed || false,
      });

      return true;
    },
    [billingAddress, paymentDetails, setPaymentDetails],
  );

  const handleFormSubmit = useCallback(
    (data: PaymentFormValues) => {
      savePaymentDetails(data);
      onSubmit(data);
    },
    [savePaymentDetails, onSubmit],
  );

  const accountholderName = watch("accountholderName");
  const accountNumber = watch("accountNumber");
  const sortCode = watch("sortCode");

  const isAccountholderNameValid = accountholderName?.trim().length > 0;
  const isAccountNumberValid = /^\d{8}$/.test(accountNumber || "");
  const isSortCodeValid = /^\d{2}-\d{2}-\d{2}$/.test(sortCode || "");

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit(handleFormSubmit)}
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
            <svg
              className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
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
            <svg
              className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <FormInput
            {...register("sortCode")}
            id="sortCode"
            placeholder={sortCodePlaceholder}
            error={errors.sortCode}
          />
          {isSortCodeValid && (
            <svg
              className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;
