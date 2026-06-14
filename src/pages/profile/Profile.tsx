import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { KeyRound, LogOut, Save, User } from "lucide-react"

import profileBackground from "../../assets/profile_background.jpg"

import { supabase } from "../../lib/supabaseClient"
import { useAuth } from "../../context/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ChangePassword from "./ChangePassword"

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

      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name, country, city")
        .eq("id", user.id)
        .maybeSingle()

      setIsLoading(false)

      if (error) {
        setErrorMessage("Profildaten konnten nicht geladen werden.")
        return
      }

      const loadedProfileForm = {
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

    setIsSaving(true)

    const normalizedProfileForm = normalizeProfileForm(profileForm)

    const { error } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        first_name: normalizedProfileForm.firstName || null,
        last_name: normalizedProfileForm.lastName || null,
        country: normalizedProfileForm.country || null,
        city: normalizedProfileForm.city || null,
      },
      { onConflict: "id" }
    )

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
    await supabase.auth.signOut()
    navigate("/login")
  }

  const inputClassName =
    "h-12 rounded-lg border border-gray-400 bg-white px-4 text-gray-700 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 disabled:bg-gray-50 disabled:text-gray-500"

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${profileBackground})` }}
    >
      <div className="min-h-screen bg-[#f7f8ef]/70">
        <main className="mx-auto max-w-4xl px-6 py-12">
          <Card className="rounded-2xl bg-white/95 p-6 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-800">
                  <User className="h-9 w-9" />
                </div>

                <CardTitle className="text-4xl font-bold text-green-900">
                  Benutzerprofil
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-[180px_1fr] items-center gap-6">
                <Label htmlFor="firstName" className="text-gray-700">
                  Vorname
                </Label>
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

              <div className="grid grid-cols-[180px_1fr] items-center gap-6">
                <Label htmlFor="lastName" className="text-gray-700">
                  Nachname
                </Label>
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

              <div className="grid grid-cols-[180px_1fr] items-center gap-6">
                <Label htmlFor="email" className="text-gray-700">
                  E-Mail-Adresse
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email ?? ""}
                  readOnly
                  className={inputClassName}
                />
              </div>

              <div className="grid grid-cols-[180px_1fr] items-center gap-6">
                <Label htmlFor="country" className="text-gray-700">
                  Land
                </Label>
                <Input
                  id="country"
                  value={profileForm.country}
                  onChange={(event) =>
                    handleInputChange("country", event.target.value)
                  }
                  disabled={isLoading || isSaving}
                  className={inputClassName}
                />
              </div>

              <div className="grid grid-cols-[180px_1fr] items-center gap-6">
                <Label htmlFor="city" className="text-gray-700">
                  Ort
                </Label>
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

              {errorMessage && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {errorMessage}
                </p>
              )}

              {successMessage && (
                <p className="rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  {successMessage}
                </p>
              )}

              <div className="grid grid-cols-[180px_1fr] items-center gap-6">
                <div />

                <Button
                  type="button"
                  onClick={handleSaveProfile}
                  disabled={isLoading || isSaving || !hasUnsavedChanges}
                  className="w-fit bg-green-700 px-8 py-6 text-base font-semibold hover:bg-green-800 disabled:opacity-60"
                >
                  <Save className="mr-2 h-5 w-5" />
                  {isSaving ? "Wird gespeichert..." : "Änderungen speichern"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 rounded-2xl bg-white/95 p-6 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-800">
                  <KeyRound className="h-8 w-8" />
                </div>

                <CardTitle className="text-3xl font-bold text-green-900">
                  Konto
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-8">
                <ChangePassword />

                <Button
                  type="button"
                  onClick={handleLogout}
                  variant="outline"
                  className="border-red-500 py-6 text-base font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

export default Profile
