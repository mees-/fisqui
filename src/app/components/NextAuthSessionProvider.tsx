"use client"

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { PropsWithChildren } from "react"

export default function NextAuthSessionProvider({ children, session }: PropsWithChildren<{ session: Session | null }>) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
