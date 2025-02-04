import type { Meta, StoryObj } from "@storybook/react";
import { AccordionSection } from "@react-component-library/ui";

const meta: Meta<typeof AccordionSection> = {
  component: AccordionSection,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AccordionSection>;

const questions = {
  dropdown_header: "Why should I choose cuckoo",
  dropdown_content: [
    "There's no one good reason to join Cuckoo. There are four: We only offer full fibre broadband which can easily handle all the streaming, gaming and WFHing you can throw at it. And is amazingly reliable too.",
  ],
  button_text: "Discover feel good broadband",
  button_link: "www.test.com",
};

const questions2 = {
  dropdown_header: "Isn't switching a challenge?",
  dropdown_content: [
    "We’ve made the whole thing oh-so-simple. Just pop in your postcode at the top of the page, pick your speed and contract length, and then choose a start date. Our friendly, UK-based Customer Care team will guide you every step of the way and answer any questions you have. For more info, our switching page shows you just how easy it is.",
  ],
  button_text: "Make the switch",
  button_link: "www.test.com",
};

const questions3 = {
  dropdown_header: "Can I sign up over the phone?",
  dropdown_content: [
    "Yes! We understand that everyone does things differently, so our friendly team are always happy to help.",
    "You can sign up by calling us directly on: 0330 912 9955",
  ],
};

const questionsArr = [questions, questions2, questions3];

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => (
    <AccordionSection
      heading="Still not sure? Tell us what’s bothering you."
      questionsArr={questionsArr}
    />
  ),
  name: "Accordion",
  args: {},
};
