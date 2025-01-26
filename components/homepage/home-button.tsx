import { ReactNode } from "react";
import { Button } from "@/components/catalyst/button";

interface HomeHeadingProps {
    className?: string;
    children?: ReactNode;
}

export default function HomeButton({ className, children }: HomeHeadingProps) {
    return (
        <Button className={`w-60 h-16 !text-xl md:w-80 md:h-20 md:!text-2xl m-1 ${className}`}>{children}</Button>
    );
}