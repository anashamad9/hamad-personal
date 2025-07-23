import type { Locale } from "@/i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import PortfolioClient from "./portfolio-client"

export default async function Page({ params }: { params: { lang: Locale } }) {
  // Load the correct language dictionary on the server
  const dict = await getDictionary(params.lang)

  // Render the client component and pass data via props
  return <PortfolioClient dict={dict} lang={params.lang} />
}
