"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import type { Locale } from "@/i18n-config"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

export default function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathName = usePathname()

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/"
    const segments = pathName.split("/")
    segments[1] = locale
    return segments.join("/")
  }

  const otherLocale = lang === "en" ? "ar" : "en"

  return (
    <Link href={redirectedPathName(otherLocale)} className="flex items-center">
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Languages className="h-4 w-4" />
        <span className="sr-only">Change language</span>
      </Button>
    </Link>
  )
}
