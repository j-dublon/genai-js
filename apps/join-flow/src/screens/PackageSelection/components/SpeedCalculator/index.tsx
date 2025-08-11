import {
  Button,
  Checkbox,
  ColorPill,
  InputSlider,
  Radio,
} from "@react-component-library/ui";
import { Arrow } from "@react-component-library/ui/icons";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  useForm,
} from "react-hook-form";

import { useScrollToElement } from "@/hooks/useScrollToElement";
import { useSpeedCalculator } from "@/hooks/useSpeedCalculator";
import { StoreSelectedPackage } from "@/store/useJoinFlowStore";

import { questionProps, summaryText } from "./SpeedCalculatorProps";
export interface SpeedCalculatorFormData {
  peopleCount: number;
  internetUses: string[];
  smartSpeakers: string;
}
interface FormQuestionProps<T extends FieldValues> {
  title: string;
  subtitle?: string;
  name: Path<T>;
  control: Control<T>;
  rules?: object;
  children:
    | React.ReactNode
    | ((field: {
        onChange: (value: string | string[] | number) => void;
        value: string | string[] | number;
      }) => React.ReactElement);
}

const FormQuestion = <T extends FieldValues>({
  title,
  subtitle,
  name,
  control,
  rules,
  children,
}: FormQuestionProps<T>) => {
  const questionId = `question-${name}`;

  return (
    <div className="border border-ui-grey-300 rounded-lg p-5 md:px-10 md:py-6 flex flex-col gap-4">
      <h3
        id={questionId}
        className="text-core-black text-sm md:text-md font-medium max-w-[480px]"
      >
        {title}
      </h3>
      {subtitle && (
        <p className="max-w-[456px] text-ui-grey-500 text-xs md:text-sm leading-[1.6] font-normal">
          {subtitle}
        </p>
      )}
      <div className="flex flex-col gap-2" aria-labelledby={questionId}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState: { error } }) => (
            <>
              {typeof children === "function" ? children(field) : children}
              {error && (
                <p className="text-ui-error text-xs mt-2">{error.message}</p>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
};

export const SpeedCalculator = ({
  title,
  subtitle,
  broadbandPackages,
  onShowPackageDetails,
}: {
  title: string;
  subtitle: string;
  broadbandPackages: StoreSelectedPackage[];
  onShowPackageDetails: (selectedPackage: StoreSelectedPackage) => void;
}) => {
  const { recommendedPackage, calculateRecommendedPackage } =
    useSpeedCalculator(broadbandPackages);
  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitSuccessful },
  } = useForm<SpeedCalculatorFormData>({
    defaultValues: {
      peopleCount: 0,
      internetUses: [],
      smartSpeakers: "",
    },
  });

  const scrollToResults = useScrollToElement("#results");
  const scrollToForm = useScrollToElement("#speed-calculator-form");
  const scrollToTop = useScrollToElement("#fullscreen-modal-title");

  const handleReset = () => {
    reset({
      peopleCount: 0,
      internetUses: [],
      smartSpeakers: "",
    });
    calculateRecommendedPackage(null);
    scrollToForm();
  };

  const onSubmit = (data: SpeedCalculatorFormData) => {
    calculateRecommendedPackage(data);

    // Use setTimeout to ensure results have rendered before scrolling
    setTimeout(() => {
      scrollToResults();
    }, 0);
  };

  return (
    <div className="md:px-20 lg:px-29 md:pt-16 md:pb-25 flex justify-center">
      <div className="rounded-lg w-full py-8 px-5 md:p-0 md:max-w-[1018px]">
        <div className="relative rounded-lg md:rounded-b-none bg-secondary-pink p-6 flex flex-col gap-3 overflow-hidden">
          <div
            className={`absolute bg-[url(/vc-ap-join-flow/assets/images/whoosh-mobile.svg)] md:bg-[url(/vc-ap-join-flow/assets/images/whoosh.svg)] h-full w-full left-0 top-0 rounded-lg md:rounded-b-none bg-contain md:bg-cover bg-right md:bg-center bg-no-repeat z-1`}
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent, black)",
              maskImage: "linear-gradient(to right, transparent, black)",
            }}
          />
          <ColorPill
            backgroundColor="tertiary-purple"
            colorPillText="Cuckoo help"
            size="extraSmall"
            whiteText
          />
          <h2 className="text-core-black text-xl font-semibold leading-[1.5] md:text-3xl md:leading-[1.4] max-w-[260px] md:max-w-[378px] z-2">
            {title}
          </h2>
          <p className="text-xs font-normal leading-[1.6] md:text-sm sm:max-w-[450px] z-2">
            {subtitle}
          </p>
        </div>
        <div className="bg-core-white md:bg-ui-grey-100 flex flex-col gap-8 md:py-8 md:px-16 lg:py-16 lg:px-32 rounded-b-lg">
          <div className="md:bg-core-white pt-5 md:p-6 rounded-[20px]">
            <form
              id="speed-calculator-form"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <ColorPill
                backgroundColor="pink"
                colorPillText="Speed Calculator"
                size="small"
              />

              <FormQuestion
                title={questionProps.question1.title}
                subtitle={questionProps.question1.subtitle}
                name="peopleCount"
                control={control}
              >
                {({ onChange, value }) => (
                  <InputSlider
                    min={0}
                    max={10}
                    value={value as number}
                    onChange={onChange}
                    disabled={isSubmitSuccessful}
                    name="peopleCount"
                  />
                )}
              </FormQuestion>

              <FormQuestion
                title={questionProps.question2.title}
                name="internetUses"
                control={control}
                rules={{
                  required: "Please select at least one option",
                  validate: (value: string[]) =>
                    value.length > 0 || "Please select at least one option",
                }}
              >
                {({ onChange, value }) => (
                  <div className="flex flex-col gap-3">
                    {[
                      "Streaming",
                      "Gaming",
                      "Working from home",
                      "Video calls",
                      "Social media",
                    ].map((option) => (
                      <Checkbox
                        key={option}
                        label={option}
                        value={option}
                        checked={(value as string[])?.includes(option)}
                        onChange={(checked) => {
                          const currentValues = (value as string[]) || [];
                          if (checked) {
                            onChange([...currentValues, option]);
                          } else {
                            onChange(currentValues.filter((v) => v !== option));
                          }
                        }}
                        disabled={isSubmitSuccessful}
                      />
                    ))}
                  </div>
                )}
              </FormQuestion>

              <FormQuestion
                title={questionProps.question3.title}
                name="smartSpeakers"
                control={control}
                rules={{
                  required: "Please select an option",
                }}
              >
                {({ onChange, value }) => (
                  <div className="flex flex-col gap-3">
                    {["Yes", "No"].map((option) => (
                      <Radio
                        key={option}
                        label={option}
                        value={option}
                        checked={value === option}
                        onChange={onChange}
                        disabled={isSubmitSuccessful}
                      />
                    ))}
                  </div>
                )}
              </FormQuestion>

              {recommendedPackage && (
                <div
                  className="rounded-lg p-5 md:px-10 md:py-6 flex flex-col gap-4 md:gap-5 bg-tertiary-blue-light"
                  id="results"
                >
                  <p className="text-core-black text-sm md:text-md font-medium max-w-[480px]">
                    {summaryText}
                  </p>
                  <Button
                    variant="solid"
                    tint="yellow"
                    size="large"
                    onClick={() => {
                      onShowPackageDetails(recommendedPackage);
                      scrollToTop();
                    }}
                    className="w-full md:w-auto"
                  >
                    <p className="flex items-center gap-4">
                      <span>{`${recommendedPackage.speeds.download}Mbps Plan`}</span>
                      <Arrow />
                    </p>
                  </Button>
                </div>
              )}

              <div className="flex gap-4 flex-col md:flex-row md:justify-end pt-3">
                <Button
                  variant="outline"
                  tint="white"
                  size="large"
                  className="w-full md:w-auto md:py-3 md:px-5 text-sm"
                  onClick={handleReset}
                  type="button"
                >
                  Reset
                </Button>
                {!isSubmitSuccessful && (
                  <Button
                    variant="solid"
                    tint="yellow"
                    size="large"
                    className="w-full md:w-auto md:py-3 md:px-5 text-sm"
                    type="submit"
                  >
                    Calculate
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
