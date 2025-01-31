import HomeButton from "@/components/homepage/home-button";
import HomeHeading from "@/components/homepage/home-heading";
import { DynaPuff } from "next/font/google";

const dynapuff = DynaPuff({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="h-screen">
      <a href="/lobbies"><HomeHeading className={dynapuff.className}></HomeHeading></a>
      <nav className="h-1/2 flex flex-col items-center justify-center">
        <HomeButton className={`${dynapuff.className}`}>Create Lobby!</HomeButton>
        <HomeButton className={`${dynapuff.className}`}>Join Lobby!</HomeButton>
      </nav>
    </main>
  );
}
