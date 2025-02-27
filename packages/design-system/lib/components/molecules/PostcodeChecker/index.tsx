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
      <div className="flex rounded-lg bg-core-white border-2 border-outline-ui-grey-300 p-2 pl-5 pr-4 md:pr-2  items-center justify-between h-[74px] transition-colors duration-400 w-full z-1">
        <form
          className="flex flex-2 flex-row w-full"
          onSubmit={onClickFunction}
        >
          <input
            aria-labelledby="input"
            placeholder={placeholderText}
            name="postcode-checker"
            className="md:text-md flex-3 text-base mr-1 min-w-[196px]"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
          <div className="flex flex-2 justify-end">
            {isChevron ? (
              <>
                <div className="block md:hidden">
                  <ChevronRightWithCircle />
                </div>
                <div className="hidden md:flex w-full">
                  <Button
                    type="submit"
                    variant="solid"
                    className="h-[60px]"
                    fullWidth
                  >
                    {inputBoxButtonText}
                  </Button>
                </div>
              </>
            ) : (
              <Button type="submit" variant="solid" className="h-[60px]">
                {inputBoxButtonText}
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
