import { FC } from "react";
import { IconProps } from "../../types";

const SortUpIcon: FC<IconProps> = ({
  className,
  style,
  height = 30,
  width = 30,
}) => {
  return (
    <svg
      className={className}
      style={style}
      fill="none"
      height={height}
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 14L2 14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 10H2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6H2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 18H2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 14V4M19 4L22 7M19 4L16 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SortUpIcon;
