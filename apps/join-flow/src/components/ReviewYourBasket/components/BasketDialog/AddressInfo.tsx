import { formatServiceAddress } from "@/lib/formatServiceAddress";
import { StoreAddress } from "@/store/useJoinFlowStore";

export const AddressInfo = ({
  title,
  address,
}: {
  title: string;
  address: StoreAddress;
}) => (
  <div className="flex flex-col md:flex-row text-xs md:text-sm leading-[1.6] gap-4 md:gap-1">
    <h3 className="font-normal whitespace-nowrap">{title}</h3>
    <p className="font-semibold">{formatServiceAddress(address)}</p>
  </div>
);
