import { z } from "zod";

export const softCreditCheckRetryFormSchema = z
  .object({
    dobDay: z
      .string()
      .min(1, "Day is required")
      .refine(
        (val) => {
          const num = Number(val);
          return !isNaN(num) && num >= 1 && num <= 31;
        },
        {
          message: "Day must be between 1 and 31",
        },
      ),
    dobMonth: z
      .string()
      .min(1, "Month is required")
      .refine(
        (val) => {
          const num = Number(val);
          return !isNaN(num) && num >= 1 && num <= 12;
        },
        {
          message: "Month must be between 1 and 12",
        },
      ),
    dobYear: z
      .string()
      .min(4, "Year is required")
      .refine(
        (val) => {
          const num = Number(val);
          return !isNaN(num) && num > 1900 && num <= new Date().getFullYear();
        },
        {
          message: "Enter a valid year",
        },
      ),
    residencyDuration: z
      .enum(["over-year", "under-year"], {
        required_error: "Residency duration is required",
        invalid_type_error: "Residency duration is required",
      })
      .nullable()
      .refine((val) => val !== null, {
        message: "Residency duration is required",
      }),
    addressLine1: z.string().optional(),
    addressLine2: z.string().optional(),
    addressLine3: z.string().optional(),
    postcode: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    const day = Number(values.dobDay);
    const month = Number(values.dobMonth);
    const year = Number(values.dobYear);

    if (
      !isNaN(day) &&
      day >= 1 &&
      day <= 31 &&
      !isNaN(month) &&
      month >= 1 &&
      month <= 12 &&
      !isNaN(year) &&
      year > 1900 &&
      year <= new Date().getFullYear()
    ) {
      const dob = new Date(year, month - 1, day);
      const today = new Date();
      const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate(),
      );
      if (dob > eighteenYearsAgo) {
        ["dobDay", "dobMonth", "dobYear"].forEach((field) =>
          ctx.addIssue({
            path: [field],
            message: "You must be at least 18 years old",
            code: z.ZodIssueCode.custom,
          }),
        );
      }
    }

    if (values.residencyDuration === "under-year") {
      if (
        !values.addressLine1 ||
        !values.addressLine2 ||
        !values.addressLine3 ||
        !values.postcode
      ) {
        ["addressLine1", "addressLine2", "addressLine3", "postcode"].forEach(
          (field) =>
            ctx.addIssue({
              path: [field],
              message: "Address is required",
              code: z.ZodIssueCode.custom,
            }),
        );
      }
    }
  });

export type SoftCreditCheckRetryFormInputs = z.input<
  typeof softCreditCheckRetryFormSchema
>;

export type SoftCreditCheckRetryFormValues = z.infer<
  typeof softCreditCheckRetryFormSchema
>;
