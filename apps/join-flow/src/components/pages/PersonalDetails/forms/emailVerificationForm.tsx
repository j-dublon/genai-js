import { useEffect } from "react";

import FormInput from "@/components/atoms/FormInput";

import { EmailVerificationFormProps } from "./formValues";

//TO DO: you would need to skip this page when the user is actually verified.

const EmailVerificationForm = ({
  register,
  errors,
  personalDetailsProps,
  isVerified = false,
  onVerificationSuccess,
  onEmailChanged,
  currentEmail,
  previousEmail,
}: EmailVerificationFormProps) => {
  useEffect(() => {
    if (previousEmail && previousEmail !== currentEmail && onEmailChanged) {
      onEmailChanged();
    }
  }, [currentEmail, previousEmail, onEmailChanged]);

  // Skips this page if you are already verified
  useEffect(() => {
    if (isVerified && onVerificationSuccess) {
      onVerificationSuccess();
    }
  }, [isVerified, onVerificationSuccess]);

  return (
    <div>
      <h2 className="text-md font-bold mb-6">
        {personalDetailsProps.verificationSection.title}
      </h2>
      <p className="text-md mb-4">
        {personalDetailsProps.verificationSection.description}
      </p>
      <div className="mb-6">
        <FormInput
          id="verificationCode"
          placeholder={personalDetailsProps.verificationSection.codePlaceholder}
          error={errors.verificationCode}
          {...register("verificationCode")}
        />
      </div>
    </div>
  );
};

export default EmailVerificationForm;
