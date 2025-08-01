import { ErrorPageProps } from "@/components/ErrorPage";

export const errorProps: Record<string, ErrorPageProps> = {
  generalError: {
    title: "Whoops, that hasn't quite worked",
    paragraphs: [
      "We're really sorry, but something's not right here. It could be a hiccup on our side, or you may have missed something when adding your details.",
      "Give our lovely Customer Care team a ring on 0330 912 9955. Lines are open: 8am to 8pm, Monday - Friday, 9am to 5.30pm, weekends and bank holidays.",
    ],
  },
  networkError: {
    title: "Connection Error",
    paragraphs: [
      "We're having trouble connecting to our services.",
      "Give our lovely Customer Care team a ring on 0330 912 9955. Lines are open: 8am to 8pm, Monday - Friday, 9am to 5.30pm, weekends and bank holidays.",
    ],
  },
  validationError: {
    title: "Validation Error",
    paragraphs: [
      "We're really sorry, but something's not right here.",
      "Give our lovely Customer Care team a ring on 0330 912 9955. Lines are open: 8am to 8pm, Monday - Friday, 9am to 5.30pm, weekends and bank holidays.",
    ],
  },
  unknownError: {
    title: "Unknown Error",
    paragraphs: [
      "An unexpected error occurred.",
      "Give our lovely Customer Care team a ring on 0330 912 9955. Lines are open: 8am to 8pm, Monday - Friday, 9am to 5.30pm, weekends and bank holidays.",
    ],
  },
  invalidAffiliateError: {
    title: "Invalid Affiliate Link",
    paragraphs: [
      "Looks like you landed here expecting an affiliate link, it might be expired or otherwise not working.",
      "Don't worry you can still get Cuckoo!",
    ],
    button: {
      text: "Click here to signup normally",
      onClick: () => {
        window.location.href = "/join-flow";
      },
    },
  },
};
