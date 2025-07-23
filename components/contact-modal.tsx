"use client"

import type React from "react"

import { X, Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import { useState } from "react"
import type { Locale } from "@/i18n-config"
import emailjs from "@emailjs/browser"

export default function ContactModal({
  isOpen,
  onClose,
  lang,
}: {
  isOpen: boolean
  onClose: () => void
  lang: Locale
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // EmailJS configuration
      const serviceId = "service_6hj85pp" // Replace with your EmailJS service ID
      const templateId = "template_wa9ey1r" // Replace with your EmailJS template ID
      const publicKey = "QQ_1alyChrEBYODBb" // Replace with your EmailJS public key

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_email: "hi.anashamad@gmail.com",
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)

      setIsSuccess(true)
      setFormData({ name: "", phone: "", email: "", message: "" })

      // Auto close after 2 seconds
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
      }, 2000)
    } catch (error) {
      console.error("EmailJS error:", error)
      setError(isArabic ? "حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى." : "Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const isArabic = lang === "ar"

  const text = {
    title: isArabic ? "تواصل معي" : "Get in touch",
    contactInfo: isArabic ? "يمكنك التواصل معي عبر هذه المعلومات" : "You can reach me through these channels",
    sendMessage: isArabic ? "أو أرسل رسالتك مباشرة" : "Or send your message directly",
    placeholders: {
      name: isArabic ? "الاسم" : "Name",
      phone: isArabic ? "الهاتف" : "Phone",
      email: isArabic ? "البريد الإلكتروني" : "Email",
      message: isArabic ? "الرسالة" : "Message",
    },
    button: isArabic ? "إرسال الرسالة" : "Send Message",
    sending: isArabic ? "جاري الإرسال..." : "Sending...",
    success: isArabic ? "تم إرسال الرسالة بنجاح!" : "Message sent successfully!",
    error: isArabic ? "حدث خطأ في الإرسال" : "Failed to send message",
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-sm bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl rounded-xl overflow-hidden ${
          isArabic ? "font-arabic" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-3 ${
            isArabic ? "left-3" : "right-3"
          } p-1.5 rounded-full hover:bg-secondary/50 transition-colors z-10`}
        >
          <X className="h-3 w-3 text-muted-foreground" />
        </button>

        {isSuccess ? (
          // Success State
          <div className="p-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-sm font-medium text-foreground mb-2">{text.success}</h3>
            <p className="text-xs text-muted-foreground">
              {isArabic ? "سأتواصل معك قريباً" : "I'll get back to you soon"}
            </p>
          </div>
        ) : (
          <>
            {/* Contact Info Section */}
            <div className="p-4 border-b border-border/30">
              <h3 className="text-sm font-medium text-foreground mb-2">{text.title}</h3>
              <p className="text-xs text-muted-foreground/80 mb-3">{text.contactInfo}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  <span>hi.anashamad@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  <span>+962795874662</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{isArabic ? "عمان، الأردن" : "Amman, Jordan"}</span>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="p-4">
              <p className="text-xs text-muted-foreground/80 mb-3">{text.sendMessage}</p>
              {error && (
                <div className="mb-3 p-2 bg-red-500/10 border border-red-500/20 rounded-md">
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="name"
                    placeholder={text.placeholders.name}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="px-2 py-1.5 text-xs bg-secondary/30 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/60 disabled:opacity-50"
                    dir={isArabic ? "rtl" : "ltr"}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder={text.placeholders.phone}
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="px-2 py-1.5 text-xs bg-secondary/30 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/60 disabled:opacity-50"
                    dir={isArabic ? "rtl" : "ltr"}
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder={text.placeholders.email}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-2 py-1.5 text-xs bg-secondary/30 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/60 disabled:opacity-50"
                  dir={isArabic ? "rtl" : "ltr"}
                />
                <textarea
                  name="message"
                  placeholder={text.placeholders.message}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  disabled={isSubmitting}
                  className="w-full px-2 py-1.5 text-xs bg-secondary/30 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none placeholder:text-muted-foreground/60 disabled:opacity-50"
                  dir={isArabic ? "rtl" : "ltr"}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 text-xs font-medium"
                >
                  <Send className="h-3 w-3" />
                  {isSubmitting ? text.sending : text.button}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
