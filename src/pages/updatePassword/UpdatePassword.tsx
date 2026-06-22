import { useState, type SyntheticEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, KeyRound, Lock, Save } from "lucide-react"

import updatePasswordBackground from "../../assets/landing-background.jpg"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updatePassword } from "@/apiService/AuthApi"

function UpdatePassword() {
  const navigate = useNavigate()

  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  async function handleUpdatePassword(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()

    setErrorMessage("")
    setSuccessMessage("")

    if (!newPassword.trim() || !confirmNewPassword.trim()) {
      setErrorMessage("Bitte gib dein neues Passwort zweimal ein.")
      return
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Die neuen Passwörter stimmen nicht überein.")
      return
    }

    if (newPassword.length < 6) {
      setErrorMessage("Das neue Passwort muss mindestens 6 Zeichen lang sein.")
      return
    }

    setIsSaving(true)

    const error = await updatePassword(newPassword)

    setIsSaving(false)

    if (error) {
      setErrorMessage(
        "Passwort konnte nicht geändert werden. Bitte fordere einen neuen Link an."
      )
      return
    }

    setNewPassword("")
    setConfirmNewPassword("")
    setSuccessMessage("Passwort wurde erfolgreich geändert.")

    window.setTimeout(() => {
      navigate("/login")
    }, 2000)
  }

  return (
    <main
      className="min-h-[calc(100vh-140px)] bg-cover bg-center bg-no-repeat px-6 py-20"
      style={{ backgroundImage: `url(${updatePasswordBackground})` }}
    >
      <div className="mx-auto flex max-w-5xl justify-center">
        <Card className="w-full max-w-xl rounded-3xl bg-white/95 px-8 py-10 shadow-xl">
          <CardContent className="p-0">
            <div className="mb-10 flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-800">
                <KeyRound className="h-8 w-8" />
              </div>

              <div>
                <h1 className="text-4xl font-bold text-green-950">
                  Neues Passwort
                </h1>
                <p className="mt-2 text-gray-700">
                  Lege hier dein neues Passwort fest.
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-7">
              <div className="space-y-3">
                <Label
                  htmlFor="newPassword"
                  className="text-lg font-semibold text-gray-800"
                >
                  Neues Passwort
                </Label>

                <div className="relative">
                  <Lock className="absolute top-1/2 left-4 h-6 w-6 -translate-y-1/2 text-gray-500" />

                  <Input
                    id="newPassword"
                    type={isNewPasswordVisible ? "text" : "password"}
                    placeholder="Neues Passwort"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    disabled={isSaving}
                    className="h-16 rounded-xl border border-gray-300 px-14 text-lg text-gray-700"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setIsNewPasswordVisible((visible) => !visible)
                    }
                    disabled={isSaving}
                    aria-label={
                      isNewPasswordVisible
                        ? "Passwort verbergen"
                        : "Passwort anzeigen"
                    }
                    aria-pressed={isNewPasswordVisible}
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isNewPasswordVisible ? (
                      <EyeOff className="h-6 w-6" />
                    ) : (
                      <Eye className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="confirmNewPassword"
                  className="text-lg font-semibold text-gray-800"
                >
                  Neues Passwort wiederholen
                </Label>

                <div className="relative">
                  <Lock className="absolute top-1/2 left-4 h-6 w-6 -translate-y-1/2 text-gray-500" />

                  <Input
                    id="confirmNewPassword"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    placeholder="Neues Passwort wiederholen"
                    value={confirmNewPassword}
                    onChange={(event) =>
                      setConfirmNewPassword(event.target.value)
                    }
                    disabled={isSaving}
                    className="h-16 rounded-xl border border-gray-300 px-14 text-lg text-gray-700"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setIsConfirmPasswordVisible((visible) => !visible)
                    }
                    disabled={isSaving}
                    aria-label={
                      isConfirmPasswordVisible
                        ? "Passwort verbergen"
                        : "Passwort anzeigen"
                    }
                    aria-pressed={isConfirmPasswordVisible}
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeOff className="h-6 w-6" />
                    ) : (
                      <Eye className="h-6 w-6" />
                    )}
                  </button>
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
                type="submit"
                disabled={isSaving}
                className="h-16 w-full rounded-xl bg-green-700 text-xl font-semibold text-white shadow-md hover:bg-green-800 disabled:opacity-60"
              >
                <Save className="mr-3 h-6 w-6" />
                {isSaving ? "Wird gespeichert..." : "Passwort speichern"}
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-14 w-full rounded-xl border-green-800 text-lg font-semibold text-green-800 hover:bg-green-50 hover:text-green-900"
              >
                <Link to="/login">Zurück zum Login</Link>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default UpdatePassword
