"use client"; 

import { useRouter } from "next/navigation";
import FloatingBubblesBackground from "./components/Floating-bubbles";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  async function Enter() {
    const response = await fetch("/api/BBS-posts", {
      method: "GET",
    });

    if (response.ok) {
      router.push("/BBS-posts");
    } else {
      console.error("Failed to fetch");
    }
  }

  useEffect(() => {
    if (session) {
      Enter();
    }
  }, [session]);

  return (
    <div>
      {session ? (
        <p>Loading...</p>
      ):(
        <FloatingBubblesBackground/>
      )}
    </div>
  );
}

