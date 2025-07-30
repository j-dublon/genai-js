import { ErrorPageProps } from "@/components/ErrorPage";

export const errorProps: Record<string, ErrorPageProps> = {
  generalError: {
    title: "Whoops, that hasn't quite worked",
    paragraphs: [
      "We're really sorry, but something's not right here. It could be a hiccup on our side, or you may have missed something when adding your details.",
      "Give our lovely Customer Care team a ring on 0330 912 9955. Lines are open: 8am to 8pm, Monday - Friday, 9am to 5.30pm, weekends and bank holidays.",
    ],
  },
};
