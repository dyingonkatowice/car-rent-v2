/// <reference types="vite/client" />

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.webp" {
  const value: string;
  export default value;
}

declare module "*.avif" {
  const value: string;
  export default value;
}
declare module "react-lazy-load-image-component" {
  import React from "react";

  export interface LazyLoadImageProps {
    src: string;
    alt?: string;
    effect?: "blur" | "opacity" | "black-and-white";
    className?: string;
    height?: string | number;
    width?: string | number;
    placeholderSrc?: string;
    visibleByDefault?: boolean;
    delayMethod?: "debounce" | "throttle";
    delayTime?: number;
    threshold?: number;
    scrollPosition?: { x: number; y: number };
    wrapperClassName?: string;
    afterLoad?: () => void;
    beforeLoad?: () => void;
    placeholder?: React.ReactNode;
  }

  export const LazyLoadImage: React.FC<LazyLoadImageProps>;
}
