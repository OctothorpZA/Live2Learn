// /frontend/app/impact/page.tsx

// FIX: Import 'dynamic' from 'next/dynamic' to load the map component on the client-side only
// import dynamic from 'next/dynamic'
import { sanityFetch } from '@/sanity/lib/live'
import { allSchoolPartnersQuery } from '@/sanity/lib/queries'
// Import the new MapLoader component
import MapLoader from '@/app/components/impact/MapLoader'

// Define a local, explicit type to prevent potential build errors from faulty auto-generated types
export type LocationType = {
  _id: string
  schoolName?: string | null
  status?: string | null
  latitude?: number | null
  longitude?: number | null
}

export default async function ImpactPage() {
  // Fetch the list of all school partners using our new query
  const { data } = await sanityFetch({
    query: allSchoolPartnersQuery,
  })

  // Use a type assertion to ensure the data is correctly typed
  const locations = (data as LocationType[]) || []

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-charcoal">
            Our Impact Hub
          </h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-charcoal">
            Explore our network of partner schools and see where our programs
            are making a difference across the community.
          </p>
        </div>
        <div className="h-[600px] w-full rounded-lg shadow-lg overflow-hidden">
          {/* Use the MapLoader to render the map on the client side */}
          <MapLoader locations={locations} />
        </div>
      </div>
    </div>
  )
}
