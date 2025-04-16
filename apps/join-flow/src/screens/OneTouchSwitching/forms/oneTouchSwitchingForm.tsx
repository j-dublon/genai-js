"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import FormInput from "@/components/FormInput";
import {
  broadbandProviders,
  oneTouchSwitchingText,
} from "@/screens/OneTouchSwitching/oneTouchSwitchingProps";

import {
  OneTouchSwitchingFormData,
  OneTouchSwitchingFormProps,
  oneTouchSwitchingSchema,
} from "./formValues";

export const OneTouchSwitchingForm = ({
  onSubmit,
  defaultProvider = "",
  matchResult,
  setMatchResult,
  isSubmitting = false,
}: OneTouchSwitchingFormProps) => {
  const [customProviderError, setCustomProviderError] = useState<string | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OneTouchSwitchingFormData>({
    resolver: zodResolver(oneTouchSwitchingSchema),
    defaultValues: {
      provider: defaultProvider,
      consentGiven: false,
      accountNumber: "",
    },
  });

  const selectedProvider = watch("provider");

  const handleFormSubmit = async (data: OneTouchSwitchingFormData) => {
    setCustomProviderError(null);

    if (!data.provider) {
      setCustomProviderError("Please select a provider from the list");
      return;
    }

    await onSubmit(data);
  };

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("provider", e.target.value);
    setValue("consentGiven", false);
    setMatchResult(null);
    setCustomProviderError(null);
  };

  return (
    <form id="oneTouchSwitchingForm" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="mb-8 p-5 border border-ui-grey-300 rounded-md bg-ui-grey-100">
        <h3 className="font-medium mb-3 text-core-black">
          {oneTouchSwitchingText.providerSelectionTitle}
        </h3>

        <select
          {...register("provider")}
          value={matchResult?.provider?.id || selectedProvider}
          onChange={handleProviderChange}
          className={`w-full p-3 border ${
            errors.provider || customProviderError
              ? "border-ui-error"
              : "border-ui-grey-300"
          } rounded-md`}
        >
          <option value="" disabled>
            {oneTouchSwitchingText.providerSelectorDefault}
          </option>
          {broadbandProviders.map((provider) => (
            <option key={provider.id} value={provider.id}>
              {provider.name}
            </option>
          ))}
        </select>

        {(errors.provider || customProviderError) && (
          <p className="text-ui-error text-sm mt-1">
            {customProviderError || errors.provider?.message}
          </p>
        )}

        <p className="mt-3 text-sm text-ui-grey-500">
          {oneTouchSwitchingText.oneTouchExplanation}
        </p>
      </div>

      <div className="my-4">
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="consent-checkbox"
            {...register("consentGiven")}
            className="mr-2"
            disabled={isSubmitting}
          />
          <label htmlFor="consent-checkbox">
            {oneTouchSwitchingText.consentLabel}
          </label>
        </div>
        {errors.consentGiven && (
          <p className="text-ui-error text-sm mt-1">
            {errors.consentGiven.message}
          </p>
        )}
      </div>

      {isSubmitting && (
        <div className="flex justify-center items-center mt-6 h-20">
          <div className="spinner animate-spin w-10 h-10 border-4 border-ui-grey-300 border-t-yellow-500 rounded-full"></div>
        </div>
      )}

      {matchResult && !matchResult.success && (
        <div className="mb-8">
          <p className="font-medium">{matchResult.message}</p>

          <div className="mt-4">
            <p className="text-sm mb-6">
              {oneTouchSwitchingText.accountNumberPrompt}
            </p>
            <FormInput
              id="account-number"
              placeholder={oneTouchSwitchingText.accountNumberPlaceholder}
              {...register("accountNumber")}
              className="mb-4"
              disabled={isSubmitting}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default OneTouchSwitchingForm;
