"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { Marker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import type { Hotel } from "@/lib/hotels";

type HotelMapProps = {
  hotels: Hotel[];
  center: [number, number];
  selectedSlug: string | null;
  hoveredSlug: string | null;
  onSelect: (slug: string) => void;
};

function MapViewport({ center, hotels, selectedHotel }: { center: [number, number]; hotels: Hotel[]; selectedHotel: Hotel | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedHotel?.latitude !== undefined && selectedHotel.longitude !== undefined) {
      map.flyTo([selectedHotel.latitude, selectedHotel.longitude], 14, { duration: 0.7 });
      return;
    }

    const coordinates = hotels.flatMap((hotel) => hotel.latitude !== undefined && hotel.longitude !== undefined ? [[hotel.latitude, hotel.longitude] as [number, number]] : []);
    if (coordinates.length > 1) {
      map.fitBounds(L.latLngBounds(coordinates), { padding: [40, 40], maxZoom: 12 });
    } else {
      map.setView(coordinates[0] ?? center, coordinates.length ? 14 : 5);
    }
  }, [center, hotels, map, selectedHotel]);

  return null;
}

export function HotelMap({ hotels, center, selectedSlug, hoveredSlug, onSelect }: HotelMapProps) {
  const selectedHotel = hotels.find((hotel) => hotel.slug === selectedSlug) ?? null;
  const markerRefs = useRef<Record<string, L.Marker | null>>({});

  useEffect(() => {
    if (selectedSlug) markerRefs.current[selectedSlug]?.openPopup();
  }, [selectedSlug]);

  return (
    <div className="hotel-map-shell h-full min-h-[420px] overflow-hidden rounded-[1.75rem] border border-[#dddddd] shadow-[0_20px_55px_rgba(0,0,0,0.08)]">
      <MapContainer center={center} zoom={5} scrollWheelZoom className="h-full min-h-[420px] w-full">
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapViewport center={center} hotels={hotels} selectedHotel={selectedHotel} />
        {hotels.map((hotel) => {
          if (hotel.latitude === undefined || hotel.longitude === undefined) return null;
          const isSelected = hotel.slug === selectedSlug || hotel.slug === hoveredSlug;
          const price = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(hotel.price);
          return (
            <Marker
              key={hotel.slug}
              ref={(marker) => { markerRefs.current[hotel.slug] = marker; }}
              position={[hotel.latitude, hotel.longitude]}
              icon={L.divIcon({
                className: `hotel-price-marker ${isSelected ? "is-active" : ""}`,
                html: price,
                iconAnchor: [0, 18],
              })}
              eventHandlers={{ click: () => onSelect(hotel.slug) }}
            >
              <Popup>
                <div className="w-44">
                  <p className="font-semibold text-[#111111]">{hotel.name}</p>
                  <p className="mt-1 text-xs text-[#666666]">* {hotel.rating.toFixed(1)}  |  INR {hotel.price.toLocaleString("en-IN")} / night</p>
                  <a href={`/hotel/${hotel.slug}`} className="mt-3 inline-flex text-xs font-semibold text-[#111111]">View Stay &rarr;</a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

