import { Alert } from "@react-component-library/ui/icons";

interface RestartBasketProps {
  subtitle: string;
  restartText: string;
  warningText: string;
  onRestart: () => void;
}

export const RestartBasket = ({
  subtitle,
  restartText,
  warningText,
  onRestart,
}: RestartBasketProps) => {
  return (
    <div className="bg-tertiary-peach-light p-5 md:p-6 rounded-lg md:rounded-md leading-[1.6] text-xs md:text-sm flex gap-2">
      <Alert className="md:hidden mt-[2px] flex-shrink-0" />
      <div className="flex flex-col gap-2 md:gap-4">
        <p className="font-semibold">{subtitle} </p>
        <p>
          <button
            onClick={() => onRestart()}
            className="text-ui-link underline font-medium cursor-pointer bg-transparent border-none inline"
          >
            {restartText}
          </button>
          {`. ${warningText}`}
        </p>
      </div>
    </div>
  );
};
