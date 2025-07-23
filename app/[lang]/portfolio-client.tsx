"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import type { Locale } from "@/i18n-config"
import LanguageSwitcher from "@/components/language-switcher"
import type { getDictionary } from "@/lib/dictionaries"
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  BadgeIcon as IdCard,
  Mail,
  Twitter,
  Trophy,
  BookOpen,
  ChevronDown,
  Linkedin,
  Bot,
  Phone,
} from "lucide-react"
import ContactModal from "@/components/contact-modal" // Import ContactModal

type Dictionary = Awaited<ReturnType<typeof getDictionary>>

export default function PortfolioClient({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="flex flex-col items-center bg-background min-h-screen font-sans">
      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center gap-1 p-1 bg-background/60 backdrop-blur-xl border border-border/30 shadow-none px-0 py-0 rounded-xl">
          <LanguageSwitcher lang={lang} />
          <Link href={`/${lang}/articles`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <BookOpen className="h-4 w-4" />
              <span className="sr-only">{dict.nav.articles}</span>
            </Button>
          </Link>
          <Link href={`/${lang}/card`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <IdCard className="h-4 w-4" />
              <span className="sr-only">{dict.nav.card}</span>
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
      <div className="w-full min-h-screen bg-background px-4 sm:px-6 md:px-8 py-6 sm:py-8 pt-16">
        <Card className="border-none bg-transparent mb-8 sm:mb-16 w-full max-w-[500px] mx-auto shadow-none">
          <CardContent className="flex flex-col gap-8 sm:gap-12 p-0 sm:p-4">
            <Header isLoaded={isLoaded} dict={dict} />
            <Description isLoaded={isLoaded} dict={dict} />
            <CTAButtons
              isLoaded={isLoaded}
              showModal={showContactModal}
              setShowModal={setShowContactModal}
              dict={dict}
            />
            <Experience isLoaded={isLoaded} experiences={dict.experiences} />
            <Education isLoaded={isLoaded} education={dict.education} />
            <CoreTechStack isLoaded={isLoaded} coreStack={coreStack} dict={dict} />
            <Achievements isLoaded={isLoaded} achievements={dict.achievements} />
            <Certifications isLoaded={isLoaded} certifications={dict.certifications} />
            <Projects isLoaded={isLoaded} projects={dict.projects} />
            <Articles isLoaded={isLoaded} articles={dict.articles} lang={lang} dict={dict} />
            <SocialLinks isLoaded={isLoaded} links={dict.socialLinks} dict={dict} />
          </CardContent>
        </Card>
      </div>

      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} lang={lang} />
    </main>
  )
}

// Dummy data for CoreTechStack as it's not in the dictionary
const coreStack = [
  {
    category: "Coding",
    items: [
      { name: "Python" },
      { name: "TensorFlow" },
      { name: "PyTorch" },
      { name: "SQL" },
      { name: "ScikitLearn" },
      { name: "Keras" },
      { name: "NumPy" },
      { name: "Pandas" },
    ],
  },
  {
    category: "Tools",
    items: [{ name: "Tableau" }, { name: "PowerBI" }, { name: "Excel" }, { name: "Jupyter" }],
  },
  {
    category: "Deployment",
    items: [{ name: "GitHub" }, { name: "AWS" }, { name: "Hugging Face" }, { name: "Oracle" }],
  },
]

function Header({ isLoaded, dict }: { isLoaded: boolean; dict: Dictionary }) {
  return (
    <header
      className={`flex items-center gap-4 transition-all duration-500 ease-out ${
        isLoaded ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[4px] translate-y-2"
      }`}
      style={{ transitionDelay: "100ms" }}
    >
      <div className="flex-shrink-0">
        <Image
          src="/images/profile.jpeg"
          alt={dict.header.name}
          width={80}
          height={80}
          className="rounded-full border-2 border-border"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">{dict.header.name}</h1>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-muted-foreground">{dict.header.role}</p>
          <span className="text-xs text-muted-foreground/70 font-extralight">• {dict.header.location}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {dict.topTechStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-md border hover:bg-secondary/80 hover:scale-105 transition-all duration-200 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}

function Description({ isLoaded, dict }: { isLoaded: boolean; dict: Dictionary }) {
  return (
    <div
      className={`flex flex-col gap-4 sm:gap-6 transition-all duration-500 ease-out ${
        isLoaded ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[4px] translate-y-2"
      }`}
      style={{ transitionDelay: "200ms" }}
    >
      <div className="flex flex-col gap-4 sm:gap-5">
        {dict.description.map((paragraph, index) => (
          <p key={index} className="text-sm text-foreground">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}

function CTAButtons({
  isLoaded,
  setShowModal,
  dict,
}: {
  isLoaded: boolean
  showModal: boolean
  setShowModal: (show: boolean) => void
  dict: Dictionary
}) {
  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-2.5 transition-all duration-500 ease-out ${
        isLoaded ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[4px] translate-y-2"
      }`}
      style={{ transitionDelay: "300ms" }}
    >
      <Button
        variant="default"
        onClick={() => setShowModal(true)}
        className="w-full sm:w-auto inline-flex h-[34px] items-center justify-center gap-2.5 ps-4 pe-3 py-0 bg-primary rounded-[99px] hover:bg-primary/90 text-primary-foreground"
      >
        <span className="font-medium text-[13px] leading-5 text-primary-foreground">{dict.cta.contact}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className="text-primary-foreground"
        >
          <title>chevron-right</title>
          <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="currentColor">
            <polyline points="4.25 10.25 8.5 6 4.25 1.75"></polyline>
          </g>
        </svg>
      </Button>
      <Button variant="outline" className="w-full sm:w-auto rounded-[99px] h-[34px] bg-transparent">
        <span className="text-[13px] leading-5">{dict.cta.resume}</span>
      </Button>
    </div>
  )
}

function Experience({ isLoaded, experiences }: { isLoaded: boolean; experiences: Dictionary["experiences"] }) {
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set())

  const toggleJobExpansion = (jobKey: string) => {
    const newExpanded = new Set(expandedJobs)
    if (newExpanded.has(jobKey)) {
      newExpanded.delete(jobKey)
    } else {
      newExpanded.add(jobKey)
    }
    setExpandedJobs(newExpanded)
  }

  return (
    <div
      className={`flex flex-col gap-4 transition-all duration-500 ease-out ${
        isLoaded ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[4px] translate-y-2"
      }`}
      style={{ transitionDelay: "400ms" }}
    >
      <h2 className="text-sm text-muted-foreground uppercase">EXPERIENCE</h2>
      <div className="flex flex-col gap-4">
        {experiences.map((exp) => {
          const jobKey = exp.role + exp.company
          const isExpanded = expandedJobs.has(jobKey)
          const shouldTruncate = exp.description.length > 120
          const displayDescription =
            shouldTruncate && !isExpanded ? exp.description.substring(0, 120) + "..." : exp.description

          return (
            <div key={jobKey} className="flex flex-col gap-y-[-2]">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-medium text-foreground">{exp.role}</span>
                  <span className="text-xs text-muted-foreground">(@{exp.company})</span>
                </div>
                <span className="text-sm text-muted-foreground">{exp.period}</span>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">{displayDescription}</p>
                {shouldTruncate && (
                  <div className="flex justify-center">
                    <button
                      onClick={() => toggleJobExpansion(jobKey)}
                      className="p-1 hover:bg-secondary/50 rounded transition-colors"
                    >
                      <ChevronDown
                        className={`h-3 w-3 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Education({ isLoaded, education }: { isLoaded: boolean; education: Dictionary["education"] }) {
  return (
    <div
      className={`flex flex-col gap-6 transition-all duration-500 ease-out ${
        isLoaded ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[4px] translate-y-2"
      }`}
      style={{ transitionDelay: "500ms" }}
    >
      <h2 className="text-sm text-muted-foreground uppercase">EDUCATION</h2>
      <div className="flex flex-col gap-6">
        {education.map((edu) => (
          <div key={edu.institution} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-foreground">{edu.institution}</span>
              <span className="text-sm text-muted-foreground">{edu.period}</span>
            </div>
            <p className="text-sm font-medium text-foreground/80">{edu.degree}</p>
            <p className="text-sm text-muted-foreground">{edu.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

import React from "react"

function CoreTechStack({
  isLoaded,
  coreStack,
  dict,
}: {
  isLoaded: boolean
  coreStack: typeof coreStack
  dict: Dictionary
}) {
  return (
    <div
      className={`flex flex-col gap-6 transition-all duration-500 ease-out ${
        isLoaded ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[4px] translate-y-2"
      }`}
      style={{ transitionDelay: "550ms" }}
    >
      <h2 className="text-sm text-muted-foreground uppercase">{dict.sections.tech_stack}</h2>
      <div className="space-y-4">
        {coreStack.map((category) => (
          <div key={category.category} className="group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {category.category}
              </span>
            </div>
            <div className="ps-5 border-s border-border/50">
              <div className="flex flex-wrap">
                {category.items.map((item, index) => (
                  <React.Fragment key={item.name}>
                    <span className="text-xs text-foreground/80 hover:text-foreground transition-colors cursor-default">
                      {item.name}
                    </span>
                    {index < category.items.length - 1 && (
                      <span className="text-xs text-muted-foreground mx-1.5">-</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Achievements({ isLoaded, achievements }: { isLoaded: boolean; achievements: Dictionary["achievements"] }) {
  return (
    <div
      className={`flex flex-col gap-6 transition-all duration-500 ease-out ${
        isLoaded ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[4px] translate-y-2"
      }`}
      style={{ transitionDelay: "600ms" }}
    >
      <h2 className="text-sm text-muted-foreground uppercase">ACHIEVEMENTS</h2>
      <div className="flex flex-col gap-6">
        {achievements.map((achievement) => (
          <div key={achievement.title} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-foreground">{achievement.title}</span>
              <span className="text-sm text-muted-foreground">{achievement.period}</span>
            </div>
            <p className="text-sm font-medium text-foreground/80">{achievement.issuer}</p>
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Certifications({
  isLoaded,
  certifications,
}: {
  isLoaded: boolean
  certifications: Dictionary["certifications"]
}) {
  return (
    <div
      className={`flex flex-col gap-6 transition-all duration-500 ease-out ${
        isLoaded ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[4px] translate-y-2"
      }`}
      style={{ transitionDelay: "650ms" }}
    >
      <h2 className="text-sm text-muted-foreground uppercase">CERTIFICATIONS & COURSES</h2>
      <div className="flex flex-col gap-6">
        {certifications.map((cert) => (
          <div key={cert.title} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-foreground">{cert.title}</span>
              <span className="text-sm text-muted-foreground">{cert.period}</span>
            </div>
            <p className="text-sm font-medium text-foreground/80">{cert.issuer}</p>
            <p className="text-sm text-muted-foreground">{cert.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Projects({ isLoaded, projects }: { isLoaded: boolean; projects: Dictionary["projects"] }) {
  return (
    <div
      className={`flex flex-col gap-6 transition-all duration-500 ease-out ${
        isLoaded ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[4px] translate-y-2"
      }`}
      style={{ transitionDelay: "700ms" }}
    >
      <h2 className="text-sm text-muted-foreground uppercase">PROJECTS</h2>
      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <div key={project.title} className="flex flex-col gap-3 p-4 border border-border rounded-lg bg-card">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-foreground">{project.title}</h3>
                <span className="text-xs text-muted-foreground">{project.period}</span>
              </div>
              <div className="flex gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{project.description}</p>
            {/* safely handle undefined tech array */}
            {!!project.tech?.length && (
              <div className="flex flex-wrap gap-1">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-md border hover:bg-secondary/80 hover:scale-105 transition-all duration-200 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function Articles({
  isLoaded,
  articles,
  lang,
  dict,
}: { isLoaded: boolean; articles: Dictionary["articles"]; lang: Locale; dict: Dictionary }) {
  // Filter only enabled articles
  const enabledArticles = articles.filter((article) => article.enabled)

  return (
    <div
      className={`flex flex-col gap-6 transition-all duration-500 ease-out ${
        isLoaded ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[4px] translate-y-2"
      }`}
      style={{ transitionDelay: "750ms" }}
    >
      <h2 className="text-sm text-muted-foreground uppercase">{dict.sections.articles}</h2>
      <div className="flex flex-col gap-6">
        {enabledArticles.slice(0, 5).map((article) => (
          <div
            key={article.id}
            className="flex flex-col gap-3 py-4 hover:bg-secondary/20 transition-colors cursor-pointer rounded-lg px-2"
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-foreground">{article.topic}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
              <Link
                href={`/${lang}/articles`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              {article.content ? article.content.substring(0, 120) + "..." : "Click to read more..."}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SocialLinks({
  isLoaded,
  links,
  dict,
}: { isLoaded: boolean; links: Dictionary["socialLinks"]; dict: Dictionary }) {
  const getIcon = (label: string) => {
    switch (label) {
      case "Email":
      case "البريد الإلكتروني":
        return <Mail className="h-4 w-4" />
      case "Phone":
      case "الهاتف":
        return <Phone className="h-4 w-4" />
      case "X":
        return <Twitter className="h-4 w-4" />
      case "LinkedIn":
      case "لينكد إن":
        return <Linkedin className="h-4 w-4" />
      case "GitHub":
        return <Github className="h-4 w-4" />
      case "Hugging Face":
        return <Bot className="h-4 w-4" />
      case "Kaggle":
        return <Trophy className="h-4 w-4" />
      default:
        return <ArrowUpRight className="h-4 w-4" />
    }
  }

  return (
    <div
      className={`flex flex-col gap-6 transition-all duration-500 ease-out ${
        isLoaded ? "opacity-100 blur-none translate-y-0" : "opacity-0 blur-[4px] translate-y-2"
      }`}
      style={{ transitionDelay: "800ms" }}
    >
      <h2 className="text-sm text-muted-foreground uppercase">{dict.sections.social}</h2>
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <div key={link.label} className="group">
            <a
              href={link.href}
              className="w-full text-sm text-foreground hover:text-muted-foreground transition-colors flex items-center justify-between p-2 rounded-lg hover:bg-accent/10 group"
              rel="noopener noreferrer"
              target={
                link.label === "Email" ||
                link.label === "البريد الإلكتروني" ||
                link.label === "Phone" ||
                link.label === "الهاتف"
                  ? "_self"
                  : "_blank"
              }
            >
              <div className="flex items-center gap-2">
                {getIcon(link.label)}
                <span>{link.display || link.username || link.label}</span>
              </div>
              <div className="flex-1 mx-4 border-b border-dotted border-muted-foreground/30"></div>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
