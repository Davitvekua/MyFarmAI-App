import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Globe, KeyRound, LogOut, Mail, MapPin, Save, User } from "lucide-react"

import profileBackground from "../../assets/landing-background.jpg"

import { useAuth } from "../../context/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ChangePassword from "./ChangePassword"
import {
  loadProfileForProfilePage,
  saveProfileForProfilePage,
} from "@/apiService/ProfileApi"
import type { ProfileInsert } from "@/types/appTypes"

import { logoutUser } from "@/apiService/AuthApi"

type ProfileForm = {
  firstName: string
  lastName: string
  country: string
  city: string
}

const emptyProfileForm: ProfileForm = {
  firstName: "",
  lastName: "",
  country: "",
  city: "",
}

function normalizeProfileForm(profileForm: ProfileForm): ProfileForm {
  return {
    firstName: profileForm.firstName.trim(),
    lastName: profileForm.lastName.trim(),
    country: profileForm.country.trim(),
    city: profileForm.city.trim(),
  }
}

function hasProfileFormChanges(
  currentProfileForm: ProfileForm,
  savedProfileForm: ProfileForm
) {
  return (
    currentProfileForm.firstName !== savedProfileForm.firstName ||
    currentProfileForm.lastName !== savedProfileForm.lastName ||
    currentProfileForm.country !== savedProfileForm.country ||
    currentProfileForm.city !== savedProfileForm.city
  )
}

function Profile() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [profileForm, setProfileForm] = useState<ProfileForm>(emptyProfileForm)
  const [savedProfileForm, setSavedProfileForm] =
    useState<ProfileForm>(emptyProfileForm)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const hasUnsavedChanges = hasProfileFormChanges(profileForm, savedProfileForm)

  useEffect(() => {
    if (!successMessage) return

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage("")
    }, 5000)

    return () => window.clearTimeout(timeoutId)
  }, [successMessage])

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        setIsLoading(false)
        setErrorMessage("Du musst eingeloggt sein, um dein Profil zu sehen.")
        return
      }

      setIsLoading(true)
      setErrorMessage("")
      setSuccessMessage("")

      const { data, error } = await loadProfileForProfilePage(user.id)

      setIsLoading(false)

      if (error) {
        setErrorMessage("Profildaten konnten nicht geladen werden.")
        return
      }

      const loadedProfileForm: ProfileForm = {
        firstName: data?.first_name ?? "",
        lastName: data?.last_name ?? "",
        country: data?.country ?? "",
        city: data?.city ?? "",
      }

      setProfileForm(loadedProfileForm)
      setSavedProfileForm(loadedProfileForm)
    }

    loadProfile()
  }, [user])

  function handleInputChange(field: keyof ProfileForm, value: string) {
    setSuccessMessage("")

    setProfileForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }))
  }

  async function handleSaveProfile() {
    setErrorMessage("")
    setSuccessMessage("")

    if (!user) {
      setErrorMessage("Du musst eingeloggt sein, um dein Profil zu speichern.")
      return
    }

    const normalizedProfileForm = normalizeProfileForm(profileForm)

    if (
      !normalizedProfileForm.firstName ||
      !normalizedProfileForm.lastName ||
      !normalizedProfileForm.country ||
      !normalizedProfileForm.city
    ) {
      setErrorMessage("Bitte fülle alle Profildaten aus.")
      return
    }

    setIsSaving(true)

    const profileData: ProfileInsert = {
      id: user.id,
      first_name: normalizedProfileForm.firstName || null,
      last_name: normalizedProfileForm.lastName || null,
      country: normalizedProfileForm.country || null,
      city: normalizedProfileForm.city || null,
    }

    const error = await saveProfileForProfilePage(profileData)

    setIsSaving(false)

    if (error) {
      setErrorMessage("Profildaten konnten nicht gespeichert werden.")
      return
    }

    setProfileForm(normalizedProfileForm)
    setSavedProfileForm(normalizedProfileForm)
    setSuccessMessage("Profildaten wurden gespeichert.")
  }

  async function handleLogout() {
    const error = await logoutUser()

    if (error) {
      setErrorMessage("Logout fehlgeschlagen.")
      return
    }

    navigate("/login")
  }

  const inputClassName =
    "h-13 rounded-xl border-gray-300 pl-12 text-base text-gray-700"

  return (
    <main
      className="min-h-[calc(100vh-140px)] bg-cover bg-center bg-no-repeat px-6 py-20"
      style={{ backgroundImage: `url(${profileBackground})` }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6">
        <Card className="w-full max-w-xl rounded-3xl bg-white/95 px-8 py-10 shadow-xl">
          <CardContent className="p-0">
            <div className="mb-10 flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-800">
                <User className="h-8 w-8" />
              </div>

              <div>
                <h1 className="text-4xl font-bold text-green-950">
                  Benutzerprofil
                </h1>
                <p className="mt-2 text-gray-700">
                  Verwalte hier deine persönlichen Daten.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-base font-semibold text-gray-800"
                >
                  Vorname
                </Label>
                <div className="relative">
                  <User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="firstName"
                    value={profileForm.firstName}
                    onChange={(event) =>
                      handleInputChange("firstName", event.target.value)
                    }
                    disabled={isLoading || isSaving}
                    className={inputClassName}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-base font-semibold text-gray-800"
                >
                  Nachname
                </Label>
                <div className="relative">
                  <User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="lastName"
                    value={profileForm.lastName}
                    onChange={(event) =>
                      handleInputChange("lastName", event.target.value)
                    }
                    disabled={isLoading || isSaving}
                    className={inputClassName}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-base font-semibold text-gray-800"
                >
                  E-Mail-Adresse
                </Label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    value={user?.email ?? ""}
                    readOnly
                    disabled
                    className={inputClassName}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="country"
                  className="text-base font-semibold text-gray-800"
                >
                  Land
                </Label>
                <div className="relative">
                  <Globe className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <select
                    id="country"
                    value={profileForm.country}
                    onChange={(event) =>
                      handleInputChange("country", event.target.value)
                    }
                    disabled={isLoading || isSaving}
                    className="h-13 w-full appearance-none rounded-xl border border-gray-300 bg-white px-12 text-base text-gray-700 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="">Land auswählen</option>
                    <option value="Österreich">Österreich</option>
                    <option value="Deutschland">Deutschland</option>
                    <option value="Schweiz">Schweiz</option>
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-500">
                    ⌄
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="city"
                  className="text-base font-semibold text-gray-800"
                >
                  Ort
                </Label>
                <div className="relative">
                  <MapPin className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <Input
                    id="city"
                    value={profileForm.city}
                    onChange={(event) =>
                      handleInputChange("city", event.target.value)
                    }
                    disabled={isLoading || isSaving}
                    className={inputClassName}
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {errorMessage}
                </p>
              )}
              {successMessage && (
                <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  {successMessage}
                </p>
              )}

              <Button
                type="button"
                onClick={handleSaveProfile}
                disabled={isLoading || isSaving || !hasUnsavedChanges}
                className="h-14 w-full rounded-xl bg-green-700 text-lg font-semibold text-white shadow-md hover:bg-green-800 disabled:opacity-60"
              >
                <Save className="mr-3 h-5 w-5" />
                {isSaving ? "Wird gespeichert..." : "Änderungen speichern"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full max-w-xl rounded-3xl bg-white/95 px-8 py-10 shadow-xl">
          <CardContent className="p-0">
            <div className="mb-7 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-800">
                <KeyRound className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-950">Konto</h2>
                <p className="text-gray-700">Passwort und Sitzung verwalten.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ChangePassword />
              <Button
                type="button"
                onClick={handleLogout}
                variant="outline"
                className="col-start-2 row-start-1 h-14 rounded-xl border-red-500 text-lg font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default Profile
