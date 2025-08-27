// /frontend/app/impact/page.tsx

import ImpactMap from '@/app/components/impact/ImpactMap'
import { sanityFetch } from '@/sanity/lib/live'
import { allSchoolPartnersQuery } from '@/sanity/lib/queries'
import { AllSchoolPartnersQueryResult } from '@/sanity.types'

export default async function ImpactPage() {
  // Fetch the list of all school partners using our new query
  const { data: locations } = await sanityFetch<AllSchoolPartnersQueryResult>({
    query: allSchoolPartnersQuery,
  })

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
          {/* Pass the fetched location data to the map component */}
          <ImpactMap locations={locations || []} />
        </div>
      </div>
    </div>
  )
}
