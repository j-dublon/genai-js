import { describe, expect, it } from "vitest";

import { createEeroOptions, type EeroOption } from "./createEeroOptions";

describe("createEeroOptions", () => {
  const mockEeroContent = [
    {
      code: "EERO_MESH_ROUTER_X1",
      heading: "No additional Eero needed",
      description: "Just one eero provided by us.",
      totalCount: 1,
      imageURL: "/images/x1_eeros.png",
    },
    {
      code: "EERO_MESH_ROUTER_X2",
      heading: "Add one extra eero to your plan",
      description:
        "2 eeros will cover an area of approximately XXX square metres.",
      totalCount: 2,
      imageURL: "/images/x2_eeros.png",
    },
    {
      code: "EERO_MESH_ROUTER_X3",
      heading: "Add 2 extra eeros to your plan",
      description:
        "3 eero routers will cover an area of approximately XXX square metres.",
      totalCount: 3,
      imageURL: "/images/x3_eeros.png",
    },
  ];

  const createMockExtras = (
    extras: Array<{
      code: string;
      name: string;
      description: string;
      price: number;
      selectionIdentifier: string;
      family: string;
      id?: string | null;
    }> = [],
  ) => [
    {
      family: "mesh_routers",
      extras,
      id: "mesh-routers-1",
    },
  ];

  it("should return empty array when extras is null", () => {
    const result = createEeroOptions(null, mockEeroContent);

    expect(result).toEqual([]);
  });

  it("should return empty array when extras is undefined", () => {
    const result = createEeroOptions(undefined, mockEeroContent);

    expect(result).toEqual([]);
  });

  it("should return empty array when extras is empty array", () => {
    const result = createEeroOptions([], mockEeroContent);

    expect(result).toEqual([]);
  });

  it("should return empty array when no mesh_routers family found", () => {
    const extras = [
      {
        family: "other_family",
        extras: [
          {
            code: "EERO_MESH_ROUTER_X1",
            name: "Test Eero",
            description: "Test description",
            price: 1000,
            selectionIdentifier: "test-selection-1",
            family: "other_family",
          },
        ],
      },
    ];

    const result = createEeroOptions(extras, mockEeroContent);

    expect(result).toEqual([]);
  });

  it("should return empty array when mesh_routers family has no extras", () => {
    const extras = [
      {
        family: "mesh_routers",
        extras: [],
        id: "mesh-routers-1",
      },
    ];

    const result = createEeroOptions(extras, mockEeroContent);

    expect(result).toEqual([]);
  });

  it("should return empty array when mesh_routers family has null extras", () => {
    const extras = [
      {
        family: "mesh_routers",
        extras: null,
        id: "mesh-routers-1",
      },
    ];

    const result = createEeroOptions(extras, mockEeroContent);

    expect(result).toEqual([]);
  });

  it("should filter out extras that don't have matching content", () => {
    const extras = createMockExtras([
      {
        code: "EERO_MESH_ROUTER_X1",
        name: "No additional Eero",
        description: "Just one eero provided by us.",
        price: 0,
        selectionIdentifier: "selection-1",
        family: "mesh_routers",
      },
      {
        code: "NON_EXISTENT_CODE",
        name: "Non-existent Eero",
        description: "This should be filtered out.",
        price: 1000,
        selectionIdentifier: "selection-2",
        family: "mesh_routers",
      },
    ]);

    const result = createEeroOptions(extras, mockEeroContent);

    expect(result).toHaveLength(1);
    expect(result[0].code).toBe("EERO_MESH_ROUTER_X1");
  });

  it("should create EeroOption with correct structure", () => {
    const extras = createMockExtras([
      {
        code: "EERO_MESH_ROUTER_X1",
        name: "No additional Eero",
        description: "Just one eero provided by us.",
        price: 0,
        selectionIdentifier: "selection-1",
        family: "mesh_routers",
      },
    ]);
    const expectedOption: EeroOption = {
      code: "EERO_MESH_ROUTER_X1",
      family: "mesh_routers",
      selectionIdentifier: "selection-1",
      price: 0,
      heading: "No additional Eero needed",
      description: "Just one eero provided by us.",
      imageURL: "/images/x1_eeros.png",
      totalCount: 1,
    };

    const result = createEeroOptions(extras, mockEeroContent);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(expectedOption);
  });

  it("should sort options by totalCount in ascending order", () => {
    const extras = createMockExtras([
      {
        code: "EERO_MESH_ROUTER_X3",
        name: "3 Eeros",
        description: "3 eero routers",
        price: 2000,
        selectionIdentifier: "selection-3",
        family: "mesh_routers",
      },
      {
        code: "EERO_MESH_ROUTER_X1",
        name: "1 Eero",
        description: "Just one eero",
        price: 0,
        selectionIdentifier: "selection-1",
        family: "mesh_routers",
      },
      {
        code: "EERO_MESH_ROUTER_X2",
        name: "2 Eeros",
        description: "2 eero routers",
        price: 1000,
        selectionIdentifier: "selection-2",
        family: "mesh_routers",
      },
    ]);

    const result = createEeroOptions(extras, mockEeroContent);

    expect(result).toHaveLength(3);
    expect(result[0].totalCount).toBe(1);
    expect(result[1].totalCount).toBe(2);
    expect(result[2].totalCount).toBe(3);
  });

  it("should handle empty eeroProductContent array", () => {
    const extras = createMockExtras([
      {
        code: "EERO_MESH_ROUTER_X1",
        name: "No additional Eero",
        description: "Just one eero provided by us.",
        price: 0,
        selectionIdentifier: "selection-1",
        family: "mesh_routers",
      },
    ]);

    const result = createEeroOptions(extras, []);

    expect(result).toEqual([]);
  });

  it("should handle case where some extras match content and others don't", () => {
    const extras = createMockExtras([
      {
        code: "EERO_MESH_ROUTER_X1",
        name: "No additional Eero",
        description: "Just one eero provided by us.",
        price: 0,
        selectionIdentifier: "selection-1",
        family: "mesh_routers",
      },
      {
        code: "UNMATCHED_CODE",
        name: "Unmatched Eero",
        description: "This won't match any content",
        price: 500,
        selectionIdentifier: "selection-unmatched",
        family: "mesh_routers",
      },
      {
        code: "EERO_MESH_ROUTER_X2",
        name: "2 Eeros",
        description: "2 eero routers",
        price: 1000,
        selectionIdentifier: "selection-2",
        family: "mesh_routers",
      },
    ]);

    const result = createEeroOptions(extras, mockEeroContent);
    expect(result).toHaveLength(2);
    expect(result[0].code).toBe("EERO_MESH_ROUTER_X1");
    expect(result[1].code).toBe("EERO_MESH_ROUTER_X2");
  });
});
