export interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Tag {
  text: string;
  backgroundColor: BackgroundColors;
}

export type BackgroundColors = "yellow" | "pink" | "grey" | "orange" | "blue";
