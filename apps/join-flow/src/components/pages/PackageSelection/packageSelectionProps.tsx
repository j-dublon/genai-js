export const packageSelectionPageText = {
  pageTitle: "Choose Your Broadband Package",
  pageSubtitle: "Select the package that suits your needs",
  errorMessage: "Please select a package to continue",
};

export const broadbandPackages = [
  {
    id: "c-150",
    name: "C-150",
    speed: {
      download: 150,
      upload: 30,
    },
    price: {
      monthly: 32,
      setup: 0,
    },
    priceIncrease: {
      nextYearIncrease: 3.0,
      followingYearIncrease: 3.0,
    },
    contractLength: 12,
    description: "Full fibre speeds",
    texts: {
      monthlyLabel: "/month",
      contractLabel: "month contract",
      downloadLabel: "Download",
      uploadLabel: "Upload",
      ctaButtonText: "Add to basket",
    },
  },
  {
    id: "c-500",
    name: "C-500",
    speed: {
      download: 500,
      upload: 20,
    },
    price: {
      monthly: 37,
      setup: 0,
    },
    priceIncrease: {
      nextYearIncrease: 3.0,
      followingYearIncrease: 3.0,
    },
    contractLength: 12,
    description: "Full fibre speeds",
    texts: {
      monthlyLabel: "/month",
      contractLabel: "month contract",
      downloadLabel: "Download",
      uploadLabel: "Upload",
      ctaButtonText: "Add to basket",
    },
  },
  {
    id: "c-900",
    name: "C-900",
    speed: {
      download: 1000,
      upload: 100,
    },
    price: {
      monthly: 54.99,
      setup: 0,
    },
    priceIncrease: {
      nextYearIncrease: 3.0,
      followingYearIncrease: 3.0,
    },
    contractLength: 12,
    description: "Full fibre speeds",
    texts: {
      monthlyLabel: "/month",
      contractLabel: "month contract",
      downloadLabel: "Download",
      uploadLabel: "Upload",
      ctaButtonText: "Add to basket",
    },
  },
];
