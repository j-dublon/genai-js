import { InputBoxButton } from "@components/atoms/InputBoxButton";
import { ChevronRightWithCircle } from "@icons/ChevronRightWithCircle";
import cx from "classnames";
import { JSX } from "react";

export interface PostcodeCheckerProps {
  titleText?: string;
  labelText?: string;
  placeholderText?: string;
  inputBoxButtonText?: string;
  isChevron?: boolean;
}

export function PostcodeChecker(props: PostcodeCheckerProps): JSX.Element {
  const {
    titleText,
    labelText,
    placeholderText,
    inputBoxButtonText,
    isChevron,
  } = props;

  return (
    <div className="z-10 order-none p-8">
      <h2 className="w-full md:w-[59%] font-bold md:text-5xl text-[26px]">
        {titleText}
      </h2>
      <div className="relative mt-5">
        <input
          id="postcode-input"
          placeholder={placeholderText}
          name="postcode-checker"
          aria-labelledby="postcode-input"
          className={cx(
            "bg-core-white border-2 border-outline-ui-grey-300 leading-[39px] h-full outline-hidden transition-colors duration-400 w-full z-[1] md:rounded-[22px] rounded-xs md:text-[20px] text-base p-[25px]",
            { "md:p-[40px_22px_19px]": !!labelText },
          )}
        />
        {labelText && (
          <label
            htmlFor="postcode-input"
            className="hidden md:block font-semibold left-[22px] pointer-events-none absolute text-[16px] leading-[26px] label-[18px]"
          >
            {labelText}
          </label>
        )}
        <div className="absolute top-[50%] translate-y-[-50%] right-2">
          {isChevron ? (
            <>
              <div className="block md:hidden">
                <ChevronRightWithCircle />
              </div>
              <div className="hidden md:block">
                <InputBoxButton inputBoxButtonText={inputBoxButtonText} />
              </div>
            </>
          ) : (
            <InputBoxButton inputBoxButtonText={inputBoxButtonText} />
          )}
        </div>
      </div>
    </div>
  );
}
