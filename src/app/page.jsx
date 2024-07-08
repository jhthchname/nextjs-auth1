"use client";

import Container from "./components/Container";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session && status === "loading") {
      return;
    }
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading")
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-4xl font-bold text-center">Loading...</p>
      </div>
    );

  return (
    <main>
      <Container></Container>
    </main>
  );
}
