import { FC, ReactNode } from "react";

export type SwitchProps = { on: boolean, onClick: () => void, icon?: ReactNode };

const Switch: FC<SwitchProps> = ({ on, onClick, icon }) => {
    return (
        <div onClick={onClick} className="bg-slate-400 rounded-full w-8">
            <div className={`bg-slate-600 h-4 rounded-full w-4 transition-all 0.4s ${on ? "translate-x-4" : ""}`}>
                {icon}
            </div>
        </div>
    )
}

export default Switch