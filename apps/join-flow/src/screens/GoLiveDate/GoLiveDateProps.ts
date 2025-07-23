import { LoadingModalSlide } from "@/hooks/useLoadingModal";

export interface GoLiveDateProps {
  nextStepPillText: string;
  title: string;
  subtitle: string;
  tipCardText: string;
  paragraph: string;
  engineerLink: string;
  availableDatesLabel: string;
  timeSlotLabel: string;
  datePickerPlaceholder: string;
  timeSlotPlaceHolder: string;
  continueButtonText: string;
  otsFailBannerText: string;
  otsFailBannerHighlightText: string;
  engineerVisitModal: {
    title: string;
    paragraphs: string[];
    link: string;
    buttonText: string;
  };
}

export const goLiveDateText: GoLiveDateProps = {
  nextStepPillText: "Pay & join Cuckoo",
  title: "Your go-live Date",
  tipCardText: "Yay! We can get you live as early as ",
  subtitle:
    "This is the earliest date we can connect you to our full fibre. If this date doesn't suit you, pick another below.",
  paragraph:
    "You won't need to be at the property on this date, unless we need to send an engineer to set up your connection. We'll let you know in the next step.",
  engineerLink: "What happens if I need an engineer?",
  availableDatesLabel: "Choose your go live date",
  datePickerPlaceholder: "Select an installation date...",
  timeSlotLabel:
    "Please note, our engineers operate Monday - Saturday, between the hours of 8am - 6pm. ",
  timeSlotPlaceHolder: "Select a timeslot",
  continueButtonText: "Continue to payment",
  otsFailBannerText:
    "We couldn't find your current provider, so you'll need to let them know that you're switching to Cuckoo after you've signed up.",
  otsFailBannerHighlightText: "let them know",
  engineerVisitModal: {
    title: "What happens if I need an engineer?",
    paragraphs: [
      "If an engineer is due, you'll be contacted by our engineer to advise that they are on their way.",
      "Once the engineer is on site, they'll introduce themselves and provide ID and talk you through the process before they begin.",
      "Depending on how we've built our new network in your area, they'll either:",
      "bring the connection to your home either overhead using a nearby telegraph pole, or underground by digging a narrow channel up to your access wall. The team will agree the most effective route possible. We'll then connect your home by putting a new connection box on the outside of your property, and a smaller one on the inside of it where it won't get in the way.",
      "check that the equipment that's been installed previously is still working and take action to ensure that any faults they spot get fixed.",
      "When your home is connected, the team will carry out several quality tests to confirm your new fibre broadband works. To learn more, read our handy guide what happens on the day of the installation/activation?",
    ],
    link: "https://help.cuckoo.co/en/articles/9123620-what-happens-on-the-day-of-the-installation-activation",
    buttonText: "Okay, got it",
  },
};

export const slides: LoadingModalSlide[] = [
  {
    src: "/images/megaphone-animated.gif",
    message: "Crossing all the T's and dotting all the I's",
  },
  {
    src: "/images/news-animated.gif",
    message: "What do those T's and I's stand for anyway?",
  },
  {
    src: "/images/egg-animated.gif",
    message: "Never mind - we're very nearly there...",
  },
];
