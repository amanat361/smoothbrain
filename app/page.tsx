'use client'

import Button from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <header>
        <h1 className="">Smoothbrain</h1>
      </header>
      <nav>
        <ul>
          <li>
            <Button className="block" onClick={() => alert("Created a lobby!")}>Create Lobby</Button>
          </li>
          <li>
            <Button className="block" onClick={() => alert("Joined a lobby!")}>Join Lobby</Button>
          </li>
        </ul>
      </nav>
    </main>
  );
}
