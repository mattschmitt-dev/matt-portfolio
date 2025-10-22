import React from "react";

declare module "framer-motion" {
  type PrimitiveMotionValue = number | string | number[] | string[];
  type NestedMotionValue = {
    [key: string]: PrimitiveMotionValue | NestedMotionValue;
  };
  type MotionValue = PrimitiveMotionValue | NestedMotionValue;

  interface TransitionProps {
    duration?: number;
    delay?: number;
    ease?: string | number[];
    repeat?: number;
    repeatType?: string;
    repeatDelay?: number;
    type?: string;
    stiffness?: number;
    damping?: number;
    mass?: number;
    velocity?: number;
    times?: number[];
    delayChildren?: number;
    staggerChildren?: number;
    when?: string | boolean;
    bounce?: number;
  }

  interface MotionProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    animate?: any;
    initial?: string | Record<string, MotionValue>;
    exit?: string | Record<string, MotionValue>;
    transition?: TransitionProps;
    title?: string;
    type?: string;
    // variants?: {
    //   [key: string]: {
    //     [key: string]: MotionValue | TransitionProps;
    //   };
    // };
    variants?: any;
    onSubmit?: (e: any) => void;
    onClick?: (e: any) => void;
  }
}