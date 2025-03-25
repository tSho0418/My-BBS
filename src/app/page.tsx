"use client"; 

import { useRouter } from "next/navigation";
import FloatingBubblesBackground from "./components/Floating-bubbles";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import LoadingDots from "./components/loadings/Loading";

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
        <main className="flex min-h-screen flex-col items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-4">
            <LoadingDots />
            <p className="mt-4 text-sm font-medium text-black">読み込み中...</p>
          </div>
        </main>
      ):(
        <FloatingBubblesBackground/>
      )}
    </div>
  );
}

