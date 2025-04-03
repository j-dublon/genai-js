import useJoinFlowStore from "@store/useJoinFlowStore";
import { Address } from "@store/useJoinFlowStore";
import { useState } from "react";
import { useForm } from "react-hook-form";

export type PaymentFormValues = {
  accountholderName: string;
  accountNumber: string;
  sortCode: string;
  sameAsServiceAddress?: boolean;
};

export const usePaymentForm = () => {
  const { paymentDetails, personalDetails, setPaymentDetails } =
    useJoinFlowStore();

  //TO DO: billing address needs to come from the api first, before we implement change adddress
  const [billingAddress] = useState<Address | null>(
    paymentDetails?.billingAddress || null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormValues>({
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

  const savePaymentDetails = (data: PaymentFormValues) => {
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
  };

  return {
    register,
    handleSubmit,
    errors,
    billingAddress,
    savePaymentDetails,
  };
};
