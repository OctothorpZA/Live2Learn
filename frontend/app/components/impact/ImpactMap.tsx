// /frontend/app/components/impact/ImpactMap.tsx
'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
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

export default function ImpactMap({ locations }: ImpactMapProps) {
  const position: [number, number] = [-33.9249, 18.4241] // Cape Town

  return (
    <MapContainer
      center={position}
      zoom={10}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

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
            <Popup>
              <b>{location.schoolName}</b>
              <br />
              Status: {location.status}
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  )
}
