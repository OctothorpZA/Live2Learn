import { sanityFetch } from '@/sanity/lib/live'
import { allSchoolPartnersQuery } from '@/sanity/lib/queries'
import ImpactPageClient from './ImpactPageClient'

// Define a local, explicit type to prevent potential build errors from faulty auto-generated types
export type LocationType = {
  _id: string
  schoolName?: string | null
  status?: string | null
  latitude?: number | null
  longitude?: number | null
}

export default async function ImpactPage() {
  // Fetch the list of all school partners using our query
  const { data } = await sanityFetch({
    query: allSchoolPartnersQuery,
  })

  // Use a type assertion to ensure the data is correctly typed
  const locations = (data as LocationType[]) || []

  return <ImpactPageClient locations={locations} />
}