import FormInput from "@/components/atoms/FormInput";

import type { InitialPersonalDetailsProps } from "./formValues";

const InitialPersonalDetailsForm = ({
  register,
  errors,
  hasSmartphoneValue,
  personalDetailsProps,
  renderMarketingText,
}: InitialPersonalDetailsProps) => {
  return (
    <form id="personalDetailsForm">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <FormInput
          id="firstName"
          placeholder={personalDetailsProps.fieldPlaceholders.firstName}
          error={errors.firstName}
          {...register("firstName")}
        />
        <FormInput
          id="lastName"
          placeholder={personalDetailsProps.fieldPlaceholders.lastName}
          error={errors.lastName}
          {...register("lastName")}
        />
      </div>

      <div className="mb-6">
        <FormInput
          id="phone"
          placeholder={personalDetailsProps.fieldPlaceholders.phone}
          error={errors.phone}
          {...register("phone")}
        />
      </div>

      <p className="text-md font-bold mb-4">
        {personalDetailsProps.smartphoneSection.mainText}
      </p>

      <div className="mb-6">
        <div className="flex flex-col gap-2">
          {personalDetailsProps.smartphoneSection.options.map((option) => (
            <div key={option.value} className="inline-flex items-center">
              <input
                type="radio"
                value={option.value}
                {...register("hasSmartphone")}
                className="mr-2"
              />
              {option.label}
            </div>
          ))}
        </div>
        {hasSmartphoneValue === "no" && (
          <p className="text-sm mt-2 text-ui-error">
            You&apos;ll need a smartphone to get Cuckoo. We can&apos;t provide
            our service without a smartphone.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <FormInput
          id="email"
          placeholder={personalDetailsProps.fieldPlaceholders.email}
          error={errors.email}
          {...register("email")}
        />
        <FormInput
          id="confirmEmail"
          placeholder={personalDetailsProps.fieldPlaceholders.confirmEmail}
          error={errors.confirmEmail}
          {...register("confirmEmail")}
        />
      </div>

      <div className="mb-6">
        <label className="items-center">
          <input
            type="checkbox"
            {...register("marketingConsent")}
            className="mr-2"
          />
          {renderMarketingText()}
        </label>
      </div>
    </form>
  );
};

export default InitialPersonalDetailsForm;
