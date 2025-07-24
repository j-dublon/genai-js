import {
  FieldError,
  FieldErrors,
  FieldValues,
  get,
  Path,
  UseFormRegister,
} from "react-hook-form";

import FormInput from "@/components/FormInput";

interface ManualAddressFieldsProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  hasSubmitted: boolean;
  fieldPlaceholders?: {
    line1?: string;
    line2?: string;
    line3?: string;
    postcode?: string;
  };
  fieldPrefix?: string;
}

export const ManualAddressFields = <TFieldValues extends FieldValues>({
  register,
  errors,
  hasSubmitted,
  fieldPlaceholders = {
    line1: "House number/name",
    line2: "First line of your address",
    line3: "Second line of your address",
    postcode: "Postcode",
  },
  fieldPrefix = "addressHistory",
}: ManualAddressFieldsProps<TFieldValues>) => {
  const buildPath = (field: string) =>
    (fieldPrefix ? `${fieldPrefix}.${field}` : field) as Path<TFieldValues>;

  const line1Path = buildPath("line1");
  const line2Path = buildPath("line2");
  const line3Path = buildPath("line3");
  const postcodePath = buildPath("postcode");

  const getNestedError = (path: string): FieldError | undefined => {
    const error = get(errors, path);
    return error as FieldError | undefined;
  };

  return (
    <div className="flex flex-col gap-6 mb-6 items-start">
      <div className="flex flex-col gap-6 w-full">
        <FormInput
          id={line1Path}
          placeholder={fieldPlaceholders.line1}
          error={getNestedError(line1Path)}
          {...register(line1Path)}
          hasSubmitted={hasSubmitted}
          aria-label="House number/name"
        />
        <FormInput
          id={line2Path}
          placeholder={fieldPlaceholders.line2}
          {...register(line2Path)}
          error={getNestedError(line2Path)}
          hasSubmitted={hasSubmitted}
          aria-label="First line of your address"
        />
        <FormInput
          id={line3Path}
          placeholder={fieldPlaceholders.line3}
          {...register(line3Path)}
          error={getNestedError(line3Path)}
          hasSubmitted={hasSubmitted}
          aria-label="Second line of your address"
        />
        <FormInput
          id={postcodePath}
          placeholder={fieldPlaceholders.postcode}
          {...register(postcodePath)}
          error={getNestedError(postcodePath)}
          hasSubmitted={hasSubmitted}
          aria-label="Postcode"
        />
      </div>
    </div>
  );
};
