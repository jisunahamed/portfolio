import type { MotionProps, Transition } from "framer-motion";

const baseTransition: Transition = {
  duration: 0.35,
  ease: "easeOut",
};

type InViewOptions = {
  amount?: number;
  delay?: number;
};

export const fadeInView = (options: InViewOptions = {}): MotionProps => {
  const { amount = 0.15, delay = 0 } = options;
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount },
    transition: { ...baseTransition, delay },
  };
};

export const fadeInUpView = (options: InViewOptions = {}): MotionProps => {
  const { amount = 0.15, delay = 0 } = options;
  return {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: { ...baseTransition, delay },
  };
};
