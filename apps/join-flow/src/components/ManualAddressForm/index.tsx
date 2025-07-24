import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { additionalAddressSchema } from "@/validation/join-flow-schema";

import { ManualAddressFields } from "./ManualAddressFields";

export type ManualAddressFormInputs = z.infer<typeof additionalAddressSchema>;

interface ManualAddressFormProps {
  onSubmit?: (data: ManualAddressFormInputs) => Promise<void>;
  title?: string;
  isSubmitting?: boolean;
  defaultValues?: Partial<ManualAddressFormInputs>;
  fieldLabels?: {
    line1?: string;
    line2?: string;
    line3?: string;
    postcode?: string;
  };
  fieldPlaceholders?: {
    line1?: string;
    line2?: string;
    line3?: string;
    postcode?: string;
  };
  formId?: string;
}

export const ManualAddressForm = ({
  onSubmit,
  formId,
  title,
  isSubmitting: externalIsSubmitting,
  defaultValues = {
    line1: "",
    line2: "",
    line3: "",
    postcode: "",
    identifiers: [],
  },
  fieldPlaceholders = {
    line1: "House number/name",
    line2: "First line of your address",
    line3: "Second line of your address",
    postcode: "Postcode",
  },
}: ManualAddressFormProps) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting: formIsSubmitting },
  } = useForm<ManualAddressFormInputs>({
    resolver: zodResolver(additionalAddressSchema),
    defaultValues,
  });

  const isSubmitting = externalIsSubmitting ?? formIsSubmitting;

  const formSubmitHandler = async (data: ManualAddressFormInputs) => {
    const isFormValid = await trigger();

    if (!isFormValid) {
      return;
    }

    setHasSubmitted(true);
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  return (
    <form
      id={formId}
      aria-label="Manual address entry form"
      aria-busy={isSubmitting}
      onSubmit={handleSubmit(formSubmitHandler)}
    >
      {title && (
        <div className="mb-6">
          <h2 className="text-xs leading-[162.5%] font-medium md:text-sm">
            {title}
          </h2>
        </div>
      )}

      <ManualAddressFields
        register={register}
        errors={errors}
        hasSubmitted={hasSubmitted}
        fieldPlaceholders={fieldPlaceholders}
        fieldPrefix="addressHistory"
      />
    </form>
  );
};
