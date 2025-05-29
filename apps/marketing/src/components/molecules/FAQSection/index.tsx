"use client";
import { AccordionSection } from "@react-component-library/ui";

export interface Question {
  dropdown_header: string;
  dropdown_content: string[];
  button_text?: string;
  button_link?: string;
}
export const questionsArr: Question[] = [
  {
    dropdown_header: "Why should I choose Cuckoo?",
    dropdown_content: [
      "There's no one good reason to join Cuckoo. There are four: We only offer full fibre broadband which can easily handle all the streaming, gaming and WFHing you can throw at it. And is amazingly reliable too.",
    ],
    button_text: "Discover feel good broadband",
    button_link: "/broadband",
  },
  {
    dropdown_header: "Isn't switching a hassle?",
    dropdown_content: [
      "We've made the whole thing oh-so-simple. Just pop in your postcode at the top of the page, pick your speed and contract length, and then choose a start date. Our friendly, UK-based Customer Care team will guide you every step of the way and answer any questions you have. For more info, our switching page shows you just how easy it is.",
    ],
    button_text: "Make the switch",
    button_link: "/switching",
  },
  {
    dropdown_header: "Can I sign up over the phone?",
    dropdown_content: [
      "Yes! We understand that everyone does things differently, so our friendly team are always happy to help.",
      "You can sign up by calling us directly on: 0330 912 9955",
    ],
  },
  {
    dropdown_header: "What are the benefits of full fibre?",
    dropdown_content: [
      "Full fibre gives you brilliantly fast, brilliantly reliable speeds of up to 900Mbps, all thanks to a fibre optic cable that connects directly to your home. ",
      "Unlike some providers, we don't use the older, copper wire connections from those green cabinets on the street. Not only are they much, much slower and more likely to break, they also force you to share the bandwidth with your neighbours (which is what causes the dreaded buffering). ",
      "With Cuckoo, you have your very own future-proof connection. ",
    ],
    button_text: "Learn more",
    button_link: "https://www.cuckoo.co/guide/what-is-full-fibre",
  },
  {
    dropdown_header: "What speed do I need?",
    dropdown_content: [
      "Our full fibre broadband speeds of 150, 500 and 900Mbps are built for all your streaming, gaming and WFH needs. But what you need for your home depends on how many people you live with and how you all use the internet. Before you choose, our handy speed guide will tell you all you need to know.",
    ],
    button_text: "What speeds do you need",
    button_link: "https://www.cuckoo.co/guide/what-is-a-good-broadband-speed",
  },
];

export const FAQSection = ({
  questions,
  heading,
  subText,
}: {
  questions: Question[];
  heading: string;
  subText?: string;
}) => {
  return (
    <AccordionSection
      heading={heading}
      subText={subText}
      questionsArr={questions}
    />
  );
};
