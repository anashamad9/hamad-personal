"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import LanguageSwitcher from "@/components/language-switcher"
import Link from "next/link"
import { useState, useEffect } from "react"
import type { Locale } from "@/i18n-config"
import type { getDictionary } from "@/lib/dictionaries"

type Dictionary = Awaited<ReturnType<typeof getDictionary>>

export default function ArticlesClient({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Filter only enabled articles
  const articles = dict.articles.filter((article) => article.enabled)

  const formatContent = (content: string) => {
    return content
      .split("\n")
      .map((paragraph, index) => {
        if (paragraph.trim() === "") return null

        if (paragraph.startsWith("##")) {
          return (
            <h3 key={index} className="text-lg font-semibold text-foreground mt-6 mb-3">
              {paragraph.replace("##", "").trim()}
            </h3>
          )
        }

        if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
          return (
            <h4 key={index} className="text-sm font-medium text-foreground mt-4 mb-2">
              {paragraph.replace(/\*\*/g, "")}
            </h4>
          )
        }

        return (
          <p key={index} className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {paragraph.trim()}
          </p>
        )
      })
      .filter(Boolean)
  }

  if (selectedArticle !== null) {
    const article = articles.find((a) => a.id === selectedArticle)
    if (!article) return null

    return (
      <main className="flex flex-col items-center bg-background min-h-screen font-sans">
        <div className="fixed top-4 left-4 z-50">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedArticle(null)}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Articles</span>
          </Button>
        </div>

        <div className="fixed top-4 right-4 z-50">
          <div className="flex items-center gap-1 p-1 bg-background/60 backdrop-blur-xl border border-border/30 shadow-none px-0 py-0 rounded-xl">
            <LanguageSwitcher lang={lang} />
            <ThemeToggle />
          </div>
        </div>

        <div className="w-full min-h-screen bg-background px-4 sm:px-6 md:px-8 py-6 sm:py-8 pt-16">
          <Card className="border-none bg-transparent mb-8 sm:mb-16 w-full max-w-[700px] mx-auto shadow-none">
            <CardContent className="flex flex-col gap-6 p-0 sm:p-4">
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">{article.topic}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="prose prose-sm max-w-none">{formatContent(article.content || "")}</div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center bg-background min-h-screen font-sans">
      <div className="fixed top-4 left-4 z-50">
        <Link href={`/${lang}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Portfolio</span>
          </Button>
        </Link>
      </div>

      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center gap-1 p-1 bg-background/60 backdrop-blur-xl border border-border/30 shadow-none px-0 py-0 rounded-xl">
          <LanguageSwitcher lang={lang} />
          <ThemeToggle />
        </div>
      </div>

      <div
        className={`w-full min-h-screen bg-background px-4 sm:px-6 md:px-8 py-6 sm:py-8 pt-16 transition-all duration-700 ease-out ${
          isLoaded ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[4px] translate-y-4"
        }`}
      >
        <Card className="border-none bg-transparent mb-8 sm:mb-16 w-full max-w-[600px] mx-auto shadow-none">
          <CardContent className="flex flex-col gap-8 sm:gap-12 p-0 sm:p-4">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{dict.nav.articles}</h1>
              <p className="text-sm text-muted-foreground">
                {lang === "ar"
                  ? "أفكار حول التصميم والتكنولوجيا وتقاطع التجربة الإنسانية مع المنتجات الرقمية."
                  : "Thoughts on design, technology, and the intersection of human experience with digital products."}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {articles.map((article, index) => (
                <div
                  key={article.id}
                  className="py-4 hover:bg-secondary/20 transition-colors cursor-pointer rounded-lg px-2"
                  onClick={() => setSelectedArticle(article.id)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.5s ease-out",
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                      {article.topic}
                    </h2>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
