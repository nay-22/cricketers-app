import { ThemeOptions } from "../types";

export const darkTheme: ThemeOptions = {
  background: {
    primary: "bg-dark-bg-primary",
    secondary: "bg-dark-bg-secondary",
    tertiary: "bg-dark-bg-tertiary",
    accent: "bg-amber-600",
  },
  text: {
    primary: "text-dark-text-primary",
    secondary: "text-dark-text-secondary",
    tertiary: "text-dark-text-tertiary",
    accent: "text-dark-text-accent",
  },
  border: {
    primary: "border-dark-text-primary",
    secondary: "border-dark-text-secondary",
    tertiary: "border-dark-text-tertiary",
    accent: "border-dark-text-accent",
  },
  error: {
    background: {
      primary: "bg-red-950",
    },
    text: {
      primary: "text-gray-400",
    },
  },
};

export const lightTheme: ThemeOptions = {
  background: {
    primary: "bg-light-bg-primary",
    secondary: "bg-light-bg-secondary",
    tertiary: "bg-light-bg-tertiary",
    accent: "bg-amber-400",
  },
  text: {
    primary: "text-light-text-primary",
    secondary: "text-light-text-secondary",
    tertiary: "text-light-text-tertiary",
    accent: "text-light-text-accent",
  },
  border: {
    primary: "border-light-text-primary",
    secondary: "border-light-text-secondary",
    tertiary: "border-light-text-tertiary",
    accent: "border-light-text-accent",
  },
  error: {
    background: {
      primary: "bg-red-300",
    },
    text: {
      primary: "text-gray-800",
    },
  },
};
