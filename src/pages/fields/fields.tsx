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

import { useAuth } from "../../context/AuthContext"
import { cropTypeOptions } from "../../data/fieldOptions"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import type { FieldsListField } from "@/types/appTypes"

import Combobox from "@/components/Combobox"
import {
  deleteFieldForFieldsList,
  loadFieldsForFieldsList,
} from "@/apiService/FieldsApi"

const allCropTypesOption = "Alle Kulturarten"

function Fields() {
  const { user } = useAuth()

  const [fields, setFields] = useState<FieldsListField[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [deletingFieldId, setDeletingFieldId] = useState<string | null>(null)

  const [selectedCropType, setSelectedCropType] = useState("")
  const [cropComboboxOpen, setCropComboboxOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    async function loadFields() {
      if (!user) return

      setIsLoading(true)
      setErrorMessage("")

      const { data, error } = await loadFieldsForFieldsList(user.id)

      setIsLoading(false)

      if (error) {
        setErrorMessage("Flächen konnten nicht geladen werden.")
        return
      }

      setFields(data ?? [])
    }

    loadFields()
  }, [user])

  const cropTypeFilterOptions = [allCropTypesOption, ...cropTypeOptions]

  const filteredFields = fields.filter((field) => {
    const matchesSearch1 = field.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())

    const matchesSearch2 = field.soil_type
      ?.toLowerCase()
      .includes(searchTerm.trim().toLowerCase())

    const matchesSearch3 = field.area_ha
      ?.toLocaleString("de-DE")
      .includes(searchTerm.trim())

    const matchesSearch4 = field.crop_type
      ?.toLowerCase()
      .includes(searchTerm.trim().toLowerCase())

    const matchesCropType =
      selectedCropType === allCropTypesOption ||
      selectedCropType === "" ||
      field.crop_type?.trim().toLowerCase() ===
        selectedCropType.trim().toLowerCase()

    return (
      (matchesSearch1 || matchesSearch2 || matchesSearch3 || matchesSearch4) &&
      matchesCropType
    )
  })

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

  async function handleDeleteField(fieldId: string, fieldName: string) {
    setErrorMessage("")

    if (!user) {
      setErrorMessage("Du musst eingeloggt sein, um eine Fläche zu löschen.")
      return
    }

    const shouldDelete = window.confirm(
      `Möchtest du die Fläche "${fieldName}" wirklich löschen?`
    )

    if (!shouldDelete) return

    setDeletingFieldId(fieldId)

    const error = await deleteFieldForFieldsList(fieldId, user.id)

    setDeletingFieldId(null)

    if (error) {
      setErrorMessage("Fläche konnte nicht gelöscht werden.")
      return
    }

    setFields((currentFields) =>
      currentFields.filter((field) => field.id !== fieldId)
    )
  }

  return (
    <main
      className="flex min-h-[calc(100vh-140px)] flex-col bg-cover bg-center bg-no-repeat text-gray-900"
      style={{ backgroundImage: `url(${fieldsBackground})` }}
    >
      <div className="flex-1 bg-[#f7f8ef]/70">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <section className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-800 text-green-50">
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

          <Card className="mb-8 rounded-2xl bg-white/95 p-8 pt-6 shadow-lg">
            <CardContent className="grid grid-cols-2 gap-8 p-0">
              <div className="mt-1.5">
                <p className="mb-2 text-lg font-semibold text-gray-800">
                  Suche / Filter
                </p>

                <div className="relative">
                  <Search className="absolute top-1/2 left-4 h-6 w-6 -translate-y-1/2 text-gray-500" />
                  <Input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="freie Suche"
                    className="h-12 border-gray-300 pl-14 text-lg text-gray-700"
                  />
                </div>
              </div>

              <div>
                <div className="pt-2 text-[1.1rem]">
                  <Combobox
                    label="Filter: Kulturart"
                    placeholder="Alle Kulturarten"
                    searchPlaceholder="Kulturart suchen..."
                    emptyMessage="Keine passende Kulturart gefunden."
                    value={selectedCropType}
                    options={cropTypeFilterOptions}
                    open={cropComboboxOpen}
                    onOpenChange={setCropComboboxOpen}
                    onValueChange={setSelectedCropType}
                  />
                </div>
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

              {!isLoading &&
                !errorMessage &&
                fields.length > 0 &&
                filteredFields.length === 0 && (
                  <p className="rounded-xl bg-white px-6 py-6 text-lg text-gray-700">
                    Keine Flächen mit dieser Kulturart gefunden.
                  </p>
                )}

              {!isLoading && !errorMessage && filteredFields.length > 0 && (
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
                      {filteredFields.map((field, index) => (
                        <tr
                          key={field.id}
                          className={
                            index === filteredFields.length - 1
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
                                asChild
                                variant="outline"
                                className="border-green-700 text-green-800 hover:bg-green-50 hover:text-green-900"
                              >
                                <Link to={`/fields/${field.id}/edit`}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Bearbeiten
                                </Link>
                              </Button>

                              <Button
                                type="button"
                                variant="outline"
                                disabled={deletingFieldId === field.id}
                                onClick={() =>
                                  handleDeleteField(field.id, field.name)
                                }
                                className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 disabled:opacity-60"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                {deletingFieldId === field.id
                                  ? "Löscht..."
                                  : "Löschen"}
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
