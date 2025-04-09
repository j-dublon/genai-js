import { Tick } from "@icons/Tick.tsx";
import cx from "classnames";

interface ProductCardProps {
  header: string;
  className?: string;
  accentColor?: string;
  dataVideoIndex?: number;
  active?: boolean;
}

export const ProductCard = (props: ProductCardProps) => {
  const { header, dataVideoIndex, active, accentColor } = props;
  const color = "ds:bg-core-" + accentColor;

  return (
    <div
      className={
        "ds:outline ds:max-w-[20rem] ds:rounded-lg ds:bg-core-white ds:gap-4"
      }
      style={{ outlineColor: active ? "#DBD8D0" : undefined }}
      data-video-index={dataVideoIndex}
    >
      <div className={cx("ds:px-4 ds:pt-6 ds:pb-2 ds:rounded-t-lg", color)}>
        <h3 className="ds:text-[48px] ds:font-semibold">{header}</h3>
      </div>
      <div className="ds:px-4 ds:py-6 ds:gap-8">
        <div className="ds:gap-4 ds:flex ds:flex-col">
          <div className="ds:flex ds:flex-col ds:gap-4 ds:rounded-sm">
            <div className="ds:wrap ds:flex ds:items-center ds:gap-2">
              <span
                className={cx(
                  "ds:text-[16px] ds:px-2 ds:flex ds:w-fit ds:items-center ds:justify-center ds:whitespace-nowrap ds:rounded-xl ds:border-2 ds:border-core-black ds:py-0.5 ds:font-semibold",
                )}
              >
                900Mbps
              </span>
              <p className="ds:text-[16px] ds:font-semibold">
                Avg download speed
              </p>
            </div>
          </div>
          <div className="ds:flex ds:flex-col ds:gap-1">
            <div className="ds:flex ds:items-center ds:gap-2.5">
              <Tick />
              <p className="ds:text-blackbird">24-month fixed-price contract</p>
            </div>
            <div className="ds:flex ds:items-center ds:gap-2.5">
              <Tick />
              <p className="ds:text-blackbird">
                Super smart eero Pro 6E router
              </p>
            </div>
            <div className="ds:flex ds:items-center ds:gap-2.5">
              <Tick />
              <p className="ds:text-blackbird">No phone line needed</p>
            </div>
          </div>
          <a className="ds:text-ui-link" href="www.test.com">
            Learn more{" "}
          </a>
        </div>
        <aside
          className={cx(
            `ds:px-2 ds:py-2 ds:mt-6 ds:flex ds:flex-row ds:items-center ds:rounded-md ${color} ds:transition-all ds:duration-[350ms] ds:md:opacity-0 ds:md:group-hover:opacity-100`,
          )}
        >
          <span className="ds:rounded-[80px] ds:px-3 ds:text-[24px] ds:font-semibold">
            £40 per month
          </span>
        </aside>
      </div>
    </div>
  );
};
