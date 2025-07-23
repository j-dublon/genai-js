import { ConsentParams } from "@/contexts/CookieNotice";

type CommaSeparatedKeys<T> =
  | keyof T
  | `${Extract<keyof T, string>},${Extract<keyof T, string>}`
  | `${Extract<keyof T, string>},${Extract<keyof T, string>},${Extract<keyof T, string>}`;

export const preferences: {
  id: CommaSeparatedKeys<ConsentParams>;
  cookie_preferences_header: string;
  cookie_preferences_body: string;
  cookie_preference_default: "disabled" | "off" | "on";
}[] = [
  {
    id: "functionality_storage,security_storage",
    cookie_preferences_header: "Essential",
    cookie_preferences_body:
      "We use these for the proper functioning and security of the website. For instance, they enable you log in to your account and sign up for our service.",
    cookie_preference_default: "disabled",
  },
  {
    id: "analytics_storage,personalization_storage",
    cookie_preferences_header: "Analytics & customisation",
    cookie_preferences_body:
      "We use these to help us understand our customers and spot ways in which we can improve our service to you. We may customise your experience to give you more relevant information.",
    cookie_preference_default: "off",
  },
  {
    id: "ad_storage,ad_user_data,ad_personalization",
    cookie_preferences_header: "Marketing & social media",
    cookie_preferences_body:
      "We use these to give you more relevant offers and to measure the effectiveness of our advertising campaigns.",
    cookie_preference_default: "off",
  },
  {
    id: "ads_backend_tracking",
    cookie_preferences_header: "Advanced Matching",
    cookie_preferences_body:
      "Advanced matching can improve the online ads we deliver to our users and will help us to reach a more targeted customer audience. Where possible, we will share your securely hashed personal data with Google and/or Meta.",
    cookie_preference_default: "off",
  },
  {
    id: "ads_backend_tracking",
    cookie_preferences_header: "Conversions API & Enhanced Conversions",
    cookie_preferences_body:
      "Conversions API & Enhanced Conversions help us to better understand how you engage with our online ads and website. We use this data to improve the ads we deliver and to increase conversions. Where possible, we will share your securely hashed personal data with Google and/or Meta.",
    cookie_preference_default: "off",
  },
];

export const cookieBannerProps = {
  cookie_header_one: "Cuckoo cookies",
  cookie_header_two: "Check cookies",
  cookie_message_one:
    "We use cookies to give you the best experience on our website. Is that ok?",
  cookie_message_two:
    "Our website makes use of storage on your device. Here is an overview of the categories you can opt-in for and more detail can be found in our",
  cookie_button_one_text: "Allow all",
  cookie_button_two_text: "Check cookies",
  cookie_button_three_text: "Save preferences",
  preferences,
};
