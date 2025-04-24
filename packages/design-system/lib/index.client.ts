"use client";
import "./index.css";

import { AccountAppButton } from "@components/atoms/AccountAppButton";
import { Button } from "@components/atoms/Button";
import { ColorPill } from "@components/atoms/ColorPill";
import { DatePicker } from "@components/atoms/DatePicker";
import { FeatureImage } from "@components/atoms/FeatureImage";
import { GuideCard, GuideCardProps } from "@components/atoms/GuideCard";
import { Heading } from "@components/atoms/Heading";
import { PhoneTextContent } from "@components/atoms/PhoneTextContent";
import { ReviewCard, ReviewCardProps } from "@components/atoms/ReviewCard";
import { SectionHeading } from "@components/atoms/SectionHeading";
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
import { ImageMarquee } from "@components/molecules/ImageMarquee";
import { InfoCard, InfoCardProps } from "@components/molecules/InfoCard";
import { InfoModal } from "@components/molecules/InfoModal";
import { MobileApp } from "@components/molecules/MobileApp";
import { MobilePhone } from "@components/molecules/MobilePhone";
import { PostcodeChecker } from "@components/molecules/PostcodeChecker";
import { ProductCard } from "@components/molecules/ProductCard";
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
  ColorPill,
  CompanyLogoStrip,
  DatePicker,
  FeatureImage,
  Footer,
  GuideCard,
  Heading,
  HowFastCanYouGo,
  ImageMarquee,
  InfoCard,
  InfoModal,
  MobileApp,
  MobilePhone,
  NavBar,
  PhoneTextContent,
  PostcodeChecker,
  ProductCard,
  ReviewCard,
  SectionHeading,
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
  GuideCardProps,
  InfoCardProps,
  ReviewCardProps,
  TextColors,
  TextWithTickProps,
};
