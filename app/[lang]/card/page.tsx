"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HomeIcon, Mail, Phone, MapPin, QrCode, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import type { Locale } from "@/types/locale" // Declare Locale type

export default function BusinessCard({ params: { lang } }: { params: { lang: Locale } }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [showQR, setShowQR] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://yoursite.com/${lang}/card`

  const handleCardClick = () => {
    if (!showQR) {
      setShowDetails(!showDetails)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center bg-background min-h-screen font-sans p-4">
      <div className="fixed top-4 left-4 z-50">
        <Link href={`/${lang}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <HomeIcon className="h-4 w-4" />
            <span className="sr-only">Back to Portfolio</span>
          </Button>
        </Link>
      </div>

      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div
        className={`transition-all duration-700 ease-out ${
          isLoaded ? "opacity-100 blur-none translate-y-0 scale-100" : "opacity-0 blur-[4px] translate-y-4 scale-95"
        }`}
      >
        <Card
          className="w-[400px] h-[550px] overflow-hidden relative border-0 rounded-3xl cursor-pointer"
          onClick={handleCardClick}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/card-background.jpeg"
              alt="Anas Hamad"
              fill
              className={`object-cover transition-all duration-500 ${showDetails ? "blur-md scale-110" : ""}`}
              priority
            />
          </div>

          {/* Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t transition-all duration-500 ${
              showDetails ? "from-black/90 via-black/70 to-black/50" : "from-black/30 via-transparent to-transparent"
            }`}
          />

          {/* QR Code Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowQR(!showQR)
            }}
            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center transition-colors z-20"
          >
            <QrCode className="w-4 h-4 text-white" />
          </button>

          {/* QR Code Modal */}
          {showQR && (
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-xl p-6 shadow-xl border border-white/20">
                <div className="w-40 h-40 mx-auto">
                  <Image
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`}
                    alt="QR Code"
                    width={160}
                    height={160}
                    className="w-full h-full"
                  />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowQR(false)
                  }}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
          )}

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
            <div
              className={`absolute bottom-0 left-0 right-0 h-40 backdrop-blur-sm bg-gradient-to-t from-black/50 via-black/20 to-transparent transition-all duration-500 ${showDetails ? "opacity-0" : "opacity-100"}`}
            ></div>

            {/* Close button when details are shown */}
            {showDetails && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowDetails(false)
                }}
                className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors z-20"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            )}

            {!showDetails ? (
              /* Basic Info */
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">Anas Hamad</h1>
                <p className="text-white/90 text-base drop-shadow-md">AI & Machine Learning Engineer</p>
              </div>
            ) : (
              /* Detailed Info */
              <div className="space-y-6 animate-in fade-in duration-500">
                {/* Name and Title */}
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-white">Anas Hamad</h1>
                  <p className="text-white/90 text-lg">AI & Machine Learning Engineer</p>
                  <p className="text-white/70 text-sm">Based in Amman, Jordan</p>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm">hi.anashamad@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-sm">+962795874662</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-sm">Amman, Jordan</span>
                  </div>
                </div>

                {/* Tap hint */}
                <div className="text-center pt-4">
                  <p className="text-white/50 text-xs">Tap anywhere to close</p>
                </div>
              </div>
            )}
          </div>

          {/* Subtle Border */}
          <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
        </Card>
      </div>
    </main>
  )
}
