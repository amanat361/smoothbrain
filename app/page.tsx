import { Button } from "@/components/catalyst/button";
import { Heading } from "@/components/catalyst/heading";

export default function Home() {
  return (
    <main className="h-screen">
      <header className="h-1/5 flex justify-center items-center">
        <Heading className="">Smoothbrain</Heading>
      </header>
      <nav className="h-4/5 flex flex-col items-center justify-center">
        <Button className="">Create Lobby!</Button>
        <Button className="">Join Lobby!</Button>
      </nav>
    </main>
  );
}
