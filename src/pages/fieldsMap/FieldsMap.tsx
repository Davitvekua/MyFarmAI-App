import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Map, Layers, List, MapPin, Plus, Sprout } from "lucide-react"
import L from "leaflet"
import {
  MapContainer,
  Polygon,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { Polygon as GeoJsonPolygon } from "geojson"

import fieldsMapBackground from "../../assets/landing-background.jpg"

import { useAuth } from "../../context/AuthContext"
import type { FieldsMapField } from "@/types/appTypes"
import { loadFieldsForFieldsMap } from "@/apiService/FieldsApi"

type PolygonPosition = [number, number]
type MapView = "street" | "satellite"

type VisibleField = FieldsMapField & {
  positions: PolygonPosition[]
}

type FieldsMapAutoFitProps = {
  positions: PolygonPosition[]
}

function getGeoJsonPolygon(polygon: unknown): GeoJsonPolygon | null {
  if (!polygon || typeof polygon !== "object" || Array.isArray(polygon)) {
    return null
  }

  const geoJsonPolygon = polygon as GeoJsonPolygon

  if (geoJsonPolygon.type !== "Polygon") {
    return null
  }

  return geoJsonPolygon
}

function getPolygonPositions(
  polygon: GeoJsonPolygon | null
): PolygonPosition[] {
  if (!polygon) {
    return []
  }

  const firstRing = polygon.coordinates[0]

  if (!firstRing) {
    return []
  }

  return firstRing
    .filter((coordinate) => {
      return (
        typeof coordinate[0] === "number" && typeof coordinate[1] === "number"
      )
    })
    .map((coordinate) => {
      const lng = coordinate[0]
      const lat = coordinate[1]

      return [lat, lng] as PolygonPosition
    })
}

function FieldsMapAutoFit({ positions }: FieldsMapAutoFitProps) {
  const map = useMap()

  useEffect(() => {
    if (positions.length === 0) return

    const bounds = L.latLngBounds(positions)

    map.fitBounds(bounds, {
      padding: [40, 40],
    })
  }, [map, positions])

  return null
}

function formatArea(areaHa: number | null) {
  if (areaHa === null) return "-"

  return `${areaHa.toLocaleString("de-DE")} ha`
}

function FieldsMap() {
  const { user } = useAuth()

  const [fields, setFields] = useState<FieldsMapField[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [mapView, setMapView] = useState<MapView>("street")

  useEffect(() => {
    async function loadFields() {
      if (!user) {
        setIsLoading(false)
        setErrorMessage("Du musst eingeloggt sein, um deine Flächen zu sehen.")
        return
      }

      setIsLoading(true)
      setErrorMessage("")

      const { data, error } = await loadFieldsForFieldsMap(user.id)

      setIsLoading(false)

      if (error) {
        setErrorMessage("Flächen konnten nicht geladen werden.")
        return
      }

      setFields(data ?? [])
    }

    loadFields()
  }, [user])

  const visibleFields = useMemo<VisibleField[]>(() => {
    return fields
      .map((field) => {
        const polygon = getGeoJsonPolygon(field.polygon)
        const positions = getPolygonPositions(polygon)

        return {
          ...field,
          positions,
        }
      })
      .filter((field) => field.positions.length > 0)
  }, [fields])

  const allPolygonPositions = useMemo(() => {
    return visibleFields.flatMap((field) => field.positions)
  }, [visibleFields])

  const totalAreaHa = fields.reduce((sum, field) => {
    return sum + Number(field.area_ha ?? 0)
  }, 0)

  const mapCenter =
    allPolygonPositions[0] ?? ([48.123456, 11.123456] as PolygonPosition)

  function handleToggleMapView() {
    setMapView((currentView) =>
      currentView === "street" ? "satellite" : "street"
    )
  }

  return (
    <main
      className="min-h-[calc(100vh-140px)] bg-cover bg-center bg-no-repeat text-gray-900"
      style={{ backgroundImage: `url(${fieldsMapBackground})` }}
    >
      <div className="min-h-[calc(100vh-140px)] bg-[#f7f8ef]/70">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <section className="mb-8 flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-800">
              <Map className="h-10 w-10" />
            </div>

            <div>
              <h1 className="text-5xl font-bold text-green-900">
                Flächenkarte
              </h1>
              <p className="mt-2 text-lg text-gray-700">
                Hier siehst du alle gespeicherten Flächen auf einer Karte.
              </p>
            </div>
          </section>

          <section className="mb-8 grid grid-cols-3 gap-8">
            <div className="flex items-center gap-5 rounded-2xl bg-white/95 p-6 shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-800">
                <Sprout className="h-8 w-8" />
              </div>

              <div>
                <p className="text-gray-700">Gespeicherte Flächen</p>
                <p className="mt-1 text-3xl font-bold text-green-900">
                  {isLoading ? "-" : fields.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 rounded-2xl bg-white/95 p-6 shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-800">
                <MapPin className="h-8 w-8" />
              </div>

              <div>
                <p className="text-gray-700">Auf Karte sichtbar</p>
                <p className="mt-1 text-3xl font-bold text-green-900">
                  {isLoading ? "-" : visibleFields.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 rounded-2xl bg-white/95 p-6 shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-800">
                <Sprout className="h-8 w-8" />
              </div>

              <div>
                <p className="text-gray-700">Gesamtfläche</p>
                <p className="mt-1 text-3xl font-bold text-green-900">
                  {isLoading
                    ? "-"
                    : `${totalAreaHa.toLocaleString("de-DE")} ha`}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white/95 p-8 shadow-lg">
            {errorMessage && (
              <p className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {errorMessage}
              </p>
            )}

            <div className="relative h-155 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <MapContainer
                center={mapCenter}
                zoom={14}
                scrollWheelZoom
                className="h-full w-full"
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

                <FieldsMapAutoFit positions={allPolygonPositions} />

                {visibleFields.map((field) => (
                  <Polygon
                    key={field.id}
                    positions={field.positions}
                    pathOptions={{
                      color: "#166534",
                      fillColor: "#22c55e",
                      fillOpacity: 0.3,
                      weight: 3,
                    }}
                    eventHandlers={{
                      click: (event) => {
                        const polygonLayer = event.target as L.Polygon
                        polygonLayer.openPopup()
                      },
                    }}
                  >
                    <Tooltip sticky>Klick für Infos</Tooltip>
                    <Popup>
                      <div className="space-y-1">
                        <p className="font-bold text-green-900">{field.name}</p>
                        <p>Kulturart: {field.crop_type || "-"}</p>
                        <p>Bodenart: {field.soil_type || "-"}</p>
                        <p>Größe: {formatArea(field.area_ha)}</p>
                        <Link
                          to={`/fields/${field.id}`}
                          className="mt-2 inline-block font-semibold text-green-800"
                        >
                          Details öffnen
                        </Link>
                      </div>
                    </Popup>
                  </Polygon>
                ))}
              </MapContainer>

              <button
                type="button"
                onClick={handleToggleMapView}
                title={
                  mapView === "street"
                    ? "Satellitenansicht anzeigen"
                    : "Kartenansicht anzeigen"
                }
                className="absolute top-5 right-5 z-500 flex h-14 w-14 items-center justify-center rounded-xl bg-white text-gray-800 shadow-md hover:bg-gray-50"
              >
                <Layers className="h-7 w-7" />
              </button>

              {!isLoading && visibleFields.length === 0 && !errorMessage && (
                <div className="absolute inset-x-6 top-6 z-500 rounded-xl bg-white/95 px-5 py-4 text-gray-700 shadow-md">
                  Noch keine gespeicherten Flächen mit Polygon vorhanden.
                </div>
              )}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
              <Link
                to="/map"
                className="flex items-center justify-center gap-3 rounded-lg bg-green-700 px-6 py-4 text-lg font-semibold text-white shadow-md hover:bg-green-800"
              >
                <Plus className="h-5 w-5" />
                Neue Fläche anlegen
              </Link>

              <Link
                to="/fields"
                className="flex items-center justify-center gap-3 rounded-lg border border-green-700 bg-white px-6 py-4 text-lg font-semibold text-green-800 hover:bg-green-50"
              >
                <List className="h-5 w-5" />
                Zur Flächenverwaltung
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default FieldsMap
