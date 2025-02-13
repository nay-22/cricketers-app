import { CSSProperties, FC, ReactNode } from "react";

export type ChipProps = {
    id?: string;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode | string;
}
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