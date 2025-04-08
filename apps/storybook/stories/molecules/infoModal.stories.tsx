import { Button, InfoModal } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";

interface InfoModalWrapperProps {
  title: string;
  content: string;
  subtitle?: string;
  image?: string;
  buttonText?: string;
}

const InfoModalWrapper = (props: InfoModalWrapperProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  return (
    <div>
      <Button onClick={openModal} variant="solid" tint="yellow">
        Open Modal
      </Button>
      <InfoModal {...props} modalRef={modalRef} />
    </div>
  );
};

const meta: Meta<typeof InfoModal> = {
  component: InfoModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    content: { control: "text" },
    subtitle: { control: "text" },
    image: { control: "text" },
    buttonText: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof InfoModal>;

export const Default: Story = {
  render: (args) => <InfoModalWrapper {...args} />,
  name: "Info Modal",
  args: {
    title: "Welcome to Cuckoo",
    image:
      "https://images.prismic.io/cuckoo-egg/353122c1-ecf2-4be9-bc9e-61ad08978207_Upgrading+to+full+fibre.png?auto=compress,format&rect=0,33,2144,1206&w=1100&h=619",
    subtitle: "Get started with our amazing features",
    content:
      "This is a sample modal dialog that can be used to display important information to users. You can customize it with different content, images, and button text.",
    buttonText: "Get Started",
  },
};
