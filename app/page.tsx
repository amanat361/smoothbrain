'use client'

import HomeButton from "@/components/homepage/home-button";
import HomeHeading from "@/components/homepage/home-heading";
import { Button } from "@/components/catalyst/button";
import { Field, Label } from "@/components/catalyst/fieldset";
import { Input } from "@/components/catalyst/input";
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from "@/components/catalyst/dialog";
import { DynaPuff } from "next/font/google";
import { useState } from "react";

const dynapuff = DynaPuff({ subsets: ['latin'] });

export default function Home() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <main className={`h-screen ${dynapuff.className}`}>
      <a href="/lobbies"><HomeHeading></HomeHeading></a>
      <nav className="h-1/2 flex flex-col items-center justify-center">
        <HomeButton onClick={() => setIsOpen(true)}>Create Lobby!</HomeButton>
        <HomeButton onClick={() => setIsOpen(true)}>Join Lobby!</HomeButton>
      </nav>
      <Dialog className={`${dynapuff.className}`} open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Pick a unique name</DialogTitle>
        <DialogBody>
          <Field>
            <Label>Name:</Label>
            <Input name="username" />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          {/* Add username validation (not too long, not taken) */}
          <Button onClick={() => setIsOpen(false)} href="/lobbies">Choose Name</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
