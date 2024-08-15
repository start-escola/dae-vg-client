"use client";
import { useAcessibility } from "@/app/acessibility-provider";
import React from "react";

interface ITextProps {
  className?: string;
  children: React.ReactNode;
  as?: string;
  href?: string;
  target?: string;
  rel?: string;
  type?: string;
}

const Text = ({ className, children, as, ...rest }: ITextProps) => {
  const classes = className?.split(" ");

  const { modifier } = useAcessibility();
  const fontSizes = [
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
    "text-6xl",
    "text-7xl",
    "text-8xl",
    "text-9xl",
  ];

  const breakpoints = ["sm:", "md:", "lg:", "xl:", "2xl:"];

  const classNameResult = classes?.map((elem) => {
    let result = elem;

    if (fontSizes.includes(elem)) {
      const baseIndex = fontSizes.findIndex((font) => font === elem);

      const selectedFont = Math.max(
        0,
        Math.min(fontSizes.length - 1, baseIndex + modifier)
      );

      result = fontSizes[selectedFont];
    }

    let prefix = elem.slice(0, 3);

    if (breakpoints.includes(prefix) && fontSizes.includes(elem.slice(3))) {
      const baseIndex = fontSizes.findIndex((font) => font === elem.slice(3));

      const selectedFont = Math.max(
        0,
        Math.min(fontSizes.length - 1, baseIndex + modifier)
      );

      result = elem.slice(0, 3) + fontSizes[selectedFont];
    }

    return result;
  });

  const Component = as || "p";
  return React.createElement(
    Component,
    { className: classNameResult?.join(" "), ...rest },
    children
  );
};

export default Text;
