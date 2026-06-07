import { Edit3, Map, Plus, Sprout, Star, Zap } from "lucide-react"
import { Link } from "react-router-dom"

import dashboardBackground from "../../assets/landing-background.jpg"

function Dashboard() {
  return (
    <main
      className="min-h-[calc(100vh-140px)] bg-cover bg-center bg-no-repeat text-gray-900"
      style={{ backgroundImage: `url(${dashboardBackground})` }}
    >
      <div className="min-h-[calc(100vh-140px)] bg-[#f7f8ef]/70">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <section className="mb-8">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-800">
                <Sprout className="h-9 w-9" />
              </div>

              <div>
                <h1 className="text-5xl font-bold text-green-900">
                  Willkommen, Nutzername
                </h1>
                <p className="mt-2 text-lg text-gray-700">
                  Hier ist ein Überblick über deine landwirtschaftlichen
                  Flächen.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8 grid grid-cols-3 gap-8">
            <div className="flex items-center gap-6 rounded-2xl bg-white/95 p-8 shadow-lg">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-800">
                <Sprout className="h-11 w-11" />
              </div>

              <div>
                <p className="text-lg text-gray-700">Anzahl Flächen</p>
                <p className="mt-2 text-4xl font-bold text-green-900">5</p>
              </div>
            </div>

            <div className="flex items-center gap-6 rounded-2xl bg-white/95 p-8 shadow-lg">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-800">
                <Sprout className="h-11 w-11" />
              </div>

              <div>
                <p className="text-lg text-gray-700">Gesamtfläche</p>
                <p className="mt-2 text-4xl font-bold text-green-900">
                  12,4 ha
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 rounded-2xl bg-white/95 p-8 shadow-lg">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-800">
                <Star className="h-11 w-11" />
              </div>

              <div>
                <p className="text-lg text-gray-700">Größte Fläche</p>
                <p className="mt-2 text-4xl font-bold text-green-900">
                  Feld Süd
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8 rounded-2xl bg-white/95 p-8 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-800">
                  <Sprout className="h-7 w-7" />
                </div>

                <h2 className="text-3xl font-bold text-green-900">
                  Alle Flächen
                </h2>
              </div>

              <Link
                to="/fields"
                className="flex items-center gap-3 rounded-lg border border-green-700 px-6 py-3 font-semibold text-green-800 hover:bg-green-50"
              >
                <Edit3 className="h-5 w-5" />
                Bearbeiten
              </Link>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-700">
                    <th className="px-6 py-4 font-semibold">Feldname</th>
                    <th className="px-6 py-4 font-semibold">Kulturart</th>
                    <th className="px-6 py-4 font-semibold">Bodenart</th>
                    <th className="px-6 py-4 font-semibold">Größe</th>
                    <th className="px-6 py-4" />
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-6 py-5">Feld Nord</td>
                    <td className="px-6 py-5">Mais</td>
                    <td className="px-6 py-5">Lehm</td>
                    <td className="px-6 py-5">2,1 ha</td>
                    <td className="px-6 py-5 text-right text-gray-500">⋮</td>
                  </tr>

                  <tr className="border-b border-gray-100">
                    <td className="px-6 py-5">Feld Süd</td>
                    <td className="px-6 py-5">Weizen</td>
                    <td className="px-6 py-5">Ton</td>
                    <td className="px-6 py-5">3,4 ha</td>
                    <td className="px-6 py-5 text-right text-gray-500">⋮</td>
                  </tr>

                  <tr>
                    <td className="px-6 py-5">Obstgarten</td>
                    <td className="px-6 py-5">Apfel</td>
                    <td className="px-6 py-5">Sand-Lehm</td>
                    <td className="px-6 py-5">0,8 ha</td>
                    <td className="px-6 py-5 text-right text-gray-500">⋮</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl bg-white/95 p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-800">
                <Zap className="h-7 w-7" />
              </div>

              <h2 className="text-3xl font-bold text-green-900">
                Schnellaktionen
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Link
                to="/map"
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-8 shadow-sm hover:bg-green-50"
              >
                <div className="flex items-center gap-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-800">
                    <Plus className="h-12 w-12" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-green-900">
                      Neue Fläche anlegen
                    </h3>
                    <p className="mt-2 text-gray-700">
                      Erstelle eine neue Fläche und hinterlege alle Details.
                    </p>
                  </div>
                </div>

                <span className="text-4xl text-green-900">›</span>
              </Link>

              <Link
                to="/map"
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-8 shadow-sm hover:bg-green-50"
              >
                <div className="flex items-center gap-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-800">
                    <Map className="h-12 w-12" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-green-900">
                      Karte öffnen
                    </h3>
                    <p className="mt-2 text-gray-700">
                      Sieh dir deine Flächen auf der Karte an.
                    </p>
                  </div>
                </div>

                <span className="text-4xl text-green-900">›</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
