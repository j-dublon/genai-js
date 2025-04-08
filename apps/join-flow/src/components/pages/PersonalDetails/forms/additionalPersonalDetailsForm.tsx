import FormInput from "@/components/atoms/FormInput";

import type { AdditionalPersonalDetailsFormProps } from "./formValues";

const AdditionalPersonalDetailsForm = ({
  register,
  errors,
  personalDetailsProps,
}: AdditionalPersonalDetailsFormProps) => {
  return (
    <form id="additionalDetailsForm">
      <p className="text-md font-bold mb-6">
        {personalDetailsProps.additionalSection.dobTitle}
      </p>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <FormInput
            id="dobDay"
            placeholder={
              personalDetailsProps.additionalSection.dobDayPlaceholder
            }
            error={errors.dobDay}
            {...register("dobDay")}
          />
        </div>
        <div>
          <FormInput
            id="dobMonth"
            placeholder={
              personalDetailsProps.additionalSection.dobMonthPlaceholder
            }
            error={errors.dobMonth}
            {...register("dobMonth")}
          />
        </div>
        <div>
          <FormInput
            id="dobYear"
            placeholder={
              personalDetailsProps.additionalSection.dobYearPlaceholder
            }
            error={errors.dobYear}
            {...register("dobYear")}
          />
        </div>
      </div>

      <p className="text-md font-bold mb-6">
        {personalDetailsProps.additionalSection.addressTitle}
      </p>
      <div className="mb-6">
        <div className="flex flex-col gap-2">
          {personalDetailsProps.additionalSection.residencyOptions.map(
            (option) => (
              <label key={option.value} className="inline-flex items-center">
                <input
                  type="radio"
                  value={option.value}
                  {...register("residencyDuration")}
                  className="mr-2"
                />
                {option.label}
              </label>
            ),
          )}
        </div>
        {errors.residencyDuration && (
          <p className="text-core-red text-sm mt-1">
            {errors.residencyDuration.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default AdditionalPersonalDetailsForm;
