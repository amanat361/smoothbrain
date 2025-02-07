// src/contexts/UserContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  userId: string;
  displayName: string;
  isSetup: boolean;
  setDisplayName: (name: string) => void;
  signOut: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [isSetup, setIsSetup] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId") || crypto.randomUUID();
    const storedName = localStorage.getItem("displayName") || "";

    setUserId(storedUserId);
    setDisplayName(storedName);
    setIsSetup(!!storedName);

    localStorage.setItem("userId", storedUserId);
  }, []);

  const updateDisplayName = (name: string) => {
    const finalName = name.trim() || "Anonymous";
    setDisplayName(finalName);
    localStorage.setItem("displayName", finalName);
    setIsSetup(true);
  };

  const signOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("displayName");
    window.location.reload();
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        displayName,
        isSetup,
        setDisplayName: updateDisplayName,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
