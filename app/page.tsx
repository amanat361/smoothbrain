import HomeButton from "@/components/homepage/home-button";
import HomeHeading from "@/components/homepage/home-heading";
import { DynaPuff } from "next/font/google";

const dynapuff = DynaPuff({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`h-screen ${dynapuff.className}`}>
      <a href="/lobbies"><HomeHeading></HomeHeading></a>
      <nav className="h-1/2 flex flex-col items-center justify-center">
        <HomeButton>Create Lobby!</HomeButton>
        <HomeButton>Join Lobby!</HomeButton>
      </nav>
    </main>
  );
}
