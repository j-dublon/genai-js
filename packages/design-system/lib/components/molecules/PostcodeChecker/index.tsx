import { InputBoxButton } from "@components/atoms/InputBoxButton";
import { ChevronRightWithCircle } from "@icons/ChevronRightWithCircle";
import cx from "classnames";

export interface PostcodeCheckerProps {
  titleText?: string;
  labelText?: string;
  placeholderText?: string;
  inputBoxButtonText?: string;
  isChevron?: boolean;
}

export const PostcodeChecker = (props: PostcodeCheckerProps) => {
  const {
    titleText,
    labelText,
    placeholderText,
    inputBoxButtonText,
    isChevron,
  } = props;

  return (
    <>
      {titleText && (
        <h2 className="w-full md:w-[59%] font-bold mb-5 md:text-5xl text-[26px]">
          {titleText}
        </h2>
      )}
      <div
        className={cx(
          "rounded-lg bg-core-white border-2 border-outline-ui-grey-300 items-center justify-center p-1.5 pl-5 h-[74px] transition-colors duration-400  md:max-w-[524px] w-full z-1",
        )}
      >
        <form className="flex flex-2 flex-row items-center justify-between">
          <input
            aria-labelledby="input"
            placeholder={placeholderText}
            name="postcode-checker"
            className="md:text-md flex-3 text-base mr-1 min-w-[196px]"
          />
          {labelText && (
            <label className="hidden md:block font-semibold left-[22px] pointer-events-none text-[16px] leading-[26px] top-[18px]">
              {labelText}
            </label>
          )}
          <div className="flex-2">
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
        </form>
      </div>
    </>
  );
};
