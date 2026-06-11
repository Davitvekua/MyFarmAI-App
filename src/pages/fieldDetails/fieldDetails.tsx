import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
  ArrowLeft,
  ClipboardList,
  Layers,
  Map,
  Pencil,
  Ruler,
  Settings,
  Sprout,
  Target,
  Trash2,
  User,
  Waves,
} from "lucide-react"
import {
  CircleMarker,
  MapContainer,
  Polygon,
  TileLayer,
  useMap,
} from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { Polygon as GeoJsonPolygon } from "geojson"

import fieldBackground from "../../assets/landing-background.jpg"

import { supabase } from "../../lib/supabaseClient"
import { useAuth } from "../../context/AuthContext"
import type { Field } from "@/types/appTypes"

type FieldDetailsField = Pick<
  Field,
  | "id"
  | "user_id"
  | "name"
  | "crop_type"
  | "soil_type"
  | "note"
  | "area_m2"
  | "area_ha"
  | "center_lat"
  | "center_lng"
  | "polygon"
>

type PolygonPosition = [number, number]
type MapView = "street" | "satellite"

type FieldMapAutoFitProps = {
  polygonPositions: PolygonPosition[]
  centerPosition: PolygonPosition
}

function FieldMapAutoFit({
  polygonPositions,
  centerPosition,
}: FieldMapAutoFitProps) {
  const map = useMap()

  useEffect(() => {
    if (polygonPositions.length > 0) {
      const bounds = L.latLngBounds(polygonPositions)
      map.fitBounds(bounds, {
        padding: [30, 30],
      })
      return
    }

    map.setView(centerPosition, 15)
  }, [map, polygonPositions, centerPosition])

  return null
}

function getPolygonPositions(
  polygon: FieldDetailsField["polygon"]
): PolygonPosition[] {
  if (!polygon || typeof polygon !== "object" || Array.isArray(polygon)) {
    return []
  }

  const geoJsonPolygon = polygon as unknown as GeoJsonPolygon

  if (geoJsonPolygon.type !== "Polygon") {
    return []
  }

  const firstRing = geoJsonPolygon.coordinates[0]

  if (!firstRing) {
    return []
  }

  return firstRing.map((coordinate) => {
    const lng = coordinate[0]
    const lat = coordinate[1]

    return [lat, lng] as PolygonPosition
  })
}

function FieldDetails() {
  const { fieldId } = useParams()
  const { user } = useAuth()

  const [field, setField] = useState<FieldDetailsField | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [mapView, setMapView] = useState<MapView>("street")

  useEffect(() => {
    async function loadFieldDetails() {
      if (!user || !fieldId) return

      setIsLoading(true)
      setErrorMessage("")

      const { data, error } = await supabase
        .from("fields")
        .select(
          "id, user_id, name, crop_type, soil_type, note, area_m2, area_ha, center_lat, center_lng, polygon"
        )
        .eq("id", fieldId)
        .eq("user_id", user.id)
        .single()

      setIsLoading(false)

      if (error) {
        setErrorMessage("Fläche konnte nicht geladen werden.")
        return
      }

      setField(data)
    }

    loadFieldDetails()
  }, [fieldId, user])

  const polygonPositions = useMemo(() => {
    if (!field) {
      return []
    }

    return getPolygonPositions(field.polygon)
  }, [field])

  const centerPosition = useMemo<PolygonPosition>(() => {
    if (field && field.center_lat !== null && field.center_lng !== null) {
      return [field.center_lat, field.center_lng]
    }

    if (polygonPositions.length > 0) {
      return polygonPositions[0]
    }

    return [48.123456, 11.123456]
  }, [field, polygonPositions])

  function handleToggleMapView() {
    setMapView((currentView) =>
      currentView === "street" ? "satellite" : "street"
    )
  }

  function formatArea(areaHa: number | null, areaM2: number | null) {
    const areaHaText =
      areaHa === null ? "-" : `${areaHa.toLocaleString("de-DE")} ha`
    const areaM2Text =
      areaM2 === null ? "-" : `${areaM2.toLocaleString("de-DE")} m²`

    return `${areaM2Text} / ${areaHaText}`
  }

  function formatCenter(centerLat: number | null, centerLng: number | null) {
    if (centerLat === null || centerLng === null) {
      return "-"
    }

    return `${centerLat}, ${centerLng}`
  }

  return (
    <main
      className="min-h-[calc(100vh-140px)] bg-cover bg-center bg-no-repeat text-gray-900"
      style={{ backgroundImage: `url(${fieldBackground})` }}
    >
      <div className="min-h-[calc(100vh-140px)] bg-[#f7f8ef]/70">
        <div className="mx-auto max-w-6xl px-6 py-12">
          {isLoading && (
            <section className="rounded-2xl bg-white/95 p-8 text-lg text-gray-700 shadow-lg">
              Fläche wird geladen...
            </section>
          )}

          {!isLoading && errorMessage && (
            <section className="rounded-2xl bg-red-50 p-8 text-lg font-semibold text-red-700 shadow-lg">
              {errorMessage}
            </section>
          )}

          {!isLoading && !errorMessage && field && (
            <>
              <section className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-800">
                    <Sprout className="h-10 w-10" />
                  </div>

                  <div>
                    <h1 className="text-5xl font-bold text-green-900">
                      {field.name}
                    </h1>
                    <p className="mt-2 text-lg text-gray-700">
                      Hier findest du alle Details zu deiner
                      landwirtschaftlichen Fläche.
                    </p>
                  </div>
                </div>

                <button className="flex items-center gap-3 rounded-lg bg-green-700 px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-green-800">
                  <Pencil className="h-5 w-5" />
                  Bearbeiten
                </button>
              </section>

              <section className="mb-6 grid grid-cols-[1fr_1.4fr] gap-8 rounded-2xl bg-white/95 p-8 shadow-lg">
                <div>
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-800">
                      <ClipboardList className="h-7 w-7" />
                    </div>

                    <h2 className="text-3xl font-bold text-green-900">
                      Flächendaten
                    </h2>
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white px-6 py-4">
                    <div className="flex items-center justify-between border-b border-gray-200 py-5">
                      <div className="flex items-center gap-4 text-gray-700">
                        <User className="h-5 w-5 text-green-800" />
                        <span className="font-semibold">Name:</span>
                      </div>
                      <span>{field.name}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-gray-200 py-5">
                      <div className="flex items-center gap-4 text-gray-700">
                        <Sprout className="h-5 w-5 text-green-800" />
                        <span className="font-semibold">Kulturart:</span>
                      </div>
                      <span>{field.crop_type || "-"}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-gray-200 py-5">
                      <div className="flex items-center gap-4 text-gray-700">
                        <Waves className="h-5 w-5 text-green-800" />
                        <span className="font-semibold">Bodenart:</span>
                      </div>
                      <span>{field.soil_type || "-"}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-gray-200 py-5">
                      <div className="flex items-center gap-4 text-gray-700">
                        <Ruler className="h-5 w-5 text-green-800" />
                        <span className="font-semibold">Größe:</span>
                      </div>
                      <span>{formatArea(field.area_ha, field.area_m2)}</span>
                    </div>

                    <div className="flex items-center justify-between py-5">
                      <div className="flex items-center gap-4 text-gray-700">
                        <Target className="h-5 w-5 text-green-800" />
                        <span className="font-semibold">Zentrum:</span>
                      </div>
                      <span>
                        {formatCenter(field.center_lat, field.center_lng)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-l border-gray-200 pl-8">
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-800">
                      <Map className="h-7 w-7" />
                    </div>

                    <h2 className="text-3xl font-bold text-green-900">
                      Karten-Vorschau
                    </h2>
                  </div>

                  <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <MapContainer
                      center={centerPosition}
                      zoom={15}
                      scrollWheelZoom
                      className="h-82.5 w-full"
                    >
                      {mapView === "street" ? (
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                      ) : (
                        <TileLayer
                          attribution="Tiles &copy; Esri"
                          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                      )}

                      <FieldMapAutoFit
                        polygonPositions={polygonPositions}
                        centerPosition={centerPosition}
                      />

                      {polygonPositions.length > 0 && (
                        <Polygon
                          positions={polygonPositions}
                          pathOptions={{
                            color: "#166534",
                            fillColor: "#22c55e",
                            fillOpacity: 0.25,
                          }}
                        />
                      )}

                      {field.center_lat !== null &&
                        field.center_lng !== null && (
                          <CircleMarker
                            center={[field.center_lat, field.center_lng]}
                            radius={7}
                            pathOptions={{
                              color: "#166534",
                              fillColor: "#166534",
                              fillOpacity: 1,
                            }}
                          />
                        )}
                    </MapContainer>

                    <button
                      type="button"
                      onClick={handleToggleMapView}
                      title={
                        mapView === "street"
                          ? "Satellitenansicht anzeigen"
                          : "Kartenansicht anzeigen"
                      }
                      className="absolute top-5 right-5 z-500 flex h-14 w-14 items-center justify-center rounded-xl bg-white text-gray-800 shadow-md"
                    >
                      <Layers className="h-7 w-7" />
                    </button>
                  </div>
                </div>
              </section>

              <section className="mb-6 rounded-2xl bg-white/95 p-8 shadow-lg">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-800">
                    <ClipboardList className="h-7 w-7" />
                  </div>

                  <h2 className="text-3xl font-bold text-green-900">Notizen</h2>
                </div>

                <p className="text-lg text-gray-700">
                  {field.note || "Keine Notiz vorhanden."}
                </p>
              </section>

              <section className="rounded-2xl bg-white/95 p-8 shadow-lg">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-800">
                    <Settings className="h-7 w-7" />
                  </div>

                  <h2 className="text-3xl font-bold text-green-900">
                    Aktionen
                  </h2>
                </div>

                <div className="grid grid-cols-3 gap-8">
                  <Link
                    to="/fields"
                    className="flex items-center justify-center gap-3 rounded-lg border border-gray-400 bg-white px-6 py-4 text-lg font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Zurück
                  </Link>

                  <Link
                    to="/map"
                    className="flex items-center justify-center gap-3 rounded-lg border border-green-700 bg-white px-6 py-4 text-lg font-semibold text-green-800 hover:bg-green-50"
                  >
                    <Map className="h-5 w-5" />
                    Auf Karte anzeigen
                  </Link>

                  <button className="flex items-center justify-center gap-3 rounded-lg border border-red-500 bg-white px-6 py-4 text-lg font-semibold text-red-600 hover:bg-red-50">
                    <Trash2 className="h-5 w-5" />
                    Löschen
                  </button>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default FieldDetails
