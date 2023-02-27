"use client";
import { SessionProvider as InternalSessionProvider } from "next-auth/react";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <InternalSessionProvider>{children}</InternalSessionProvider>;
}
