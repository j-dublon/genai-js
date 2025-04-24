import { PackageCard } from "@react-component-library/ui/server";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PackageCard> = {
  title: "Molecules/packageCard",
  component: PackageCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    tint: {
      control: "select",
      options: ["pink", "blue", "yellow"],
      description: "The color theme of the package card",
    },
    buttonText: {
      control: "text",
      description: "The text of the button",
    },
    featurePackage: {
      control: "boolean",
      description: "Whether this package should have different styling",
    },
    promotion: {
      control: "text",
      description: "Optional promotion pill with text",
    },
    onPackageSelect: {
      action: "package selected",
      description: "Callback when a package is selected",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PackageCard>;

const defaultPackage = {
  id: "1",
  name: "C-900",
  speed: {
    download: 100,
    upload: 20,
  },
  price: {
    monthly: 29,
    setup: 0,
  },
  priceIncrease: {
    nextYearIncrease: 2,
    followingYearIncrease: 2,
  },
  contractLength: 24,
  description: "Full fibre speed",
};

export const Default: Story = {
  args: {
    pkg: defaultPackage,
    tint: "blue",
    buttonText: "Add to bag",
  },
};

export const Promotion: Story = {
  args: {
    pkg: defaultPackage,
    tint: "yellow",
    buttonText: "Add to bag",
    featurePackage: true,
    promotion: "3 months free",
  },
};
