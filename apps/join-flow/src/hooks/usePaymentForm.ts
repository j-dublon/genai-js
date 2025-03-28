import useJoinFlowStore from "@store/useJoinFlowStore";
import { Address } from "@store/useJoinFlowStore";
import { useEffect, useState } from "react";
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

  const {
    register,
    handleSubmit,
    watch,
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

  const sameAsServiceAddress = watch("sameAsServiceAddress");
  const [billingAddress, setBillingAddress] = useState<Address | null>(
    paymentDetails?.billingAddress || personalDetails?.address || null,
  );

  useEffect(() => {
    if (sameAsServiceAddress && personalDetails?.address) {
      setBillingAddress(personalDetails.address);
    } else if (!sameAsServiceAddress) {
      setBillingAddress(null);
    }
  }, [sameAsServiceAddress, personalDetails?.address]);

  const savePaymentDetails = (data: PaymentFormValues) => {
    const useSameAddress = data.sameAsServiceAddress ?? true;

    setPaymentDetails({
      accountholderName: data.accountholderName,
      cardToken: "bank_account",
      accountNumber: data.accountNumber,
      sortCode: data.sortCode,
      billingAddress: useSameAddress
        ? personalDetails?.address || null
        : billingAddress,
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
