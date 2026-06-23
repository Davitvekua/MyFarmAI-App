import { useCallback, useEffect, useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Layers, PenTool, Save, Sprout, X } from "lucide-react"
import {
  CircleMarker,
  MapContainer,
  Polygon,
  ScaleControl,
  TileLayer,
  useMap,
} from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import "leaflet-draw"
import { area, centroid } from "@turf/turf"
import type { Feature, Polygon as GeoJsonPolygon } from "geojson"

import fieldBackground from "../../assets/landing-background.jpg"

import { useAuth } from "../../context/AuthContext"
import type { FieldEditField, FieldUpdate } from "@/types/appTypes"

import Combobox from "@/components/Combobox"
import { cropTypeOptions, soilTypeOptions } from "@/data/fieldOptions"
import {
  loadFieldForFieldEdit,
  updateFieldForFieldEdit,
} from "@/apiService/FieldsApi"

type StartDrawing = (() => void) | null
type ResetDrawing = (() => void) | null
type MapView = "street" | "satellite"
type PolygonPosition = [number, number]

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

type FieldMapAutoFitProps = {
  polygonPositions: PolygonPosition[]
  centerPosition: PolygonPosition
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

function getGeoJsonPolygon(
  polygon: FieldEditField["polygon"]
): GeoJsonPolygon | null {
  if (!polygon || typeof polygon !== "object" || Array.isArray(polygon)) {
    return null
  }

  const geoJsonPolygon = polygon as unknown as GeoJsonPolygon

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

  return firstRing.map((coordinate) => {
    const lng = coordinate[0]
    const lat = coordinate[1]

    return [lat, lng] as PolygonPosition
  })
}

function FieldEdit() {
  const navigate = useNavigate()
  const { fieldId } = useParams()
  const { user } = useAuth()

  const [field, setField] = useState<FieldEditField | null>(null)

  const [name, setName] = useState("")
  const [cropType, setCropType] = useState("")
  const [soilType, setSoilType] = useState("")
  const [note, setNote] = useState("")

  const [polygon, setPolygon] = useState<GeoJsonPolygon | null>(null)
  const [areaM2, setAreaM2] = useState<number | null>(null)
  const [areaHa, setAreaHa] = useState<number | null>(null)
  const [centerLat, setCenterLat] = useState<number | null>(null)
  const [centerLng, setCenterLng] = useState<number | null>(null)

  const [cropComboboxOpen, setCropComboboxOpen] = useState(false)
  const [soilComboboxOpen, setSoilComboboxOpen] = useState(false)

  const [mapView, setMapView] = useState<MapView>("street")

  const [startDrawing, setStartDrawing] = useState<StartDrawing>(null)
  const [resetDrawing, setResetDrawing] = useState<ResetDrawing>(null)

  const [isMapEditing, setIsMapEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    async function loadField() {
      if (!fieldId) {
        setIsLoading(false)
        setErrorMessage("Keine gültige Fläche ausgewählt.")
        return
      }

      if (!user) return

      setIsLoading(true)
      setErrorMessage("")

      const { data, error } = await loadFieldForFieldEdit(fieldId, user.id)

      setIsLoading(false)

      if (error) {
        setErrorMessage("Fläche konnte nicht geladen werden.")
        return
      }

      if (!data) {
        setErrorMessage("Fläche wurde nicht gefunden.")
        return
      }

      const loadedPolygon = getGeoJsonPolygon(data.polygon)

      setField(data)
      setName(data.name)
      setCropType(data.crop_type ?? "")
      setSoilType(data.soil_type ?? "")
      setNote(data.note ?? "")
      setAreaM2(data.area_m2)
      setAreaHa(data.area_ha)
      setCenterLat(data.center_lat)
      setCenterLng(data.center_lng)
      setPolygon(loadedPolygon)
    }

    loadField()
  }, [fieldId, user])

  const polygonPositions = useMemo(() => {
    return getPolygonPositions(polygon)
  }, [polygon])

  const centerPosition = useMemo<PolygonPosition>(() => {
    if (centerLat !== null && centerLng !== null) {
      return [centerLat, centerLng]
    }

    if (polygonPositions.length > 0) {
      return polygonPositions[0]
    }

    return [48.123456, 11.123456]
  }, [centerLat, centerLng, polygonPositions])

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
      setIsMapEditing(false)
      setErrorMessage("")
    },
    []
  )

  function handleToggleMapView() {
    setMapView((currentView) =>
      currentView === "street" ? "satellite" : "street"
    )
  }

  function handleEditMap() {
    setErrorMessage("")

    if (!resetDrawing || !startDrawing) {
      setErrorMessage("Die Karte ist noch nicht bereit.")
      return
    }

    resetDrawing()

    setPolygon(null)
    setAreaM2(null)
    setAreaHa(null)
    setCenterLat(null)
    setCenterLng(null)
    setIsMapEditing(true)

    startDrawing()
  }

  async function handleUpdateField() {
    setErrorMessage("")

    if (!user) {
      setErrorMessage(
        "Du musst eingeloggt sein, um diese Fläche zu bearbeiten."
      )
      return
    }

    if (!fieldId) {
      setErrorMessage("Keine gültige Fläche ausgewählt.")
      return
    }

    if (!name.trim()) {
      setErrorMessage("Bitte gib einen Namen für die Fläche ein.")
      return
    }

    if (!polygon || areaM2 === null || areaHa === null) {
      setErrorMessage("Bitte zeichne zuerst eine Fläche auf der Karte.")
      return
    }

    if (centerLat === null || centerLng === null) {
      setErrorMessage("Zentrumskoordinate konnte nicht berechnet werden.")
      return
    }

    setIsSaving(true)

    const updatedField: FieldUpdate = {
      name: name.trim(),
      crop_type: cropType,
      soil_type: soilType,
      note,
      area_m2: areaM2,
      area_ha: areaHa,
      center_lat: centerLat,
      center_lng: centerLng,
      polygon: polygon as unknown as FieldUpdate["polygon"],
    }

    const error = await updateFieldForFieldEdit(fieldId, user.id, updatedField)

    setIsSaving(false)

    if (error) {
      setErrorMessage("Die Änderungen konnten nicht gespeichert werden.")
      return
    }

    navigate(`/fields/${fieldId}`)
  }

  function formatArea(areaHaValue: number | null, areaM2Value: number | null) {
    const areaM2Text =
      areaM2Value === null ? "-" : `${areaM2Value.toLocaleString("de-DE")} m²`
    const areaHaText =
      areaHaValue === null ? "-" : `${areaHaValue.toLocaleString("de-DE")} ha`

    return `${areaM2Text} / ${areaHaText}`
  }

  return (
    <main
      className="flex min-h-[calc(100vh-140px)] flex-col bg-cover bg-center bg-no-repeat text-gray-900"
      style={{ backgroundImage: `url(${fieldBackground})` }}
    >
      <div className="flex-1 bg-[#f7f8ef]/70">
        <div className="mx-auto max-w-6xl px-6 py-12">
          {isLoading && (
            <section className="rounded-2xl bg-white/95 p-8 text-lg text-gray-700 shadow-lg">
              Fläche wird geladen...
            </section>
          )}

          {!isLoading && errorMessage && !field && (
            <section className="rounded-2xl bg-red-50 p-8 text-lg font-semibold text-red-700 shadow-lg">
              {errorMessage}
            </section>
          )}

          {!isLoading && field && (
            <>
              <section className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-800">
                    <Sprout className="h-10 w-10" />
                  </div>

                  <div>
                    <h1 className="text-5xl font-bold text-green-900">
                      Fläche bearbeiten
                    </h1>
                    <p className="mt-2 text-lg text-gray-700">
                      Bearbeite die gespeicherten Daten deiner Fläche.
                    </p>
                  </div>
                </div>

                <Link
                  to={`/fields/${field.id}`}
                  className="flex items-center gap-3 rounded-lg border border-gray-400 bg-white px-7 py-4 text-lg font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Zurück
                </Link>
              </section>

              <section className="rounded-2xl bg-white/95 p-8 shadow-lg">
                <div className="mb-6 flex gap-5">
                  <button
                    type="button"
                    onClick={handleEditMap}
                    className="flex items-center gap-3 rounded-lg border border-green-700 bg-white px-6 py-3 text-lg font-semibold text-green-800 hover:bg-green-50"
                  >
                    <PenTool className="h-5 w-5" />
                    Karte editieren
                  </button>

                  <button
                    type="button"
                    onClick={handleUpdateField}
                    disabled={isSaving}
                    className="flex items-center gap-3 rounded-lg bg-green-700 px-7 py-3 text-lg font-semibold text-white shadow-md hover:bg-green-800 disabled:opacity-60"
                  >
                    <Save className="h-5 w-5" />
                    {isSaving ? "Wird gespeichert..." : "Änderungen speichern"}
                  </button>

                  <Link
                    to={`/fields/${field.id}`}
                    className="flex items-center gap-3 rounded-lg border border-red-500 bg-white px-7 py-3 text-lg font-semibold text-red-600 hover:bg-red-50"
                  >
                    <X className="h-5 w-5" />
                    Abbrechen
                  </Link>
                </div>

                <div className="grid grid-cols-[1.9fr_1fr] gap-8">
                  <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <MapContainer
                      center={centerPosition}
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

                      {centerLat !== null && centerLng !== null && (
                        <CircleMarker
                          center={[centerLat, centerLng]}
                          radius={7}
                          pathOptions={{
                            color: "#166534",
                            fillColor: "#166534",
                            fillOpacity: 1,
                          }}
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
                        Flächendaten
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
                          {formatArea(areaHa, areaM2)}
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

                      {isMapEditing && (
                        <p className="rounded-lg bg-orange-50 px-4 py-3 text-sm font-medium text-orange-700">
                          Alte Karte wurde entfernt. Zeichne jetzt eine neue
                          Fläche auf der Karte.
                        </p>
                      )}

                      {errorMessage && (
                        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                          {errorMessage}
                        </p>
                      )}

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <button
                          type="button"
                          onClick={handleUpdateField}
                          disabled={isSaving}
                          className="flex items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-3 font-semibold text-white shadow-md hover:bg-green-800 disabled:opacity-60"
                        >
                          <Save className="h-5 w-5" />
                          {isSaving ? "Speichern..." : "Speichern"}
                        </button>

                        <Link
                          to={`/fields/${field.id}`}
                          className="flex items-center justify-center rounded-lg border border-green-700 px-5 py-3 font-semibold text-green-800 hover:bg-green-50"
                        >
                          Abbrechen
                        </Link>
                      </div>
                    </div>
                  </aside>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default FieldEdit
