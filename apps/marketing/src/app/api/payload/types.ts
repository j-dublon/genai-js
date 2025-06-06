// Temporarily extracting this instead of grabbing the entire payload types file for one interface
export interface Page {
  id: string;
  slug: string;
  content: {
    videoSrc: string;
    videoType: "video/mp4";
    heading: string;
    body: string;
    postCodeButtonText: string;
    postCodePlaceholderText: string;
    list: {
      text?: string | null;
      id?: string | null;
    }[];
    id?: string | null;
    blockName?: string | null;
    blockType: "bannerHeroBlock";
  }[];
  updatedAt: string;
  createdAt: string;
}
