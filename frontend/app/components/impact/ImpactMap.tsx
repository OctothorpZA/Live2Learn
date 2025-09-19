// /frontend/app/components/impact/ImpactMap.tsx
'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect } from 'react'
import React from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
// FIX: Import the local LocationType instead of the faulty auto-generated one
import { LocationType } from '@/app/impact/page'

// Define the type for the props this component will accept
type ImpactMapProps = {
  locations: LocationType[]
}

// Create a custom icon for the LTL Head Office
const headOfficeIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230052ff'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
})

// Create a custom icon for the School Partners
const schoolPartnerIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f59e0b'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
})

// Component to center map on HQ and zoom to show furthest school
const CenterOnHQComponent = ({ locations }: { locations: LocationType[] }) => {
  useEffect(() => {
    if (locations.length === 0) return

    // Get all valid coordinates
    const validLocations = locations.filter(
      (location) => location.latitude && location.longitude
    )

    if (validLocations.length === 0) return

    // Find HQ Office location
    const hqOffice = validLocations.find(
      (location) => location.status === 'Head Office'
    )

    // If no HQ found, use Cape Town coordinates as fallback
    const hqLatLng: [number, number] = hqOffice 
      ? [hqOffice.latitude!, hqOffice.longitude!]
      : [-33.9249, 18.4241] // Cape Town fallback

    // Calculate maximum distance from HQ to any school
    const schoolLocations = validLocations.filter(
      (location) => location.status !== 'Head Office'
    )

    let maxDistance = 0
    schoolLocations.forEach((school) => {
      const schoolLatLng = L.latLng(school.latitude!, school.longitude!)
      const hqLatLngObj = L.latLng(hqLatLng[0], hqLatLng[1])
      const distance = hqLatLngObj.distanceTo(schoolLatLng)
      if (distance > maxDistance) {
        maxDistance = distance
      }
    })

    // Get the map instance and set view
    const map = (window as any).leafletMap
    if (map) {
      if (maxDistance > 0) {
        // Calculate appropriate zoom level based on distance
        // This is a rough calculation - you may need to fine-tune these values
        let zoom = 10
        if (maxDistance < 5000) zoom = 13      // < 5km
        else if (maxDistance < 10000) zoom = 12 // < 10km
        else if (maxDistance < 20000) zoom = 11 // < 20km
        else if (maxDistance < 50000) zoom = 10 // < 50km
        else zoom = 9                          // > 50km

        map.setView(hqLatLng, zoom)
      } else {
        // If only HQ exists, zoom in closer
        map.setView(hqLatLng, 13)
      }
    }
  }, [locations])

  return null
}

export default function ImpactMap({ locations }: ImpactMapProps) {
  // Find HQ Office for initial center, fallback to Cape Town
  const hqOffice = locations.find(
    (location) => location.status === 'Head Office' && location.latitude && location.longitude
  )
  
  const initialCenter: [number, number] = hqOffice 
    ? [hqOffice.latitude!, hqOffice.longitude!]
    : [-33.9249, 18.4241] // Cape Town fallback

  // Start with a reasonable zoom level - will be adjusted by CenterOnHQComponent
  const initialZoom = 11

  // Generate legend data from actual location statuses
  const legendItems = React.useMemo(() => {
    const statusMap = new Map()
    
    locations.forEach(location => {
      if (location.status && location.latitude && location.longitude) {
        if (!statusMap.has(location.status)) {
          statusMap.set(location.status, {
            status: location.status,
            count: 0,
            icon: location.status === 'Head Office' ? headOfficeIcon : schoolPartnerIcon,
            color: location.status === 'Head Office' ? '#0052ff' : '#f59e0b'
          })
        }
        statusMap.get(location.status).count++
      }
    })
    
    return Array.from(statusMap.values()).sort((a, b) => {
      // Head Office first, then alphabetical
      if (a.status === 'Head Office') return -1
      if (b.status === 'Head Office') return 1
      return a.status.localeCompare(b.status)
    })
  }, [locations])

  return (
    <MapContainer
      center={initialCenter}
      zoom={initialZoom}
      scrollWheelZoom={true}
      doubleClickZoom={true}
      touchZoom={true}
      dragging={true}
      zoomControl={true}
      style={{ height: '100%', width: '100%' }}
      zoomControlOptions={{ position: 'topright' }}
      whenCreated={(map) => {
        // Store map instance for CenterOnHQComponent
        (window as any).leafletMap = map
        
        // Optimize for mobile touch interactions
        if (typeof window !== 'undefined' && 'ontouchstart' in window) {
          map.dragging.disable()
          map.touchZoom.disable()
          map.doubleClickZoom.disable()
          map.scrollWheelZoom.disable()
          
          // Re-enable after a short delay to prevent conflicts
          setTimeout(() => {
            map.dragging.enable()
            map.touchZoom.enable()
            map.doubleClickZoom.enable()
            map.scrollWheelZoom.enable()
          }, 100)
        }
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Component to center on HQ and zoom to show furthest school */}
      <CenterOnHQComponent locations={locations} />

      {/* Dynamic Legend - Mobile Optimized */}
      {legendItems.length > 0 && (
        <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 bg-white/95 backdrop-blur-sm rounded-md md:rounded-lg shadow-md md:shadow-lg border border-gray-200 p-2 md:p-3 z-[1000] max-w-[140px] md:max-w-[200px]">
          <h3 className="font-bold text-xs md:text-sm text-charcoal mb-1 md:mb-2 border-b border-gray-100 pb-1 hidden md:block">
            Location Types
          </h3>
          <div className="space-y-1 md:space-y-2">
            {legendItems.map((item) => (
              <div key={item.status} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1 md:space-x-2 flex-1 min-w-0">
                  <div 
                    className="w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-charcoal/80 truncate font-medium text-xs">
                    {/* Show shorter labels on mobile */}
                    <span className="md:hidden">
                      {item.status === 'Head Office' ? 'HQ' : 
                       item.status.includes('Partner') ? 'Schools' : 
                       item.status.length > 8 ? item.status.substring(0, 8) + '...' : item.status}
                    </span>
                    <span className="hidden md:inline">{item.status}</span>
                  </span>
                </div>
                <span className="text-charcoal/60 ml-1 flex-shrink-0 font-bold text-xs">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
          {/* Hide total on mobile to save space */}
          <div className="mt-2 pt-1 md:pt-2 border-t border-gray-100 text-xs text-charcoal/60 text-center hidden md:block">
            Total: {locations.filter(l => l.latitude && l.longitude).length} locations
          </div>
        </div>
      )}

      {/* Map over the locations and render a Marker for each one */}
      {locations.map((location) =>
        location.latitude && location.longitude ? (
          <Marker
            key={location._id}
            position={[location.latitude, location.longitude]}
            // FIX: Apply the correct icon based on the location's status
            icon={
              location.status === 'Head Office'
                ? headOfficeIcon
                : schoolPartnerIcon
            }
          >
            <Popup
              closeButton={true}
              autoClose={false}
              className="custom-popup"
            >
              <div className="text-center p-2">
                <b className="text-ltl-deep-blue text-sm md:text-base block mb-1">{location.schoolName}</b>
                <span className="text-charcoal/70 text-xs md:text-sm">
                  {location.status === 'Head Office' ? '🏢 Head Office' : '🏫 Partner School'}
                </span>
              </div>
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  )
}
