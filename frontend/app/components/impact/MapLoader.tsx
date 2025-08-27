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
          <div className="h-full w-full bg-gray-200 animate-pulse" />
        ),
      }),
    []
  )

  return <Map locations={locations} />
}
