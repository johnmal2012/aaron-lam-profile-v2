'use client';

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';

import L from 'leaflet';

import {
  useEffect,
  useMemo,
} from 'react';

import type { Clinic } from '@/lib/types/clinic';

import 'leaflet/dist/leaflet.css';

type ClinicMapProps = {
  clinics: Clinic[];
};

function createClinicIcon() {
  return L.divIcon({
    className: 'clinic-marker-wrapper',

    html: `
      <div
        style="
          width: 42px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 3px 3px rgba(0,0,0,0.30));
        "
      >
        <svg
          width="42"
          height="52"
          viewBox="0 0 42 52"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M21 1C10.0 1 1 9.8 1 20.5
               C1 34.5 21 51 21 51
               C21 51 41 34.5 41 20.5
               C41 9.8 32 1 21 1Z"
            fill="white"
            stroke="#0f172a"
            stroke-width="2"
          />

          <circle
            cx="21"
            cy="20"
            r="12"
            fill="#0f766e"
          />

          <path
            d="M21 12V28M13 20H29"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
      </div>
    `,

    iconSize: [42, 52],

    iconAnchor: [21, 51],

    popupAnchor: [0, -48],
  });
}

function FitMapToClinics({
  clinics,
}: {
  clinics: Clinic[];
}) {
  const map = useMap();

  useEffect(() => {
    if (clinics.length === 0) {
      return;
    }

    if (clinics.length === 1) {
      map.setView(
        [
          clinics[0].latitude,
          clinics[0].longitude,
        ],
        14,
      );

      return;
    }

    const bounds = L.latLngBounds(
      clinics.map((clinic) => [
        clinic.latitude,
        clinic.longitude,
      ]),
    );

    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 14,
    });
  }, [clinics, map]);

  return null;
}

export function ClinicMap({
  clinics,
}: ClinicMapProps) {
  const markerIcon = useMemo(
    () => createClinicIcon(),
    [],
  );

  if (clinics.length === 0) {
    return null;
  }

  const firstClinic = clinics[0];

  return (
    <div className="h-105 w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm sm:h-125">
      <MapContainer
        center={[
          firstClinic.latitude,
          firstClinic.longitude,
        ]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitMapToClinics
          clinics={clinics}
        />

        {clinics.map((clinic, index) => (
          <Marker
            key={`${clinic.name}-${clinic.latitude}-${clinic.longitude}-${index}`}
            position={[
              clinic.latitude,
              clinic.longitude,
            ]}
            icon={markerIcon}
          >
            <Popup>
              <div className="min-w-55 space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  {clinic.name}
                </h3>

                <p className="text-sm leading-relaxed text-slate-600">
                  {clinic.address}
                </p>

                <a
                  href={`https://www.openstreetmap.org/?mlat=${clinic.latitude}&mlon=${clinic.longitude}#map=17/${clinic.latitude}/${clinic.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-medium text-teal-700 hover:underline"
                >
                  View on OpenStreetMap
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

