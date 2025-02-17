import { ReactNode } from "react";

interface LobbyProps {
    children?: ReactNode;
    capacity: string;
    code: string;
}

export default function Lobby({ children, capacity, code }: LobbyProps) {
    return (
        <div className="flex justify-between items-center text-sm md:text-xl w-9/10 h-20 px-6 bg-gray-300 rounded-full">
            <div className="inline-block">
                <span className="font-bold">{children} </span>
                <span>({capacity})</span>
            </div>
            <span>code: {code}</span>
        </div>
    );
}