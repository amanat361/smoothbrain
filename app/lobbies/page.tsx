import { Heading } from "@/components/catalyst/heading";
import Lobby from "@/components/lobbies-list/lobby";
import Search from "@/components/lobbies-list/search";
import { DynaPuff } from "next/font/google";

const dynapuff = DynaPuff({ subsets: ['latin'] })

export default function LobbyList() {
    return (
        <main className={`w-full ${dynapuff.className}`}>
            <header className="fixed flex items-center justify-between pl-10 pr-10 h-20 w-full bg-gray-300">
                <Heading className="!text-4xl">Lobby List</Heading>
                <Search></Search>
            </header>
            <ul className="flex flex-col gap-4 pt-25">
                <li className="flex justify-center"><Lobby capacity="9/10" code="JFO12DA8">Meloncab's Lobby</Lobby></li>
                <li className="flex justify-center"><Lobby capacity="4/10" code="XDOC109N">Another Person's Lobby</Lobby></li>
                <li className="flex justify-center"><Lobby capacity="9/10" code="JFO12DA8">Meloncab's Lobby</Lobby></li>
                <li className="flex justify-center"><Lobby capacity="4/10" code="XDOC109N">Another Person's Lobby</Lobby></li>
                <li className="flex justify-center"><Lobby capacity="9/10" code="JFO12DA8">Meloncab's Lobby</Lobby></li>
                <li className="flex justify-center"><Lobby capacity="4/10" code="XDOC109N">Another Person's Lobby</Lobby></li>
                <li className="flex justify-center"><Lobby capacity="9/10" code="JFO12DA8">Meloncab's Lobby</Lobby></li>
                <li className="flex justify-center"><Lobby capacity="4/10" code="XDOC109N">Another Person's Lobby</Lobby></li>

            </ul>
        </main>
    );
}