import { Button } from "@components/atoms/Button";
import { ChevronRightWithCircle } from "@icons/ChevronRightWithCircle";
import { Dispatch, SetStateAction } from "react";

export interface PostcodeCheckerProps {
  titleText?: string;
  placeholderText?: string;
  inputBoxButtonText?: string;
  postcode: string;
  setPostcode: Dispatch<SetStateAction<string>>;
  onClickFunction?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const PostcodeChecker = (props: PostcodeCheckerProps) => {
  const {
    titleText,
    placeholderText,
    inputBoxButtonText,
    postcode,
    setPostcode,
    onClickFunction,
  } = props;

  return (
    <>
      {titleText && (
        <h2 className="ds:w-full ds:font-semibold ds:mb-5 ds:md:text-5xl ds:text-[26px] ds:leading-[1.5] ds:md:leading-[1.2]">
          {titleText}
        </h2>
      )}
      <div
        className="ds:flex ds:rounded-lg ds:bg-core-white ds:border-2 ds:border-outline-ui-grey-300 ds:p-4 ds:sm:p-2 ds:md:pl-5
        ds:items-center ds:justify-between ds:h-[78px] ds:w-full ds:lg:w-[466px] ds:isolate ds:[&:focus-within]:border-core-black"
      >
        <form className="flex flex-row w-full" onSubmit={onClickFunction}>
          <input
            aria-label="enter your postcode"
            placeholder={placeholderText}
            name="postcode-checker"
            className="ds:text-sm ds:sm:text-md ds:flex-1 ds:px-1 ds:mr-1 ds:min-w-[160px] ds:md:min-w-[205px] ds:focus:outline-none ds:[&::-webkit-search-cancel-button]:hidden"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            autoComplete="off"
            type="search"
          />
          <div className="ds:shrink">
            <button
              type="submit"
              data-testid="mobile-submit"
              aria-label="Check postcode"
              className="ds:p-0 ds:bg-transparent ds:border-0 ds:block ds:sm:hidden"
            >
              <ChevronRightWithCircle />
            </button>

            <div data-testid="desktop-submit" className="ds:hidden ds:sm:flex">
              <Button type="submit" variant="solid" size="medium">
                {inputBoxButtonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
