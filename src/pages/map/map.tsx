import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Layers, MapPin, PenTool, Save, Sprout, X } from "lucide-react"
import { MapContainer, ScaleControl, TileLayer, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import "leaflet-draw"
import { area, centroid } from "@turf/turf"
import type { Feature, Polygon as GeoJsonPolygon } from "geojson"

import mapBackground from "../../assets/landing-background.jpg"

import { useAuth } from "../../context/AuthContext"
import type { FieldInsert } from "../../types/appTypes"

import Combobox from "@/components/Combobox"
import { cropTypeOptions, soilTypeOptions } from "@/data/fieldOptions"
import { createFieldFromMap } from "@/apiService/FieldsApi"

type StartDrawing = (() => void) | null
type ResetDrawing = (() => void) | null
type MapView = "street" | "satellite"

type DrawCreatedEvent = L.LeafletEvent & {
  layer: L.Layer & {
    toGeoJSON: () => Feature<GeoJsonPolygon>
  }
}

type PolygonDrawControlProps = {
  onPolygonCreated: (feature: Feature<GeoJsonPolygon>) => void
  onDrawReady: (startDrawing: StartDrawing) => void
  onResetReady: (resetDrawing: ResetDrawing) => void
}

function PolygonDrawControl({
  onPolygonCreated,
  onDrawReady,
  onResetReady,
}: PolygonDrawControlProps) {
  const map = useMap()

  useEffect(() => {
    const drawnItems = new L.FeatureGroup()
    map.addLayer(drawnItems)

    const polygonDrawer = new L.Draw.Polygon(map as any, {
      allowIntersection: true,
      showArea: true,
    })

    onDrawReady(() => {
      polygonDrawer.enable()
    })

    onResetReady(() => {
      polygonDrawer.disable()
      drawnItems.clearLayers()
    })

    function handleCreated(event: L.LeafletEvent) {
      const createdEvent = event as DrawCreatedEvent
      const layer = createdEvent.layer

      drawnItems.clearLayers()
      drawnItems.addLayer(layer)

      const geoJson = layer.toGeoJSON()

      if (geoJson.geometry.type !== "Polygon") {
        return
      }

      onPolygonCreated(geoJson)
    }

    map.on(L.Draw.Event.CREATED, handleCreated)

    return () => {
      polygonDrawer.disable()
      map.off(L.Draw.Event.CREATED, handleCreated)
      map.removeLayer(drawnItems)
      onDrawReady(null)
      onResetReady(null)
    }
  }, [map, onPolygonCreated, onDrawReady, onResetReady])

  return null
}

function Mapp() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [name, setName] = useState("")
  const [cropType, setCropType] = useState("")
  const [soilType, setSoilType] = useState("")
  const [note, setNote] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [cropComboboxOpen, setCropComboboxOpen] = useState(false)
  const [soilComboboxOpen, setSoilComboboxOpen] = useState(false)

  const [mapView, setMapView] = useState<MapView>("street")

  const [startDrawing, setStartDrawing] = useState<StartDrawing>(null)
  const [resetDrawing, setResetDrawing] = useState<ResetDrawing>(null)

  const [polygon, setPolygon] = useState<GeoJsonPolygon | null>(null)
  const [areaM2, setAreaM2] = useState<number | null>(null)
  const [areaHa, setAreaHa] = useState<number | null>(null)
  const [centerLat, setCenterLat] = useState<number | null>(null)
  const [centerLng, setCenterLng] = useState<number | null>(null)

  const handleDrawReady = useCallback((start: StartDrawing) => {
    if (start) {
      setStartDrawing(() => start)
    } else {
      setStartDrawing(null)
    }
  }, [])

  const handleResetReady = useCallback((reset: ResetDrawing) => {
    if (reset) {
      setResetDrawing(() => reset)
    } else {
      setResetDrawing(null)
    }
  }, [])

  const handlePolygonCreated = useCallback(
    (feature: Feature<GeoJsonPolygon>) => {
      const calculatedAreaM2 = Math.round(area(feature))
      const calculatedAreaHa = Number((calculatedAreaM2 / 10000).toFixed(3))

      const center = centroid(feature)
      const [lng, lat] = center.geometry.coordinates

      setPolygon(feature.geometry)
      setAreaM2(calculatedAreaM2)
      setAreaHa(calculatedAreaHa)
      setCenterLat(Number(lat.toFixed(6)))
      setCenterLng(Number(lng.toFixed(6)))
      setErrorMessage("")
    },
    []
  )

  function handleStartDrawing() {
    setErrorMessage("")

    if (!startDrawing) {
      setErrorMessage("Die Karte ist noch nicht bereit.")
      return
    }

    startDrawing()
  }

  function handleResetDrawing() {
    setErrorMessage("")

    if (!resetDrawing) {
      setErrorMessage("Die Karte ist noch nicht bereit.")
      return
    }

    resetDrawing()

    setPolygon(null)
    setAreaM2(null)
    setAreaHa(null)
    setCenterLat(null)
    setCenterLng(null)
  }

  function handleToggleMapView() {
    setMapView((currentView) =>
      currentView === "street" ? "satellite" : "street"
    )
  }

  async function handleSaveField() {
    setErrorMessage("")

    if (!user) {
      setErrorMessage("Du musst eingeloggt sein, um eine Fläche zu speichern.")
      return
    }

    if (!name.trim()) {
      setErrorMessage("Bitte gib einen Namen für die Fläche ein.")
      return
    }

    if (!polygon || areaM2 === null || areaHa === null) {
      setErrorMessage("Bitte zeichne zuerst ein Polygon auf der Karte.")
      return
    }

    if (centerLat === null || centerLng === null) {
      setErrorMessage("Zentrumskoordinate konnte nicht berechnet werden.")
      return
    }

    setIsLoading(true)

    const newField: FieldInsert = {
      user_id: user.id,
      name: name.trim(),
      crop_type: cropType,
      soil_type: soilType,
      note,
      area_m2: areaM2,
      area_ha: areaHa,
      center_lat: centerLat,
      center_lng: centerLng,
      polygon: polygon as unknown as FieldInsert["polygon"],
    }

    const error = await createFieldFromMap(newField)

    setIsLoading(false)

    if (error) {
      setErrorMessage("Die Fläche konnte nicht gespeichert werden.")
      return
    }

    navigate("/fields")
  }

  return (
    <main
      className="flex min-h-[calc(100vh-140px)] flex-col bg-cover bg-center bg-no-repeat text-gray-900"
      style={{ backgroundImage: `url(${mapBackground})` }}
    >
      <div className="flex-1 bg-[#f7f8ef]/70">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <section className="mb-8 flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-800 text-green-50">
              <MapPin className="h-10 w-10" />
            </div>

            <div>
              <h1 className="text-5xl font-bold text-green-900">
                Kartenansicht – Neue Fläche anlegen
              </h1>
              <p className="mt-2 text-lg text-gray-700">
                Zeichne ein Polygon, speichere die Fläche und ergänze die
                Details.
              </p>
            </div>
          </section>

          <section className="rounded-2xl bg-white/95 p-8 shadow-lg">
            <div className="mb-6 flex gap-5">
              <button
                type="button"
                onClick={handleStartDrawing}
                className="flex items-center gap-3 rounded-lg border border-green-700 bg-white px-6 py-3 text-lg font-semibold text-green-800 hover:bg-green-50"
              >
                <PenTool className="h-5 w-5" />
                Polygon zeichnen
              </button>

              <button
                type="button"
                onClick={handleSaveField}
                disabled={isLoading}
                className="flex items-center gap-3 rounded-lg bg-green-700 px-7 py-3 text-lg font-semibold text-white shadow-md hover:bg-green-800 disabled:opacity-60"
              >
                <Save className="h-5 w-5" />
                {isLoading ? "Wird gespeichert..." : "Speichern"}
              </button>

              <button
                type="button"
                onClick={handleResetDrawing}
                className="flex items-center gap-3 rounded-lg border border-orange-500 bg-white px-6 py-3 text-lg font-semibold text-orange-600 hover:bg-orange-50"
              >
                <X className="h-5 w-5" />
                Erneut zeichnen
              </button>

              <Link
                to="/dashboard"
                className="flex items-center gap-3 rounded-lg border border-red-500 bg-white px-7 py-3 text-lg font-semibold text-red-600 hover:bg-red-50"
              >
                <X className="h-5 w-5" />
                Abbrechen
              </Link>
            </div>

            <div className="grid grid-cols-[1.9fr_1fr] gap-8">
              <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <MapContainer
                  center={[48.123456, 11.123456]}
                  zoom={15}
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

                  <ScaleControl imperial={false} position="bottomleft" />

                  <PolygonDrawControl
                    onPolygonCreated={handlePolygonCreated}
                    onDrawReady={handleDrawReady}
                    onResetReady={handleResetReady}
                  />
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
              </div>

              <aside className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-800">
                    <Sprout className="h-6 w-6" />
                  </div>

                  <h2 className="text-2xl font-bold text-green-900">
                    Neue Fläche
                  </h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block font-semibold text-gray-800">
                      Name der Fläche
                    </label>
                    <input
                      type="text"
                      placeholder="z. B. Feld Süd"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-gray-700 outline-none"
                    />
                  </div>

                  <Combobox
                    label="Kulturart"
                    placeholder="Kulturart auswählen oder eingeben"
                    searchPlaceholder="Kulturart suchen oder eingeben..."
                    emptyMessage="Keine passende Kulturart. Du kannst den eingegebenen Text trotzdem speichern."
                    value={cropType}
                    options={cropTypeOptions}
                    open={cropComboboxOpen}
                    onOpenChange={setCropComboboxOpen}
                    onValueChange={setCropType}
                  />

                  <Combobox
                    label="Bodenart"
                    placeholder="Bodenart auswählen oder eingeben"
                    searchPlaceholder="Bodenart suchen oder eingeben..."
                    emptyMessage="Keine passende Bodenart. Du kannst den eingegebenen Text trotzdem speichern."
                    value={soilType}
                    options={soilTypeOptions}
                    open={soilComboboxOpen}
                    onOpenChange={setSoilComboboxOpen}
                    onValueChange={setSoilType}
                  />

                  <div>
                    <label className="mb-2 block font-semibold text-gray-800">
                      Berechnete Größe
                    </label>
                    <div className="rounded-lg bg-green-50 px-4 py-4 text-xl font-bold text-green-900">
                      {areaM2 === null || areaHa === null
                        ? "Noch kein Polygon gezeichnet"
                        : `${areaM2.toLocaleString("de-DE")} m² / ${areaHa.toLocaleString("de-DE")} ha`}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-semibold text-gray-800">
                      Zentrumskoordinate
                    </label>
                    <div className="rounded-lg bg-green-50 px-4 py-4 text-gray-700">
                      <p>Lat: {centerLat ?? "-"}</p>
                      <p>Lng: {centerLng ?? "-"}</p>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-semibold text-gray-800">
                      Notiz
                    </label>
                    <textarea
                      placeholder="Hier Notizen hinzufügen..."
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                      className="h-24 w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none"
                    />
                  </div>

                  {errorMessage && (
                    <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                      {errorMessage}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <button
                      type="button"
                      onClick={handleSaveField}
                      disabled={isLoading}
                      className="flex items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-3 font-semibold text-white shadow-md hover:bg-green-800 disabled:opacity-60"
                    >
                      <Save className="h-5 w-5" />
                      {isLoading ? "Speichern..." : "Speichern"}
                    </button>

                    <Link
                      to="/dashboard"
                      className="flex items-center justify-center rounded-lg border border-green-700 px-5 py-3 font-semibold text-green-800 hover:bg-green-50"
                    >
                      Abbrechen
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Mapp
