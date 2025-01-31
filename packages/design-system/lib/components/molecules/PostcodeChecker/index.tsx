import cx from "classnames";
import { JSX } from "react";
import { InputBoxButton } from "@components/atoms/InputBoxButton";

export interface PostcodeCheckerProps {
  titleText?: string;
  topText?: string;
  placeholderText?: string;
  inputBoxButtonText?: string;
}

export function PostcodeChecker(props: PostcodeCheckerProps): JSX.Element {
  const { titleText, topText, placeholderText, inputBoxButtonText } = props;

  return (
    <div className="order-none z-10 p-10">
      <h2 className="md:w-[59%] font-bold md:text-5xl text-[26px]">
        {titleText}
      </h2>
      <div className="mt-5 relative md:h-28">
        <input
          aria-labelledby="input"
          placeholder={placeholderText}
          name="postcode-checker"
          className={cx(
            "bg-white border-2 border-[#DBD8D0] text-core-black leading-[39px] h-full outline-hidden transition-colors duration-400 w-full z-1",
            {
              "md:rounded-[22px] rounded-xs": true,
              "md:text-[26px] text-base": true,
              "p-[19px_22px]": !topText || window.innerWidth < 768,
              "md:p-[40px_22px_19px]": topText && window.innerWidth >= 768,
            },
          )}
        />
        {topText && (
          <label className="hidden md:block font-semibold left-[22px] pointer-events-none absolute text-[16px] leading-[26px] top-[18px]">
            {topText}
          </label>
        )}
        <span className="absolute top-[50%] translate-y-[-50%] right-6">
          <InputBoxButton inputBoxButtonText={inputBoxButtonText} />
        </span>
      </div>
    </div>
  );
}

PostcodeChecker.displayName = "PostcodeChecker";
