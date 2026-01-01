import type React from "react"
import type { Metadata } from "next"
import { Geist, Orbitron } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" })

export const metadata: Metadata = {
  title: "Surreal Infinity – ECLIPSEpunk Codex v2.0",
  description: "Hybridní artefakt, Mystic Manual, Signál po Zatmění. Projekt Jacoba Surreala.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs" className={`${geist.variable} ${orbitron.variable} dark`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
