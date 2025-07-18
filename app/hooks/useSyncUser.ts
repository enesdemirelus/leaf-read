"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export function useSyncUser() {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    fetch("/api/sync-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
        image: user.imageUrl,
      }),
    });
  }, [user]);
}
