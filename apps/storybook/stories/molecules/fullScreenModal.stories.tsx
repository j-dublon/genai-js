import { Button, FullScreenModal } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { ReactNode, useRef } from "react";

interface FullScreenModalWrapperProps {
  title: string;
  children: ReactNode;
}

const FullScreenModalWrapper = (props: FullScreenModalWrapperProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  return (
    <div>
      <Button onClick={openModal} variant="solid" tint="yellow">
        Open Full Screen Modal
      </Button>
      <FullScreenModal title={props.title} modalRef={modalRef}>
        {props.children}
      </FullScreenModal>
    </div>
  );
};

const meta: Meta<typeof FullScreenModalWrapper> = {
  component: FullScreenModalWrapper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The title displayed at the top of the modal",
    },
    children: {
      control: "object",
      description:
        "The content to display in the modal (can be text or React elements)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof FullScreenModalWrapper>;

export const Default: Story = {
  render: (args) => <FullScreenModalWrapper {...args} />,
  name: "Full Screen Modal",
  args: {
    title: "Modal with Complex Content",
    children: (
      <div className="ds:p-4">
        <h3 className="ds:text-lg ds:font-medium ds:mb-4">
          Complex Content Example
        </h3>
        <p className="ds:text-md ds:mb-4">
          This modal demonstrates how to use the FullScreenModal with elements
          as content.
        </p>
        <div className="ds:bg-gray-100 ds:p-4 ds:rounded ds:mb-4">
          <p className="ds:text-sm">You can include various elements:</p>
          <ul className="ds:list-disc ds:ml-5 ds:mt-2">
            <li>Forms</li>
            <li>Tables</li>
            <li>Images</li>
            <li>Custom components</li>
          </ul>
        </div>
        <Button variant="solid" tint="blue">
          Example Button
        </Button>
      </div>
    ),
  },
};
