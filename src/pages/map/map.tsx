import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Layers, MapPin, PenTool, Save, Sprout, X } from "lucide-react"

import mapBackground from "../../assets/landing-background.jpg"
import mapCreatePreview from "../../assets/map-create-preview.jpg"

import { supabase } from "../../lib/supabaseClient"
import { useAuth } from "../../context/AuthContext"

function Mapp() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [name, setName] = useState("")
  const [cropType, setCropType] = useState("")
  const [soilType, setSoilType] = useState("")
  const [note, setNote] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const areaM2 = 12450
  const areaHa = 1.245
  const centerLat = 48.123456
  const centerLng = 11.123456

  const polygon = {
    type: "Polygon",
    coordinates: [
      [
        [11.1229, 48.1231],
        [11.1241, 48.1232],
        [11.1243, 48.124],
        [11.1232, 48.1242],
        [11.1229, 48.1231],
      ],
    ],
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

    setIsLoading(true)

    const { error } = await supabase.from("fields").insert({
      user_id: user.id,
      name,
      crop_type: cropType,
      soil_type: soilType,
      note,
      area_m2: areaM2,
      area_ha: areaHa,
      center_lat: centerLat,
      center_lng: centerLng,
      polygon,
    })

    setIsLoading(false)

    if (error) {
      setErrorMessage("Die Fläche konnte nicht gespeichert werden.")
      return
    }

    navigate("/fields")
  }

  return (
    <main
      className="min-h-[calc(100vh-140px)] bg-cover bg-center bg-no-repeat text-gray-900"
      style={{ backgroundImage: `url(${mapBackground})` }}
    >
      <div className="min-h-[calc(100vh-140px)] bg-[#f7f8ef]/70">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <section className="mb-8 flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-800">
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
                <img
                  src={mapCreatePreview}
                  alt="Kartenansicht mit Polygon"
                  className="h-140 w-full object-cover"
                />

                <div className="absolute top-5 right-5 overflow-hidden rounded-xl bg-white shadow-md">
                  <button className="block w-14 border-b border-gray-200 py-3 text-3xl text-gray-800">
                    +
                  </button>
                  <button className="block w-14 py-3 text-3xl text-gray-800">
                    -
                  </button>
                </div>

                <button className="absolute top-36 right-5 flex h-14 w-14 items-center justify-center rounded-xl bg-white text-gray-800 shadow-md">
                  <Layers className="h-7 w-7" />
                </button>

                <div className="absolute bottom-8 left-8 text-white">
                  <div className="mb-1 text-sm font-semibold">100 m</div>
                  <div className="h-0.5 w-16 bg-white" />
                </div>
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

                  <div>
                    <label className="mb-2 block font-semibold text-gray-800">
                      Kulturart
                    </label>
                    <input
                      type="text"
                      placeholder="z. B. Weizen"
                      value={cropType}
                      onChange={(event) => setCropType(event.target.value)}
                      className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-gray-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-semibold text-gray-800">
                      Bodenart
                    </label>
                    <input
                      type="text"
                      placeholder="z. B. Lehmboden"
                      value={soilType}
                      onChange={(event) => setSoilType(event.target.value)}
                      className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-gray-700 outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-semibold text-gray-800">
                      Berechnete Größe
                    </label>
                    <div className="rounded-lg bg-green-50 px-4 py-4 text-xl font-bold text-green-900">
                      {areaM2.toLocaleString("de-DE")} m² /{" "}
                      {areaHa.toLocaleString("de-DE")} ha
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-semibold text-gray-800">
                      Zentrumskoordinate
                    </label>
                    <div className="rounded-lg bg-green-50 px-4 py-4 text-gray-700">
                      <p>Lat: {centerLat}</p>
                      <p>Lng: {centerLng}</p>
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
