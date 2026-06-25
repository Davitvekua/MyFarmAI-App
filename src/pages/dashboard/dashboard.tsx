import { useEffect, useState } from "react"
import {
  Edit3,
  Eye,
  Map,
  Plus,
  Ruler,
  Sprout,
  Star,
  UserRound,
  Zap,
} from "lucide-react"
import { Link } from "react-router-dom"

import dashboardBackground from "../../assets/landing-background.jpg"

import { useAuth } from "../../context/AuthContext"
import StatsCard from "@/components/StatsCard"
import type { DashboardField } from "@/types/appTypes"
import { loadProfileforDashboard } from "@/apiService/ProfileApi"
import { loadFieldsforDashboard } from "@/apiService/FieldsApi"

function Dashboard() {
  const { user } = useAuth()

  const [profileName, setProfileName] = useState("Nutzer")
  const [fields, setFields] = useState<DashboardField[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    async function loadDashboardProfile() {
      if (!user) return

      const data = await loadProfileforDashboard(user)

      if (!data) return

      const fullName = `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim()

      if (fullName) {
        setProfileName(fullName)
      }
    }

    async function loadDashboardFields() {
      if (!user) return

      setIsLoading(true)
      setErrorMessage("")

      const { data, error } = await loadFieldsforDashboard(user)

      setIsLoading(false)

      if (error) {
        setErrorMessage("Flächen konnten nicht geladen werden.")
        return
      }

      setFields(data ?? [])
    }

    loadDashboardProfile()
    loadDashboardFields()
  }, [user])

  const totalAreaHa = fields.reduce((sum, field) => {
    return sum + Number(field.area_ha ?? 0)
  }, 0)

  const largestField = fields.reduce<DashboardField | null>(
    (largest, field) => {
      if (!largest) return field

      return Number(field.area_ha ?? 0) > Number(largest.area_ha ?? 0)
        ? field
        : largest
    },
    null
  )

  function formatArea(areaHa: number | null) {
    if (areaHa === null) return "-"

    return `${areaHa.toLocaleString("de-DE")} ha`
  }

  return (
    <main
      className="flex min-h-[calc(100vh-140px)] flex-col bg-cover bg-center bg-no-repeat text-gray-900"
      style={{ backgroundImage: `url(${dashboardBackground})` }}
    >
      <div className="flex-1 bg-[#f7f8ef]/70">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <section className="mb-8">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-800 text-green-50">
                <UserRound className="h-9 w-9" />
              </div>

              <div>
                <h1 className="text-5xl font-bold text-green-900">
                  Willkommen, {profileName}
                </h1>
                <p className="mt-2 text-lg text-gray-700">
                  Hier ist ein Überblick über deine landwirtschaftlichen
                  Flächen.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8 grid grid-cols-3 gap-8">
            <StatsCard
              label="Anzahl Flächen"
              value={isLoading ? "-" : fields.length}
              icon={Sprout}
            />
            <StatsCard
              label="Gesamtfläche"
              value={
                isLoading ? "-" : `${totalAreaHa.toLocaleString("de-DE")} ha`
              }
              icon={Ruler}
            />
            <StatsCard
              label="Größte Fläche"
              value={isLoading ? "-" : (largestField?.name ?? "-")}
              icon={Star}
            />
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

            {isLoading && (
              <p className="rounded-xl bg-white px-6 py-6 text-lg text-gray-700">
                Flächen werden geladen...
              </p>
            )}

            {errorMessage && (
              <p className="rounded-xl bg-red-50 px-6 py-5 text-red-700">
                {errorMessage}
              </p>
            )}

            {!isLoading && !errorMessage && fields.length === 0 && (
              <p className="rounded-xl bg-white px-6 py-6 text-lg text-gray-700">
                Noch keine Flächen angelegt.
              </p>
            )}

            {!isLoading && !errorMessage && fields.length > 0 && (
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
                    {fields.map((field, index) => (
                      <tr
                        key={field.id}
                        className={
                          index === fields.length - 1
                            ? ""
                            : "border-b border-gray-100"
                        }
                      >
                        <td className="px-6 py-5">{field.name}</td>
                        <td className="px-6 py-5">{field.crop_type || "-"}</td>
                        <td className="px-6 py-5">{field.soil_type || "-"}</td>
                        <td className="px-6 py-5">
                          {formatArea(field.area_ha)}
                        </td>

                        <td className="py-5 text-right text-gray-900">
                          <Link
                            to={`/fields/${field.id}`}
                            title="Details"
                            aria-label={`Details für ${field.name} anzeigen`}
                            className="px-6 text-green-800 hover:text-green-950"
                          >
                            <Eye className="inline-block h-5 w-5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
                to="/fields-map"
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
