import { useEffect, useMemo, useRef } from "react";

import { getAssetPath } from "@/lib/get-asset-path";

export interface LoadingModalSlide {
  src: string;
  message?: string;
}

export function useLoadingModal({
  isLoadingModalOpen,
  slides,
}: {
  isLoadingModalOpen: boolean;
  slides: LoadingModalSlide[];
}) {
  const loadingModalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isLoadingModalOpen) {
      loadingModalRef.current?.showModal();
    } else {
      loadingModalRef.current?.close();
    }
  }, [isLoadingModalOpen]);

  const slidesWithAssetPath = useMemo(
    () =>
      slides.map((slide) => ({
        ...slide,
        src: getAssetPath(slide.src),
        message: slide.message ?? "",
      })),
    [slides],
  );

  return { loadingModalRef, slidesWithAssetPath };
}
