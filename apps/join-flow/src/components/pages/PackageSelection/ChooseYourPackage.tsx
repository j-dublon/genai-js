"use client";

import { BroadbandPackage } from "@store/useJoinFlowStore";

import {
  broadbandPackages,
  packageSelectionPageText,
} from "./packageSelectionProps";

interface ChooseYourPackageProps {
  errorMessage?: string;
  hasError?: boolean;
  onPackageSelect: (pkg: BroadbandPackage) => void;
}

const ChooseYourPackage: React.FC<ChooseYourPackageProps> = ({
  errorMessage,
  hasError,
  onPackageSelect,
}) => {
  return (
    <section className="bg-ui-grey-100 px-mobile sm:px-tablet lg:px-desktop py-12">
      <div className="md:max-w-[1152px] mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">
          {packageSelectionPageText.pageTitle}
        </h1>
        <p className="text-center mb-8">
          {packageSelectionPageText.pageSubtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {broadbandPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold">{pkg.name}</h2>
                <div className="mt-2">
                  <span className="text-3xl font-bold">
                    £{pkg.price.monthly}
                  </span>
                  <span className="text-sm">{pkg.texts.monthlyLabel}</span>
                </div>
                <p className="mt-2 text-sm">
                  {pkg.contractLength} {pkg.texts.contractLabel}
                </p>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div>
                    <p className="font-bold">{pkg.speed.download} Mbps</p>
                    <p className="text-sm">{pkg.texts.downloadLabel}</p>
                  </div>
                  <div className="ml-auto">
                    <p className="font-bold">{pkg.speed.upload} Mbps</p>
                    <p className="text-sm">{pkg.texts.uploadLabel}</p>
                  </div>
                </div>

                <p className="mb-4">{pkg.description}</p>

                <button
                  onClick={() => onPackageSelect(pkg)}
                  className="w-full py-3 font-bold rounded-md transition-colors"
                  type="button"
                >
                  {pkg.texts.ctaButtonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {hasError && errorMessage && (
          <p className="text-core-red mt-4 text-center">{errorMessage}</p>
        )}
      </div>
    </section>
  );
};

export default ChooseYourPackage;
