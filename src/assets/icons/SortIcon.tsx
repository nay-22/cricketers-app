import { FC } from "react";
import { IconProps } from "../../types";

const SortIcon: FC<IconProps> = ({
  className,
  style,
  height = 30,
  width = 30,
}) => {
  return (
    <svg
      className={className}
      style={style}
      height={height}
      width={width}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.29,14.29,12,18.59l-4.29-4.3a1,1,0,0,0-1.42,1.42l5,5a1,1,0,0,0,1.42,0l5-5a1,1,0,0,0-1.42-1.42ZM7.71,9.71,12,5.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42l-5-5a1,1,0,0,0-1.42,0l-5,5A1,1,0,0,0,7.71,9.71Z" />
    </svg>
  );
};

export default SortIcon;
