import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ZodType } from "zod";

import { ManualAddressFields } from "./ManualAddressFields";

interface ManualAddressFormProps<T extends FieldValues> {
  onSubmit?: (data: T) => Promise<void>;
  schema: ZodType<T>;
  defaultValues: DefaultValues<T>;
  title?: string;
  isSubmitting?: boolean;
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
  fieldPrefix?: string;
}

export const ManualAddressForm = <T extends FieldValues>({
  onSubmit,
  schema,
  defaultValues,
  formId,
  title,
  isSubmitting: externalIsSubmitting,
  fieldPlaceholders = {
    line1: "House number/name",
    line2: "First line of your address",
    line3: "Second line of your address",
    postcode: "Postcode",
  },
  fieldPrefix,
}: ManualAddressFormProps<T>) => {
  // Auto-detect field prefix - if not provided, default to empty for flat schemas
  const autoFieldPrefix = fieldPrefix ?? "";
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting: formIsSubmitting },
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const isSubmitting = externalIsSubmitting ?? formIsSubmitting;

  const formSubmitHandler: SubmitHandler<T> = async (data) => {
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
        fieldPrefix={autoFieldPrefix}
      />
    </form>
  );
};
