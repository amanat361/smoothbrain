import HomeHeading from "@/components/homepage/home-heading";
import { DynaPuff } from "next/font/google";

const dynapuff = DynaPuff({ subsets: ['latin'] });

export default function Lobby() {
  return (
    <main className="h-screen">
      <a href="/lobbies"><HomeHeading className={dynapuff.className}></HomeHeading></a>
      <nav className="h-1/2 flex flex-col items-center justify-center">
      </nav>
    </main>
  );
}
