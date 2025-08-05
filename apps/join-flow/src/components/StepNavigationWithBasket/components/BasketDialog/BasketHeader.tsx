import {
  ChevronVerticalWithCircle,
  CloseIcon,
} from "@react-component-library/ui/icons";

export const BasketHeader = ({
  onClose,
  title,
}: {
  onClose: () => void;
  title: string;
}) => (
  <div
    id="review-your-basket-header"
    className="flex justify-between items-center"
  >
    <h2 className="text-sm md:text-3xl font-semibold leading-[1.6] md:leading-[1.4]">
      {title}
    </h2>
    <button
      aria-label="Close basket"
      onClick={onClose}
      className="text-md font-medium cursor-pointer"
    >
      <div className="hidden md:flex md:gap-2 md:items-center">
        Close
        <CloseIcon width={31} height={31} />
      </div>
      <div className="md:hidden">
        <ChevronVerticalWithCircle
          width={24}
          height={24}
          borderColor="#1F1F1F"
          DropdownOpen={true}
        />
      </div>
    </button>
  </div>
);
