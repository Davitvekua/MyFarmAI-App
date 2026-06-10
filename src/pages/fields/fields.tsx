import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  Apple,
  Eye,
  Pencil,
  Plus,
  Search,
  Sprout,
  Trash2,
  Wheat,
} from "lucide-react"

import fieldsBackground from "../../assets/landing-background.jpg"

import { supabase } from "../../lib/supabaseClient"
import { useAuth } from "../../context/AuthContext"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Field } from "@/types/appTypes"

type FieldsListField = Pick<
  Field,
  "id" | "user_id" | "name" | "crop_type" | "soil_type" | "area_ha"
>

function Fields() {
  const { user } = useAuth()

  const [fields, setFields] = useState<FieldsListField[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    async function loadFields() {
      if (!user) return

      setIsLoading(true)
      setErrorMessage("")

      const { data, error } = await supabase
        .from("fields")
        .select("id, user_id, name, crop_type, soil_type, area_ha")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      setIsLoading(false)

      if (error) {
        setErrorMessage("Flächen konnten nicht geladen werden.")
        return
      }

      setFields(data ?? [])
    }

    loadFields()
  }, [user])

  function formatArea(areaHa: number | null) {
    if (areaHa === null) return "-"

    return `${areaHa.toLocaleString("de-DE")} ha`
  }

  function getFieldIcon(cropType: string | null) {
    if (cropType?.toLowerCase().includes("apfel")) {
      return <Apple className="h-7 w-7" />
    }

    return <Wheat className="h-7 w-7" />
  }

  return (
    <main
      className="min-h-[calc(100vh-140px)] bg-cover bg-center bg-no-repeat text-gray-900"
      style={{ backgroundImage: `url(${fieldsBackground})` }}
    >
      <div className="min-h-[calc(100vh-140px)] bg-[#f7f8ef]/70">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <section className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-800">
                <Sprout className="h-10 w-10" />
              </div>

              <div>
                <h1 className="text-5xl font-bold text-green-900">
                  Flächenverwaltung
                </h1>
                <p className="mt-2 text-lg text-gray-700">
                  Verwalte und organisiere deine landwirtschaftlichen Flächen.
                </p>
              </div>
            </div>

            <Button
              asChild
              className="h-14 rounded-xl bg-green-700 px-8 text-lg font-semibold text-white shadow-md hover:bg-green-800"
            >
              <Link to="/map">
                <Plus className="mr-3 h-6 w-6" />
                Neue Fläche
              </Link>
            </Button>
          </section>

          <Card className="mb-8 rounded-2xl bg-white/95 p-8 shadow-lg">
            <CardContent className="grid grid-cols-2 gap-8 p-0">
              <div>
                <p className="mb-3 text-lg font-semibold text-gray-800">
                  Suche / Filter
                </p>

                <div className="relative">
                  <Search className="absolute top-1/2 left-4 h-6 w-6 -translate-y-1/2 text-gray-500" />
                  <Input
                    value="Fläche suchen..."
                    readOnly
                    className="h-14 rounded-xl border-gray-300 pl-14 text-lg text-gray-500"
                  />
                </div>
              </div>

              <div>
                <p className="mb-3 text-lg font-semibold text-gray-800">
                  Filter: Kulturart
                </p>

                <Select disabled>
                  <SelectTrigger className="h-14 rounded-xl border-gray-300 px-5 text-lg text-gray-500">
                    <SelectValue placeholder="Alle Kulturarten" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Kulturarten</SelectItem>
                    <SelectItem value="mais">Mais</SelectItem>
                    <SelectItem value="weizen">Weizen</SelectItem>
                    <SelectItem value="apfel">Apfel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-white/95 p-8 shadow-lg">
            <CardContent className="p-0">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-800">
                  <Sprout className="h-7 w-7" />
                </div>

                <h2 className="text-3xl font-bold text-green-900">
                  Alle Flächen
                </h2>
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
                        <th className="px-6 py-4 font-semibold">Name</th>
                        <th className="px-6 py-4 font-semibold">Kulturart</th>
                        <th className="px-6 py-4 font-semibold">Bodenart</th>
                        <th className="px-6 py-4 font-semibold">Größe</th>
                        <th className="px-6 py-4 text-right font-semibold">
                          Aktionen
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-gray-700">
                      {fields.map((field, index) => (
                        <tr
                          key={field.id}
                          className={
                            index === fields.length - 1
                              ? ""
                              : "border-b border-gray-100"
                          }
                        >
                          <td className="px-6 py-6">
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-800">
                                {getFieldIcon(field.crop_type)}
                              </div>
                              <span className="text-lg font-semibold">
                                {field.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-6 text-lg">
                            {field.crop_type || "-"}
                          </td>
                          <td className="px-6 py-6 text-lg">
                            {field.soil_type || "-"}
                          </td>
                          <td className="px-6 py-6 text-lg">
                            {formatArea(field.area_ha)}
                          </td>
                          <td className="px-6 py-6">
                            <div className="flex justify-end gap-3">
                              <Button
                                asChild
                                variant="outline"
                                className="border-green-700 text-green-800 hover:bg-green-50 hover:text-green-900"
                              >
                                <Link to={`/fields/${field.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Details
                                </Link>
                              </Button>

                              <Button
                                variant="outline"
                                className="border-green-700 text-green-800 hover:bg-green-50 hover:text-green-900"
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Bearbeiten
                              </Button>

                              <Button
                                variant="outline"
                                className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Löschen
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

export default Fields
