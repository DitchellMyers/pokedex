import { MainNav } from "@/src/components/main-nav"
import { cn } from "@/src/lib/utils"

import "@/src/styles/globals.css"
import { Inter } from "next/font/google"
import { Footer } from "@/src/components/main-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Another Pokedex",
  description: "Another Pokedex",
}

async function getData() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data: PokemonSearchResponse = await getData()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-gray-950 font-sans antialiased", inter.className)}>
        <div className={"container mx-auto min-h-screen"}>
          <div className="flex flex-col space-y-20">
            <MainNav searchables={data} />
            <main>{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
