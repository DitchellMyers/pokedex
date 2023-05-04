"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Logo from "@/public/images/pokemon.png"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command"
import { BsGithub, BsTwitter } from "react-icons/bs"

interface MainNavProps {
  searchables: PokemonSearchResponse
}

export function MainNav({ searchables }: MainNavProps) {
  const { count, results } = searchables
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const getPokemon = useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <header className="container fixed m-5 mx-auto h-8 w-full">
      <nav className="flex w-full justify-between">
        <Link href={"/"} className="relative aspect-square h-8">
          <Image
            alt="Logo"
            src={Logo}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </Link>
        <div className="flex flex-row items-center justify-center gap-x-4">
          <Link href={"https://github.com/DitchellMyers"} target="_blank">
            <BsGithub className="h-8 w-8" />
          </Link>
          <Link href={"https://github.com/DitchellMyers"} target="_blank">
            <BsTwitter className="h-8 w-8" />
          </Link>
          <button
            className="text-muted-foreground relative h-9 w-full justify-start rounded-[0.5rem] border border-white px-4 py-2 text-sm sm:pr-12 md:w-40 lg:w-64"
            onClick={() => setOpen(true)}
          >
            <span className="hidden lg:inline-flex">Search Pokemon...</span>
            <span className="inline-flex lg:hidden">Search...</span>
            <kbd className="bg-muted pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput id="search" placeholder="Search Pokemon ..." />
            <CommandList>
              <CommandGroup heading="Pokemon">
                {results.map((p, index) => (
                  <CommandItem
                    key={index}
                    className={"capitalize aria-selected:bg-red-500"}
                    onSelect={() => {
                      getPokemon(() => router.push(`/pokemon/${p.name}`))
                    }}
                  >
                    {p.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>
      </nav>
    </header>
  )
}
