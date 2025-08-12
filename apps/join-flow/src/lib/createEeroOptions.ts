import type {
  EeroProduct,
  StoreSelectedPackage,
} from "@/store/useJoinFlowStore";

export type EeroOption = EeroProduct & {
  heading: string;
  description?: string;
  imageURL: string;
  totalCount: number;
};

// TODO: This is a temporary type until we have the CMS integrated
type EeroContent = {
  code: string;
  heading: string;
  description?: string;
  totalCount: number;
  imageURL: string;
};

export const hydrateEeroProductWithContent = (
  eero: EeroProduct | null,
  eeroProductContent: EeroContent[],
): EeroOption | null => {
  if (!eero) {
    return null;
  }

  const eeroContent = eeroProductContent.find(
    (product) => product.code === eero.code,
  );

  if (!eeroContent) {
    return null;
  }

  return {
    ...eero,
    heading: eeroContent.heading,
    description: eeroContent.description ?? "",
    imageURL: eeroContent.imageURL,
    totalCount: eeroContent.totalCount,
  };
};

// Currently there can be up to three options: 1 eero (no additional eeros), 2 eeros (1 extra eero), 3 eeros (2 extra eeros)
export const createEeroOptions = (
  availableExtras: StoreSelectedPackage["availableExtras"],
  eeroProductContent: EeroContent[],
): EeroOption[] => {
  const extras =
    availableExtras?.find((extra) => extra.family === "mesh_routers")?.extras ||
    [];

  const options = extras.reduce<EeroOption[]>((acc, extra) => {
    const eeroContent = eeroProductContent.find(
      (product) => product.code === extra.code,
    );

    if (!eeroContent) {
      return acc;
    }

    acc.push({
      code: extra.code,
      family: extra.family,
      selectionIdentifier: extra.selectionIdentifier,
      price: extra.price,
      heading: eeroContent.heading,
      description: eeroContent.description ?? "",
      imageURL: eeroContent.imageURL,
      totalCount: eeroContent.totalCount,
    });

    return acc;
  }, []);

  const defaultOption = eeroProductContent.find(
    (product) => product.code === "EERO_MESH_ROUTER_X0",
  );

  if (
    defaultOption &&
    !options.some((opt) => opt.code === defaultOption.code)
  ) {
    options.push({
      code: defaultOption.code,
      family: "mesh_routers",
      selectionIdentifier: "default",
      price: 0,
      heading: defaultOption.heading,
      description: defaultOption.description ?? "",
      imageURL: defaultOption.imageURL,
      totalCount: defaultOption.totalCount,
    });
  }

  return options.sort((a, b) => a.totalCount - b.totalCount);
};
