// src/app/chat/page.tsx
import { UserProvider } from "@/contexts/UserContext";
import { UserSetup } from "./components/UserSetup";
import { ChatContainer } from "./components/ChatContainer";
import { getLobbies } from "./actions";

export default async function ChatPage() {
  const lobbies = await getLobbies();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <UserProvider>
        <UserSetup>
          <ChatContainer initialLobbies={lobbies} />
        </UserSetup>
      </UserProvider>
    </div>
  );
}