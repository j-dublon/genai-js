import { getAssetPath } from "@/lib/get-asset-path";

export const CuckooProtectInfoCard = () => {
  return (
    <div className="px-5 pt-6 pb-4 rounded-lg bg-secondary-teal md:hidden">
      <img
        src={getAssetPath("/images/cuckoo_protect_logo.svg")}
        alt="Cuckoo protect logo on info card"
        className="w-[202px]"
      />
      <p className="pt-4 text-sm">
        <b>Pssst...</b> advanced security and privacy features come free with
        your plan, too (worth £199.98/month).
      </p>
    </div>
  );
};
