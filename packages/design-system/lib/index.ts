import "./index.css";

import { AccountAppButton } from "@components/atoms/AccountAppButton";
import { Button } from "@components/atoms/Button";
import { Checkbox } from "@components/atoms/Checkbox";
import { ColorPill } from "@components/atoms/ColorPill";
import { DatePicker, DatePickerProps } from "@components/atoms/DatePicker";
import { DropdownPill } from "@components/atoms/DropdownPill";
import { FeatureImage } from "@components/atoms/FeatureImage";
import { GuideCard, GuideCardProps } from "@components/atoms/GuideCard";
import { Heading } from "@components/atoms/Heading";
import { InfoAccordionItem } from "@components/atoms/InfoAccordionItem";
import {
  CustomInputProps,
  DropdownInputField,
} from "@components/atoms/InputField";
import { InputSlider } from "@components/atoms/InputSlider";
import { LegalClaims } from "@components/atoms/LegalClaims";
import { PhoneTextContent } from "@components/atoms/PhoneTextContent";
import { PillButton } from "@components/atoms/PillButton";
import { Radio } from "@components/atoms/Radio";
import { ReviewCard, ReviewCardProps } from "@components/atoms/ReviewCard";
import { ReviewCardSkeleton } from "@components/atoms/ReviewCardSkeleton";
import { SectionHeading } from "@components/atoms/SectionHeading";
import { ServerTest } from "@components/atoms/ServerTest";
import { SimpleNavBar } from "@components/atoms/SimpleNavBar";
import { Slider } from "@components/atoms/Slider";
import {
  TextWithTick,
  TextWithTickProps,
} from "@components/atoms/TextWithTick";
import { TipCard, tipCardColors } from "@components/atoms/TipCard";
import { ToggleSwitch } from "@components/atoms/ToggleSwitch";
import { TrustpilotStars } from "@components/atoms/TrustpilotStars";
import { AccordionSection } from "@components/molecules/AccordionSection";
import { ArticleCard } from "@components/molecules/ArticleCard";
import { CompanyLogoStrip } from "@components/molecules/CompanyLogoStrip";
import { FullScreenModal } from "@components/molecules/FullScreenModal";
import { ImageMarquee } from "@components/molecules/ImageMarquee";
import { InfoCard, InfoCardProps } from "@components/molecules/InfoCard";
import { InfoModal } from "@components/molecules/InfoModal";
import { MobileApp } from "@components/molecules/MobileApp";
import { MobilePhone } from "@components/molecules/MobilePhone";
import { PostcodeChecker } from "@components/molecules/PostcodeChecker";
import { ProductCard } from "@components/molecules/ProductCard";
import { ReasonCard } from "@components/molecules/ReasonCard";
import { ReferAFriendHero } from "@components/molecules/ReferAFriendHero";
import {
  ReferralCard,
  ReferralCardWrapper,
} from "@components/molecules/ReferralCards";
import { TextWithTickList } from "@components/molecules/TextWithTickList";
import { TimelineCard } from "@components/molecules/TimelineCard";
import { TimelineCardList } from "@components/molecules/TimelineCardList";
import { TrustpilotHorizontal } from "@components/molecules/TrustpilotHorizontal";
import { TrustpilotVertical } from "@components/molecules/TrustpilotVertical";
import { Footer } from "@components/organisms/Footer";
import { HowFastCanYouGo } from "@components/organisms/HowFastCanYouGo";
import { NavBar } from "@components/organisms/NavBar";
import { useClickOutside } from "@hooks/useClickOutside";
import { useScrollable } from "@hooks/useScrollable";
import { useTrustpilotScore } from "@hooks/useTrustPilotScore";

import {
  BACKGROUND_COLORS,
  BackgroundColors,
  TEXT_COLORS,
  TextColors,
} from "./types";

export {
  AccordionSection,
  AccountAppButton,
  ArticleCard,
  BACKGROUND_COLORS,
  Button,
  Checkbox,
  ColorPill,
  CompanyLogoStrip,
  DatePicker,
  DropdownPill,
  FeatureImage,
  Footer,
  FullScreenModal,
  GuideCard,
  Heading,
  HowFastCanYouGo,
  ImageMarquee,
  InfoAccordionItem,
  InfoCard,
  InfoModal,
  DropdownInputField as InputField,
  InputSlider,
  LegalClaims,
  MobileApp,
  MobilePhone,
  NavBar,
  PhoneTextContent,
  PillButton,
  PostcodeChecker,
  ProductCard,
  Radio,
  ReasonCard,
  ReferAFriendHero,
  ReferralCard,
  ReferralCardWrapper,
  ReviewCard,
  ReviewCardSkeleton,
  SectionHeading,
  ServerTest,
  SimpleNavBar,
  Slider,
  TEXT_COLORS,
  TextWithTick,
  TextWithTickList,
  TimelineCard,
  TimelineCardList,
  TipCard,
  tipCardColors,
  ToggleSwitch,
  TrustpilotHorizontal,
  TrustpilotStars,
  TrustpilotVertical,
  useClickOutside,
  useScrollable,
  useTrustpilotScore,
};

export type {
  BackgroundColors,
  CustomInputProps,
  DatePickerProps,
  GuideCardProps,
  InfoCardProps,
  ReviewCardProps,
  TextColors,
  TextWithTickProps,
};
