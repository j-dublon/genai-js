export interface InputBoxButtonProps {
  inputBoxButtonText?: string;
}

export const InputBoxButton = ({ inputBoxButtonText }: InputBoxButtonProps) => {
  return (
    <button
      className="bg-core-black text-core-white font-bold text-md p-2 rounded-lg h-[60px] relative w-full"
      type="submit"
    >
      <span className="max-h-7">{inputBoxButtonText}</span>
    </button>
  );
};
