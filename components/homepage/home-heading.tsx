import Image from "next/image";
import brain from "@/assets/brain.png";

interface HomeHeadingProps {
    className?: string;
}

export default function HomeHeading({ className }: HomeHeadingProps) {
    return (
        <header className="h-1/2 flex justify-center items-center">
            <h1 className={`max-[335px]:text-4xl text-5xl md:text-8xl ${className}`}>
                Smoothbr
                <Image
                    src={brain}
                    alt="Picture of a brain sillouette for 'a'"
                    className="inline w-[3rem] h-[3rem] md:w-[4.25rem] md:h-[4.25rem]"
                />
                in
            </h1>
        </header>
    );
}