import type { Locale } from "@/i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import ArticlesClient from "./articles-client"

export default async function Articles({ params }: { params: { lang: Locale } }) {
  // Load the correct language dictionary on the server
  const dict = await getDictionary(params.lang)

  // Render the client component and pass data via props
  return <ArticlesClient dict={dict} lang={params.lang} />
}
