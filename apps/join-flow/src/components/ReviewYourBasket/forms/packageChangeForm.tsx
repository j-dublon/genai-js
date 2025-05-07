import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@react-component-library/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { reviewYourBasketText } from "@/components/ReviewYourBasket/ReviewYourBasketProps";
import { BroadbandPackage } from "@/store/useJoinFlowStore";

const planChangeSchema = z.object({
  selectedPlanId: z.string().min(1, "Please select a plan"),
});

export type PlanChangeFormData = z.infer<typeof planChangeSchema>;

interface PackageChangeFormProps {
  availablePackages: BroadbandPackage[];
  onSubmit: (data: PlanChangeFormData) => void;
  onCancel: () => void;
}

const PackageChangeForm = ({
  availablePackages,
  onSubmit,
  onCancel,
}: PackageChangeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanChangeFormData>({
    resolver: zodResolver(planChangeSchema),
    defaultValues: {
      selectedPlanId: "",
    },
  });

  return (
    <div className="mt-4 mb-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 p-5 border border-ui-grey-300 rounded-md bg-ui-grey-100">
          <h3 className="font-medium mb-3 text-core-black">
            {reviewYourBasketText.chooseDifferentPlan}
          </h3>

          <select
            {...register("selectedPlanId")}
            className={`w-full p-3 border ${
              errors.selectedPlanId ? "border-ui-error" : "border-ui-grey-300"
            } rounded-md`}
          >
            <option value="" disabled>
              {reviewYourBasketText.selectDifferentPlan}
            </option>
            {availablePackages.map((pkg) => (
              <option
                key={`${pkg.id}-${pkg.contractLength}`}
                value={`${pkg.id}-${pkg.contractLength}`}
              >
                {pkg.name} {reviewYourBasketText.fullFiber} -{" "}
                {pkg.speed.download}
                Mbps download, {pkg.speed.upload}Mbps upload - £
                {pkg.price.monthly}
                {reviewYourBasketText.perMonth} - {`${pkg.contractLength}`}{" "}
                months
              </option>
            ))}
          </select>

          {errors.selectedPlanId && (
            <p className="text-ui-error text-sm mt-1">
              {errors.selectedPlanId.message}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            size="small"
            type="button"
            onClick={onCancel}
          >
            {reviewYourBasketText.cancel}
          </Button>
          <Button variant="solid" size="small" tint="yellow" type="submit">
            {reviewYourBasketText.confirmChange}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PackageChangeForm;
