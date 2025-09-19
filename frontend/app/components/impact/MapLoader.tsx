// /frontend/app/components/impact/MapLoader.tsx
'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { LocationType } from '@/app/impact/page'

type MapLoaderProps = {
  locations: LocationType[]
}

export default function MapLoader({ locations }: MapLoaderProps) {
  // Use useMemo to ensure the map component is only re-rendered when necessary
  const Map = useMemo(
    () =>
      dynamic(() => import('@/app/components/impact/ImpactMap'), {
        ssr: false,
        loading: () => (
          <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-ltl-deep-blue/20 border-t-ltl-deep-blue rounded-full animate-spin mx-auto mb-4"></div>
              <div className="space-y-2">
                <p className="text-ltl-deep-blue font-semibold">Loading Interactive Map</p>
                <p className="text-charcoal/60 text-sm">Preparing {locations.length} locations...</p>
              </div>
            </div>
          </div>
        ),
      }),
    [locations.length]
  )

  return <Map locations={locations} />
}
