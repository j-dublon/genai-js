import { join } from "path";

export const getAssetPath = (path: string) => {
  return join("/vc-ap-marketing/assets", path);
};
