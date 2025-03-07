import { Button } from "@components/atoms/Button";
import { ChevronRightWithCircle } from "@icons/ChevronRightWithCircle";
import { Dispatch, SetStateAction } from "react";

export interface PostcodeCheckerProps {
  titleText?: string;
  placeholderText?: string;
  inputBoxButtonText?: string;
  isChevron?: boolean;
  postcode: string;
  setPostcode: Dispatch<SetStateAction<string>>;
  onClickFunction?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const PostcodeChecker = (props: PostcodeCheckerProps) => {
  const {
    titleText,
    placeholderText,
    inputBoxButtonText,
    isChevron,
    postcode,
    setPostcode,
    onClickFunction,
  } = props;

  return (
    <>
      {titleText && (
        <h2 className="ds:w-full ds:font-bold ds:mb-5 ds:md:text-5xl ds:text-[26px]">
          {titleText}
        </h2>
      )}
      <div
        className={`ds:flex ds:rounded-lg ds:bg-core-white ds:border-2 ds:border-outline-ui-grey-300
        ${isChevron ? "ds:p-4" : "ds:p-2 ds:pl-4"} ds:md:p-2 ds:md:pl-5
        ds:items-center ds:justify-between ds:h-[74px] ds:w-full ds:lg:w-[466px] ds:transition-colors ds:duration-400  ds:z-1`}
      >
        <form className="flex flex-row w-full" onSubmit={onClickFunction}>
          <input
            aria-label="enter your postcode or address"
            placeholder={placeholderText}
            name="postcode-checker"
            className="ds:text-sm ds:sm:text-md ds:flex-1 ds:px-1 ds:mr-1 ds:min-w-[160px] ds:md:min-w-[205px]"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
          <div className="ds:shrink">
            {isChevron ? (
              <>
                <div className="ds:block ds:md:hidden">
                  <ChevronRightWithCircle />
                </div>
                <div className="ds:hidden ds:md:flex ds:w-full">
                  <Button
                    type="submit"
                    variant="solid"
                    className="ds:h-[60px] ds:!w-[120px] ds:md:!w-[200px] ds:md:!px-4 ds:lg:!px-8"
                    fullWidth
                  >
                    {inputBoxButtonText}
                  </Button>
                </div>
              </>
            ) : (
              <Button
                type="submit"
                variant="solid"
                className="ds:h-[60px] ds:sm:text-md ds:!w-[120px] ds:lg:!w-[200px] ds:!py-4 ds:!px-0 ds:md:!px-4 ds:lg:!px-8"
              >
                {inputBoxButtonText}
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
