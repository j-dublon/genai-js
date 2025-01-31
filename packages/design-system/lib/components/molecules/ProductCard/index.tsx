import cx from "classnames";
import { Tick } from "@icons/Tick.tsx";

interface ProductCardProps {
  header: string;
  className?: string;
  accentColour?: string;
  dataVideoIndex?: number;
  active?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { header, dataVideoIndex, active, accentColour } = props;
  const colour = "bg-core-" + accentColour;

  return (
    <div
      className={"outline max-w-[20rem] rounded-lg bg-core-white gap-4"}
      style={{ outlineColor: active ? "#DBD8D0" : undefined }}
      data-video-index={dataVideoIndex}
    >
      <div className={cx("px-4 pt-6 pb-2 rounded-t-lg", colour)}>
        <h3 className="text-[48px] font-semibold">{header}</h3>
      </div>
      <div className="px-4 py-6 gap-8">
        <div className="gap-4 flex flex-col">
          <div className="flex flex-col gap-4 rounded-sm">
            <div className="wrap flex items-center gap-2">
              <span
                className={cx(
                  "text-[16px] px-2 flex w-fit items-center justify-center whitespace-nowrap rounded-xl border-2 border-core-black py-0.5 font-semibold",
                )}
              >
                900Mbps
              </span>
              <p className="text-[16px] font-semibold">Avg download speed</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5">
              <Tick />
              <p className="text-blackbird">24-month fixed-price contract</p>
            </div>
            <div className="flex items-center gap-2.5">
              <Tick />
              <p className="text-blackbird">Super smart eero Pro 6E router</p>
            </div>
            <div className="flex items-center gap-2.5">
              <Tick />
              <p className="text-blackbird">No phone line needed</p>
            </div>
          </div>
          <a className="text-link-ui" href="www.test.com">
            Learn more{" "}
          </a>
        </div>
        <aside
          className={cx(
            `px-2 py-2 mt-6 flex flex-row items-center rounded-md ${colour} transition-all duration-[350ms] md:opacity-0 md:group-hover:opacity-100`,
          )}
        >
          <span className="rounded-[80px] px-3 text-[24px] font-semibold">
            £40 per month
          </span>
        </aside>
      </div>
    </div>
  );
};

ProductCard.displayName = "ProductCard";
