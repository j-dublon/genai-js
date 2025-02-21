import { bgColorVariants } from "./variants";

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

export type BackgroundColors = keyof typeof bgColorVariants;
