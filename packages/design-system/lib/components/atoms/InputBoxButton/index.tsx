import { Chevron } from "@icons/Chevron";

export interface InputBoxButtonProps {
  inputBoxButtonText?: string;
}

export const InputBoxButton = (props: InputBoxButtonProps) => {
  const { inputBoxButtonText } = props;

  return (
    <button
      className="bg-core-black text-core-white font-bold text-xl md:p-6 p-4 md:rounded-lg rounded-xl relative"
      type="submit"
    >
      {inputBoxButtonText ? (
        <span className="sr-only md:not-sr-only">{inputBoxButtonText}</span>
      ) : (
        <span className="absolute inset-0 flex items-center justify-center">
          <Chevron />
        </span>
      )}
      <span className="md:hidden absolute inset-0 flex items-center justify-center">
        <Chevron />
      </span>
    </button>
  );
};

InputBoxButton.displayName = "InputBoxButton";
