"use client"

import { signIn } from "next-auth/react"

export const SignInButton = () => <button onClick={() => signIn()}>Login</button>
