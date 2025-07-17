import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { LoadingModalSlide, useLoadingModal } from "./useLoadingModal";

vi.mock("@/lib/get-asset-path", () => ({
  getAssetPath: (src: string) => `/mocked/${src}`,
}));

describe("useLoadingModal", () => {
  let slides: LoadingModalSlide[];
  beforeEach(() => {
    slides = [
      { src: "image1.png", message: "Loading 1" },
      { src: "image2.png" },
    ];
  });

  it("returns a ref and slidesWithAssetPath with correct asset paths and messages", () => {
    const { result } = renderHook(() =>
      useLoadingModal({ isLoadingModalOpen: false, slides }),
    );
    expect(result.current.loadingModalRef.current).toBeNull();
    expect(result.current.slidesWithAssetPath).toEqual([
      { src: "/mocked/image1.png", message: "Loading 1" },
      { src: "/mocked/image2.png", message: "" },
    ]);
  });

  it("calls showModal when isLoadingModalOpen becomes true", () => {
    const { result, rerender } = renderHook(
      ({ isLoadingModalOpen }) =>
        useLoadingModal({ isLoadingModalOpen, slides }),
      { initialProps: { isLoadingModalOpen: false } },
    );

    const showModal = vi.fn();
    const close = vi.fn();
    result.current.loadingModalRef.current = {
      showModal,
      close,
    } as unknown as HTMLDialogElement;
    rerender({ isLoadingModalOpen: true });
    expect(showModal).toHaveBeenCalled();
    expect(close).not.toHaveBeenCalled();
  });

  it("calls close when isLoadingModalOpen becomes false", () => {
    const { result, rerender } = renderHook(
      ({ isLoadingModalOpen }) =>
        useLoadingModal({ isLoadingModalOpen, slides }),
      { initialProps: { isLoadingModalOpen: true } },
    );

    const showModal = vi.fn();
    const close = vi.fn();
    result.current.loadingModalRef.current = {
      showModal,
      close,
    } as unknown as HTMLDialogElement;
    rerender({ isLoadingModalOpen: false });
    expect(close).toHaveBeenCalled();
    expect(showModal).not.toHaveBeenCalled();
  });

  it("updates slidesWithAssetPath when slides change", () => {
    const { result, rerender } = renderHook(
      ({ slides }) => useLoadingModal({ isLoadingModalOpen: false, slides }),
      { initialProps: { slides } },
    );
    expect(result.current.slidesWithAssetPath[0].src).toBe(
      "/mocked/image1.png",
    );
    const newSlides = [
      { src: "new.png", message: "New" },
      { src: "another.png" },
    ];
    rerender({ slides: newSlides });
    expect(result.current.slidesWithAssetPath).toEqual([
      { src: "/mocked/new.png", message: "New" },
      { src: "/mocked/another.png", message: "" },
    ]);
  });
});
