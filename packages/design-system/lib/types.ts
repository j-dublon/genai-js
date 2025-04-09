import { bgColorVariants, textColorVariants } from "./variants";

export interface Image {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Tag {
  text: string;
  backgroundColor: BackgroundColors;
}

export const BACKGROUND_COLORS = Object.keys(
  bgColorVariants,
) as (keyof typeof bgColorVariants)[];

export const TEXT_COLORS = Object.keys(
  textColorVariants,
) as (keyof typeof textColorVariants)[];

export type BackgroundColors = keyof typeof bgColorVariants;

export type TextColors = keyof typeof textColorVariants;
