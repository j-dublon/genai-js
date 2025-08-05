export type ErrorAction = "restart" | "retry";
interface ErrorButton {
  text: string;
  action: ErrorAction;
}
interface ErrorConfig {
  title: string;
  paragraphs: string[];
  button?: ErrorButton;
  showTrustpilot?: boolean;
}

export const errorProps: Record<string, ErrorConfig> = {
  generalError: {
    title: "Whoops, that hasn't quite worked",
    paragraphs: [
      "We're really sorry, but something's not right here. It could be a hiccup on our side, or you may have missed something when adding your details.",
      "Give our lovely Customer Care team a ring on 0330 912 9955. Lines are open: 8am to 8pm, Monday - Friday, 9am to 5.30pm, weekends and bank holidays.",
    ],
  },
  basketError: {
    title: "Whoops, that hasn't quite worked",
    paragraphs: [
      "We're really sorry, but something's not right here. It could be a hiccup on our side, or you may have missed something when adding your details.",
      "You can retry below, or give our lovely Customer Care team a ring on 0330 912 9955. Lines are open: 8am to 8pm, Monday - Friday, 9am to 5.30pm, weekends and bank holidays.",
    ],
    button: {
      text: "Restart signup",
      action: "restart",
    },
  },
  creditCheckLimitReached: {
    title: "Credit Check Limit Reached",
    paragraphs: [
      "We're really sorry, but you've reached the limit of credit checks.",
      "Give our lovely Customer Care team a ring on 0330 912 9955. Lines are open: 8am to 8pm, Monday - Friday, 9am to 5.30pm, weekends and bank holidays.",
    ],
  },
  creditCheckLoadHashedError: {
    title: "Credit Check Error",
    paragraphs: [
      "We're really sorry, but we're having trouble loading your credit check.",
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
      action: "restart",
    },
  },
};
