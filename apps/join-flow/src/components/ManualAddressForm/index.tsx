import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import FormInput from "@/components/FormInput";
import { additionalAddressSchema } from "@/validation/join-flow-schema";

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
  fieldLabels = {
    line1: "Address line 1",
    line2: "Address line 2",
    line3: "Town/City",
    postcode: "Postcode",
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

      <div className="flex flex-col gap-6 mb-6 items-start">
        <div className="flex flex-col gap-6 w-full">
          <FormInput
            id="line1"
            placeholder={fieldPlaceholders.line1}
            error={errors.line1}
            {...register("line1")}
            hasSubmitted={hasSubmitted}
            aria-label={fieldLabels.line1}
          />
          <FormInput
            id="line2"
            placeholder={fieldPlaceholders.line2}
            error={errors.line2}
            {...register("line2")}
            hasSubmitted={hasSubmitted}
            aria-label={fieldLabels.line2}
          />
          <FormInput
            id="line3"
            placeholder={fieldPlaceholders.line3}
            error={errors.line3}
            {...register("line3")}
            hasSubmitted={hasSubmitted}
            aria-label={fieldLabels.line3}
          />
          <FormInput
            id="postcode"
            placeholder={fieldPlaceholders.postcode}
            error={errors.postcode}
            {...register("postcode")}
            hasSubmitted={hasSubmitted}
            aria-label={fieldLabels.postcode}
          />
        </div>
      </div>
    </form>
  );
};
