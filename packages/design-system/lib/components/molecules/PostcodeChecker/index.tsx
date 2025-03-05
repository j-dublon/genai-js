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
        <h2 className="w-full font-bold mb-5 md:text-5xl text-[26px]">
          {titleText}
        </h2>
      )}
      <div className="flex rounded-lg bg-core-white border-2 border-outline-ui-grey-300 p-2 pl-1 sm:pl-3 items-center justify-between h-[74px] transition-colors duration-400 w-full z-1">
        <form className="flex flex-row w-full" onSubmit={onClickFunction}>
          <input
            aria-label="enter your postcode or address"
            placeholder={placeholderText}
            name="postcode-checker"
            className="sm:text-md flex-1 text-base px-1 mr-1 min-w-[160px] md:min-w-[205px]"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
          <div className="shrink">
            {isChevron ? (
              <>
                <div className="block sm:hidden">
                  <ChevronRightWithCircle />
                </div>
                <div className="hidden sm:flex w-full">
                  <Button
                    type="submit"
                    variant="solid"
                    className="h-[60px] md:!px-4 lg:!px-8"
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
                className="h-[60px] sm:text-md md:!px-4 lg:!px-8"
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
