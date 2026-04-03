"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-base font-semibold tracking-tight">
          공지사항
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
