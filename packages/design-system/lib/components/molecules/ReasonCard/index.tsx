export interface ReasonCardProps {
  iconUrl: string;
  heading: string;
  subHeading: string;
}

export const ReasonCard = ({
  iconUrl,
  heading,
  subHeading,
}: ReasonCardProps) => {
  return (
    <div className="ds:p-6 ds:pb-8 ds:md:p-8 ds:rounded-lg ds:bg-core-yellow ds:w-full ds:min-h-full">
      {iconUrl && <img src={iconUrl} className="ds:max-w-24 ds:max-h-24" />}
      <div className="ds:flex ds:flex-col ds:gap-2.5 ds:mt-5">
        <h2 className="ds:text-md ds:md:text-3xl ds:font-bold">{heading}</h2>
        <p className="ds:md:text-md ds:text-[16px] ds:font-normal ds:text-ui-grey-500">
          {subHeading}
        </p>
      </div>
    </div>
  );
};
