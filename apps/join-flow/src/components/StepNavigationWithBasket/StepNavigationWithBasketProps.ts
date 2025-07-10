import { getAssetPath } from "@/lib/get-asset-path";

export const headerText = "What's next?";

export const nextStepPillText = {
  1: "Adding your eero(s)",
  2: "Switching & going live",
  3: "Payment & join Cuckoo",
};

export const reviewYourBasketContent = {
  eeroProducts: [
    {
      code: "EERO_MESH_ROUTER_X1",
      heading: "No additional Eero needed",
      description: "Just one eero provided by us.",
      totalCount: 1,
      imageURL: getAssetPath("/images/x1_eeros.png"),
    },
    {
      code: "EERO_MESH_ROUTER_X2",
      heading: "Add one extra eero to your plan",
      description:
        "2 eeros will cover an area of approximately XXX square metres and is perfect for most UK homes.",
      totalCount: 2,
      imageURL: getAssetPath("/images/x2_eeros.png"),
    },
    {
      code: "EERO_MESH_ROUTER_X3",
      heading: "Add 2 extra eeros to your plan",
      description:
        "3 eero routers will cover an area of approximately XXX square metres, and is perfect for really large homes, multiple floors and connection outside.",
      totalCount: 3,
      imageURL: getAssetPath("/images/x3_eeros.png"),
    },
  ],
};
