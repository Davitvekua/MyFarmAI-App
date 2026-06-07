import { Link } from "react-router-dom"
import {
  ArrowLeft,
  ClipboardList,
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

import fieldBackground from "../../assets/landing-background.jpg"
import fieldMapPreview from "../../assets/field-map-preview.jpg"

function FieldDetails() {
  return (
    <main
      className="min-h-[calc(100vh-140px)] bg-cover bg-center bg-no-repeat text-gray-900"
      style={{ backgroundImage: `url(${fieldBackground})` }}
    >
      <div className="min-h-[calc(100vh-140px)] bg-[#f7f8ef]/70">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <section className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-800">
                <Sprout className="h-10 w-10" />
              </div>

              <div>
                <h1 className="text-5xl font-bold text-green-900">Feld Nord</h1>
                <p className="mt-2 text-lg text-gray-700">
                  Hier findest du alle Details zu deiner landwirtschaftlichen
                  Fläche.
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
                  <span>Feld Nord</span>
                </div>

                <div className="flex items-center justify-between border-b border-gray-200 py-5">
                  <div className="flex items-center gap-4 text-gray-700">
                    <Sprout className="h-5 w-5 text-green-800" />
                    <span className="font-semibold">Kulturart:</span>
                  </div>
                  <span>Mais</span>
                </div>

                <div className="flex items-center justify-between border-b border-gray-200 py-5">
                  <div className="flex items-center gap-4 text-gray-700">
                    <Waves className="h-5 w-5 text-green-800" />
                    <span className="font-semibold">Bodenart:</span>
                  </div>
                  <span>Lehm</span>
                </div>

                <div className="flex items-center justify-between border-b border-gray-200 py-5">
                  <div className="flex items-center gap-4 text-gray-700">
                    <Ruler className="h-5 w-5 text-green-800" />
                    <span className="font-semibold">Größe:</span>
                  </div>
                  <span>2,1 ha</span>
                </div>

                <div className="flex items-center justify-between py-5">
                  <div className="flex items-center gap-4 text-gray-700">
                    <Target className="h-5 w-5 text-green-800" />
                    <span className="font-semibold">Zentrum:</span>
                  </div>
                  <span>48.123, 11.123</span>
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

              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <img
                  src={fieldMapPreview}
                  alt="Karten-Vorschau der Fläche"
                  className="h-82.5 w-full object-cover"
                />
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
              Diese Fläche wurde im Frühjahr vorbereitet.
            </p>
          </section>

          <section className="rounded-2xl bg-white/95 p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-800">
                <Settings className="h-7 w-7" />
              </div>

              <h2 className="text-3xl font-bold text-green-900">Aktionen</h2>
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
        </div>
      </div>
    </main>
  )
}

export default FieldDetails
