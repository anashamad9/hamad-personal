import "@/app/globals.css"
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { i18n, type Locale } from "@/i18n-config"
import { getDictionary } from "@/lib/dictionaries"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex-sans-arabic",
  preload: true,
  fallback: ["Noto Sans Arabic", "Arial Unicode MS", "Tahoma", "sans-serif"],
})

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang)
  return {
    title: "Anas Hamad - AI & Machine Learning Engineer",
    description: "Portfolio of Anas Hamad, an AI & Machine Learning Engineer based in Amman, Jordan.",
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
  }
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <html
      lang={params.lang}
      dir={params.lang === "ar" ? "rtl" : "ltr"}
      className={`${inter.variable} ${ibmPlexSansArabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={params.lang === "ar" ? "font-arabic" : "font-sans"}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
