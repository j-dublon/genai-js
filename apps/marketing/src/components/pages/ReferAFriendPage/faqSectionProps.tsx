import { Question } from "@/components/molecules/FAQSection";

export const questions: Question[] = [
  {
    dropdown_header: "How can I refer someone?",
    dropdown_content: [
      'Its an easy copy and paste job. Just go to the "Refer a friend" tab in My Account and copy your unique link. Then, you can send it to your nearest and dearest by email, text or social media. If you cant access My Account, just give us a call on 0330 912 9955',
    ],
    button_text: "Log into my account",
    button_link: "https://www.cuckoo.co/account/login",
  },
  {
    dropdown_header: "How long will it be before I get my reward?",
    dropdown_content: [
      "It usually takes about three months to get the reward. The friend you referred must have signed up, have an active service and both of you must have paid two bills before we add the credit to your accounts.",
    ],
  },
  {
    dropdown_header: "Do I get my reward if my friend cancels?",
    dropdown_content: [
      "Sadly not. If your friend cancels their service within the first three months, then the terms of the scheme will not have been met, and neither of you will get your Cuckoo credit.",
    ],
  },
  {
    dropdown_header: "What's the catch?",
    dropdown_content: [
      "No catches here. The more friends you refer who sign up, the more rewards you'll get. It's that simple.",
    ],
  },
  {
    dropdown_header: "How do I receive my reward?",
    dropdown_content: [
      "We'll automatically add the credit to your account (you'll see it reflected on your bill). Yep, that's right - there's nothing for you to do except wait for your credit to drop.",
    ],
  },
  {
    dropdown_header: "Can I refer more than one person?",
    dropdown_content: [
      "You sure can. The more people you refer the better the deal gets - with £50 credit added to your account every time.",
    ],
  },
];

export const faqSection = {
  heading: "Got questions? We've got the answers.",
  subHeading:
    "It's good to share. Especially when it comes to info. Here's everything you need to know about referring your nearest and dearest to Cuckoo.",
  questions,
};
