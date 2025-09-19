import { sanityFetch } from '@/sanity/lib/live'
import { homePageQuery } from '@/sanity/lib/queries'
import HybridHomePage from './HybridHomePage'

export default async function HomePage() {
  // Fetch page data from Sanity
  const { data: pageData } = await sanityFetch({
    query: homePageQuery,
  })

  // Use hybrid approach - modern design + page builder flexibility
  return <HybridHomePage pageData={pageData} />
}