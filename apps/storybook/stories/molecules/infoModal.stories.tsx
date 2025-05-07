import { Button, InfoModal } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";

interface InfoModalWrapperProps {
  title: string;
  buttonText?: string;
}

const ModalContent = () => {
  return (
    <>
      <img
        src="https://images.prismic.io/cuckoo-egg/353122c1-ecf2-4be9-bc9e-61ad08978207_Upgrading+to+full+fibre.png?auto=compress,format&rect=0,33,2144,1206&w=1100&h=619"
        alt="Modal Image"
        className="ds:my-8 ds:md:my-4 ds:w-full"
      />

      <p
        id="modal-subtitle"
        className="ds:text-xs ds:md:text-sm ds:font-semibold ds:leading-relaxed ds:text-core-black ds:pb-4"
      >
        Get started with our amazing features
      </p>
      <p
        id="modal-content"
        className="ds:text-core-black ds:leading-relaxed ds:pb-8 ds:md:pb-6 ds:font-normal ds:text-xs ds:md:text-sm"
      >
        This is a sample modal dialog that can be used to display important
        information to users.
      </p>
    </>
  );
};

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
      <InfoModal {...props} modalRef={modalRef}>
        <ModalContent />
      </InfoModal>
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
    buttonText: "Get Started",
  },
};
