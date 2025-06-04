import { ColorPill } from "@react-component-library/ui";

import { getAssetPath } from "@/lib/get-asset-path";

export const EeroImage = ({ packageName }: { packageName: string }) => {
  const packageColors = {
    "C-900": "bg-core-yellow",
    "C-500": "bg-secondary-blue",
    "C-150": "bg-secondary-pink",
  } as const;

  const backgroundColor =
    packageColors[packageName as keyof typeof packageColors] ||
    "bg-secondary-blue";

  return (
    <div
      className={`text-center w-full sm:w-1/2 md:w-full rounded-lg px-4 py-6 md:p-6 h-fit ${backgroundColor}`}
    >
      <ColorPill
        size="small"
        backgroundColor="secondary-teal"
        colorPillText="eero Pro 6E router included"
        className="mx-auto px-4 py-2"
      />
      <img
        src={getAssetPath("/images/eero.svg")}
        alt="eero router"
        className="w-full sm:w-[95%] h-auto mx-auto"
      />
    </div>
  );
};
