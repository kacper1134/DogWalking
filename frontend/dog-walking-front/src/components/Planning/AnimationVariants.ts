import { Variants } from "framer-motion";

export const backgroundVariants: Variants = {
  hoverStart: {
    scale: 1.2,
    transition: {
      duration: 1,
      type: "tween",
      ease: "easeIn",
    },
  },
  hoverEnd: {
    scale: 1,
    transition: {
      duration: 1,
      type: "tween",
      ease: "easeOut",
    },
  },
};

export const slideOverlayVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 0.4,
    transition: { duration: 1, type: "tween", ease: "easeIn" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 1, type: "tween", ease: "easeOut" },
  },
};