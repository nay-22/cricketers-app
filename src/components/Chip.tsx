import { FC } from "react";
import { ChipProps } from "../types";

const Chip: FC<ChipProps> = ({ id, className, style, children }) => {
    return (
        <div className={`${className} rounded-full px-2 py-1`} id={id} style={{
            width: 'fit-content',
            ...style
        }}>
            {children}
        </div>
    )
}

export default Chip