import { Tick } from "@icons/Tick";

export interface TextWithTickProps {
  textInput: string;
  ariaLabel?: string;
}

export const TextWithTick = ({ textInput, ariaLabel }: TextWithTickProps) => {
  return (
    <div
      className="flex items-center gap-2.5 bg-core-white p-3 rounded-full"
      aria-label={`Text with tick with the statement ${textInput}`}
    >
      <span>
        <Tick />
      </span>

      <p
        className="text-xl"
        aria-label={
          ariaLabel ? ariaLabel : `Text with the statement ${textInput}`
        }
      >
        {textInput}
      </p>
    </div>
  );
};

TextWithTick.displayName = "TextWithTick";
