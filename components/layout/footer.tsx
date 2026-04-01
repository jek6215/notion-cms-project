import Link from "next/link"
import { Separator } from "@/components/ui/separator"

const footerLinks = [
  { href: "https://nextjs.org", label: "Next.js" },
  { href: "https://react.dev", label: "React" },
  { href: "https://tailwindcss.com", label: "Tailwind CSS" },
  { href: "https://ui.shadcn.com", label: "shadcn/ui" },
]

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm font-semibold tracking-tight">Next JS Starter</p>
          <nav className="flex flex-wrap items-center justify-center gap-4">
            {footerLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <Separator className="my-6" />
        <p className="text-center text-xs text-muted-foreground">
          Built with Next.js · React · Tailwind CSS · shadcn/ui
        </p>
      </div>
    </footer>
  )
}
