import cx from "classnames";
import { AnimatePresence, motion, Variants } from "framer-motion";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface DetailsContextProps {
  open: boolean;
  setDetailsOpen: (value: boolean) => void;
  setOpen: (value: boolean) => void;
}

const DetailsContext = createContext<DetailsContextProps>({
  open: false,
  setOpen: () => {},
  setDetailsOpen: () => {},
});

const useDetailsContext = () => {
  return useContext(DetailsContext);
};

type Variant = "sm" | "lg";

interface DetailsProps {
  children: ReactNode;
  className?: string;
  open?: boolean;
  variant?: Variant;
}

/**
 * A <details> component with an animated collapse and expand. This will
 * measure the height of your content and therefore adjust the speed to
 * complete the animation accordingly.
 *
 * @example
 * <Details.Root>
 *   <Details.Summary>
 *     <Details.Label>The content summary</Details.Label>
 *     <Details.IndicatorArrow />
 *   </Details.Summary>
 *
 *   <Details.Content>
 *     Lorem ipsum
 *   </Details.Content>
 * </Details.Root>
 */
export const Root = (props: DetailsProps) => {
  const { children, className, variant = "sm" } = props;

  const detailsRef = useRef<HTMLDetailsElement | null>(null);
  const [open, setOpen] = useState(!!props.open);

  useEffect(() => {
    if (props.open !== undefined) {
      setOpen(!!props.open);
      if (detailsRef.current && detailsRef.current.open !== props.open) {
        detailsRef.current.open = props.open;
      }
    }
  }, [props.open]);

  const setDetailsOpen = (value: boolean) => {
    if (detailsRef.current) {
      detailsRef.current.open = value;
    }
  };

  return (
    <DetailsContext.Provider
      value={{
        open,
        setOpen,
        setDetailsOpen,
      }}
    >
      <details
        className={cx("group/Details relative z-base", className)}
        data-open={open}
        data-variant={variant}
        ref={detailsRef}
      >
        {children}
      </details>
    </DetailsContext.Provider>
  );
};

interface SummaryProps {
  children: ReactNode;
  className?: string;
}

/**
 * Defines the toggle area for opening/closing the element
 */
export const Summary = (props: SummaryProps) => {
  const { children, className } = props;

  const { open, setDetailsOpen, setOpen } = useDetailsContext();

  return (
    // Contrary to the ESLint rule, the <summary> element is an interactive
    // element but the work has not been done to integrate it yet.
    //
    // See: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/656

    <summary
      className={cx(
        "group/Details-Summary",
        // base
        "flex cursor-pointer items-center gap-2 p-2 [&::-webkit-details-marker]:hidden",
        // breathable background
        "before:absolute before:inset-0 before:-z-base before:rounded-sm before:border before:bg-core-white before:transition-[border-radius,transform] before:duration-500 hover:before:rounded-md before:active:rounded-sm",
        // large variant styles
        "group-data-[variant=lg]/Details:before:rounded-lg group-data-[variant=lg]/Details:before:border-2 group-data-[variant=lg]/Details:before:hover:scale-[1.01] group-data-[variant=lg]/Details:hover:before:rounded-xl group-data-[variant=lg]/Details:before:active:rounded-lg",
        "before:border-ui-grey-400 group-open/Details:before:border-core-black group-data-[open=false]/Details:before:border-ui-grey-400",
        // highlight when focussed
        "focus:outline-none focus:before:ring",
        // large variant styles
        "group-data-[variant=lg]/Details:px-6 group-data-[variant=lg]/Details:py-4 group-data-[variant=lg]/Details:md:px-8 group-data-[variant=lg]/Details:md:py-6",
        className,
      )}
      onClick={(ev) => {
        ev.preventDefault();
        setDetailsOpen(true);
        setOpen(!open);
      }}
    >
      {children}
    </summary>
  );
};

interface LabelProps {
  children: ReactNode;
  className?: string;
}

/**
 * Defines the name of the collapsed section
 */
export const Label = (props: LabelProps) => {
  const { children, className } = props;

  return (
    <span
      className={cx(
        // depress animation on click
        "grow transition-transform group-active/Details-Summary:translate-y-1",
        // large variant styles
        "group-data-[variant=lg]/Details:text-xs group-data-[variant=lg]/Details:font-semibold",
        className,
      )}
    >
      {children}
    </span>
  );
};

interface IndicatorArrowProps {
  className?: string;
}

/**
 * Renders an upward or downward pointing arrow depending on the open state
 */
export const IndicatorArrow = (props: IndicatorArrowProps) => {
  const { className } = props;

  return (
    <div
      aria-hidden
      className={cx(
        // base, pointing down
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ui-grey-300 bg-core-white focus:border-secondary-blue-dark",
        // pointing up, black background
        "transition-all group-open/Details:border-core-black group-open/Details:bg-core-black group-open/Details:text-core-white group-data-[open=false]/Details:border-ui-grey-300 group-data-[open=false]/Details:bg-transparent group-data-[open=false]/Details:text-core-black",
        // large variant styles
        "group-data-[variant=lg]/Details:md:h-16 group-data-[variant=lg]/Details:md:w-16",
        className,
      )}
    >
      <svg
        className="block w-1/2 transition-transform duration-500 group-open/Details:[transform:rotateX(180deg)] group-data-[open=false]/Details:transform-none"
        width="29"
        height="18"
        viewBox="0 0 30 20"
        fill="none"
      >
        <path d="M2 3.5L15 16.5L28 3.5" stroke="currentColor" strokeWidth="4" />
      </svg>
    </div>
  );
};

interface IndicatorCrossProps {
  className?: string;
}

/**
 * Renders a plus or minus depending on the open state
 */
export const IndicatorPlusMinus = (props: IndicatorCrossProps) => {
  const { className } = props;

  return (
    <svg
      aria-hidden
      className={cx(
        "block h-6 w-6 shrink-0 cursor-pointer rounded-full fill-currentColor outline -outline-offset-2 outline-ui-grey-300 [&>path]:origin-center [&>path]:transition-transform [&>path]:duration-300",
        // large variant styles
        "group-data-[variant=lg]/Details:md:h-12 group-data-[variant=lg]/Details:md:w-12",
        className,
      )}
      viewBox="0 0 12 12"
    >
      <path
        className="group-open/Details:-rotate-180 group-data-[open=false]/Details:transform-none"
        d="M6 10.91Zm.55-5.46h2v1h-5v-1z"
      />
      <path
        className="group-open/Details:-rotate-90 group-data-[open=false]/Details:transform-none"
        d="M6 10.91Zm.55-5.46v3h-1v-5h1z"
      />
    </svg>
  );
};

const contentVariants: Variants = {
  collapse: { height: 0, opacity: 0 },
  open: { height: "auto", opacity: 1 },
};

interface ContentProps {
  children: ReactNode;
  className?: string;
}

/**
 * Where the content lives that will be transitioned in or out of the page
 */
export const Content = (props: ContentProps) => {
  const { children, className } = props;

  const { open, setDetailsOpen } = useDetailsContext();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          onAnimationComplete={(animationName) => {
            switch (animationName) {
              case "open":
                setDetailsOpen(true);
                break;
              case "collapse":
                setDetailsOpen(false);
                break;
            }
          }}
          className="overflow-hidden"
          initial="collapse"
          animate="open"
          exit="collapse"
          variants={contentVariants}
          transition={{ duration: 0.4 }}
        >
          <div
            className={cx(
              "mx-4 mb-2 mt-2 md:mx-2 md:mb-4 text-[12px]",
              'group-data-[variant="lg"]/Details:text-xs',
              className,
            )}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
