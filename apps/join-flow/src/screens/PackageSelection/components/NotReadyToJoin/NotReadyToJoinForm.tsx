import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DatePicker } from "@react-component-library/ui";
import { Controller, useForm } from "react-hook-form";

import FormInput from "@/components/FormInput";
import { InsertLink } from "@/components/InsertLink";
import { notReadyToJoinSchema } from "@/validation/join-flow-schema";

import { notReadyToJoinProps } from "./NotReadyToJoinProps";

interface NotReadyFormData {
  fullName: string;
  email: string;
  selectedDate: string;
  phoneNumber?: string;
}

export const NotReadyToJoinForm = () => {
  const { buttonText, confirmationMessage, privacyNoticeText } =
    notReadyToJoinProps;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<NotReadyFormData>({
    resolver: zodResolver(notReadyToJoinSchema),
    defaultValues: {
      fullName: "",
      email: "",
      selectedDate: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (
    data: NotReadyFormData,
    event?: React.BaseSyntheticEvent,
  ) => {
    event?.stopPropagation();

    // TODO: Add submit handler
    console.log(data);
  };

  const getDates = (): Date[] => {
    const dates = [];
    const today = new Date();

    // Generate dates from today to one year from now
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      dates.push(date);
    }

    return dates;
  };

  return (
    <form
      id="notReadyToJoinForm"
      className="flex flex-col gap-6 md:w-1/2 shrink-0 grow-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-5">
        <FormInput
          {...register("fullName")}
          id="fullName"
          placeholder="Full name"
          error={errors.fullName}
          className={`bg-core-white placeholder:text-ui-grey-500 ${isSubmitSuccessful ? "cursor-not-allowed" : ""}`}
          disabled={isSubmitSuccessful}
        />
        <FormInput
          {...register("email")}
          id="email"
          placeholder="Email address"
          error={errors.email}
          className={`bg-core-white placeholder:text-ui-grey-500 ${isSubmitSuccessful ? "cursor-not-allowed" : ""}`}
          disabled={isSubmitSuccessful}
        />
        <FormInput
          {...register("phoneNumber")}
          id="phoneNumber"
          placeholder="Phone number (optional)"
          error={errors.phoneNumber}
          className={`bg-core-white placeholder:text-ui-grey-500 ${isSubmitSuccessful ? "cursor-not-allowed" : ""}`}
          disabled={isSubmitSuccessful}
        />
        <div className="flex flex-col w-full">
          <Controller
            name="selectedDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                availableDates={getDates()}
                selectedDate={field.value}
                onDateSelect={(date) => field.onChange(date)}
                placeholderText="Estimated end of contract date"
                buttonClassName="bg-core-white border-2 border-ui-grey-300"
                outerClassName="my-0"
                disabled={isSubmitSuccessful}
                overlay={true}
              />
            )}
          />
          {errors.selectedDate && (
            <p className="text-ui-error text-sm mt-1">
              {errors.selectedDate.message}
            </p>
          )}
        </div>
      </div>
      {isSubmitSuccessful ? (
        <p className="text-sm text-core-black">{confirmationMessage}</p>
      ) : (
        <>
          <p className="text-xs text-core-black leading-[1.6] opacity-80">
            <InsertLink
              text={privacyNoticeText}
              searchText="Privacy Notice"
              href="/legal/privacy"
            />
          </p>
          <Button
            type="submit"
            tint="black"
            size="medium"
            variant="solid"
            disabled={isSubmitSuccessful}
            className="w-full md:w-auto"
          >
            {buttonText}
          </Button>
        </>
      )}
    </form>
  );
};
