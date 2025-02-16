import { FC } from "react";
import useTheme from "../hooks/useTheme";
import { LoaderProps } from "../types";

const Loader: FC<LoaderProps> = ({ type = "component" }) => {
  const theme = useTheme();

  return (
    <div
      className={`bg-transparent ${
        theme.text?.primary
      } flex items-center justify-center p-4 ${
        type === "page" ? "h-screen" : "h-full"
      } ${type === "page" ? "w-screen" : "w-full"}`}
    >
      Loading...
    </div>
  );
};

export default Loader;
