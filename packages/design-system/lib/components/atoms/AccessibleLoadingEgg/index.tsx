import { LoadingEgg, LoadingEggProps } from "@icons/LoadingEgg";

export interface AccessibleLoadingEggProps extends LoadingEggProps {
  wrapperClassName?: string;
  className?: string;
  height?: number;
  width?: number;
  color?: string;
}

export const AccessibleLoadingEgg = ({
  wrapperClassName,
  className,
  height,
  width,
  color,
}: AccessibleLoadingEggProps) => (
  <div aria-live="polite" className={wrapperClassName}>
    <LoadingEgg
      className={className}
      height={height}
      width={width}
      color={color}
    />
    <span className="sr-only">Loading...</span>
  </div>
);
