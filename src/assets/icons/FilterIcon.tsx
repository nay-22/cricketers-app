import { FC } from "react";
import { IconProps } from "../../types";

const FilterIcon: FC<IconProps> = ({
  className,
  style,
  height = 30,
  width = 30,
}) => {
  return (
    <svg
      style={style}
      width={width}
      height={height}
      className={className}
      enableBackground="new 0 0 32 32"
      id="Editable-line"
      version="1.1"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="M3.241,7.646L13,19v9l6-4v-5l9.759-11.354C29.315,6.996,28.848,6,27.986,6H4.014C3.152,6,2.685,6.996,3.241,7.646z"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={2}
      />
    </svg>
  );
};

export default FilterIcon;
