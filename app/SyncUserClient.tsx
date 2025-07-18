"use client";

import { useSyncUser } from "../app/hooks/useSyncUser";

export default function SyncUserClient() {
  useSyncUser();
  return null;
}
