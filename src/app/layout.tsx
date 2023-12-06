import "~/styles/globals.css"

import { IBM_Plex_Mono } from "next/font/google"
import { cookies } from "next/headers"

import { TRPCReactProvider } from "~/trpc/react"
import { Metadata } from "next"

const font = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Fisqui",
  description: "",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='1.1em' font-size='80'>💸</text></svg>",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`font-sans ${font.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>{children}</TRPCReactProvider>
      </body>
    </html>
  )
}
