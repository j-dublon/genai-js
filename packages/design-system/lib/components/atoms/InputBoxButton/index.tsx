export interface InputBoxButtonProps {
  inputBoxButtonText?: string;
}

export const InputBoxButton = ({ inputBoxButtonText }: InputBoxButtonProps) => {
  return (
    <button
      className="bg-core-black text-core-white font-bold text-xl p-4 md:rounded-lg rounded-xl relative"
      type="submit"
    >
      <span>{inputBoxButtonText}</span>
    </button>
  );
};
