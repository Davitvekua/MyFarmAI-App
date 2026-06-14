import { useEffect, useState, type SyntheticEvent } from "react"
import { KeyRound, Save, X } from "lucide-react"

import { supabase } from "../../lib/supabaseClient"
import { useAuth } from "../../context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function ChangePassword() {
  const { user } = useAuth()

  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("")
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState("")

  useEffect(() => {
    if (!passwordSuccessMessage) return

    const timeoutId = window.setTimeout(() => {
      setPasswordSuccessMessage("")
    }, 5000)

    return () => window.clearTimeout(timeoutId)
  }, [passwordSuccessMessage])

  const inputClassName =
    "h-12 rounded-lg border border-gray-400 bg-white px-4 text-gray-700 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 disabled:bg-gray-50 disabled:text-gray-500"

  function resetPasswordForm() {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmNewPassword("")
  }

  function handleShowPasswordForm() {
    setShowPasswordForm(true)
    setPasswordErrorMessage("")
    setPasswordSuccessMessage("")
  }

  function handleCancelPasswordChange() {
    resetPasswordForm()
    setShowPasswordForm(false)
    setPasswordErrorMessage("")
    setPasswordSuccessMessage("")
  }

  async function handleChangePassword(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    setPasswordErrorMessage("")
    setPasswordSuccessMessage("")

    if (!user?.email) {
      setPasswordErrorMessage(
        "Du musst eingeloggt sein, um dein Passwort zu ändern."
      )
      return
    }

    if (!currentPassword.trim()) {
      setPasswordErrorMessage("Bitte gib dein aktuelles Passwort ein.")
      return
    }

    if (!newPassword.trim() || !confirmNewPassword.trim()) {
      setPasswordErrorMessage("Bitte gib dein neues Passwort zweimal ein.")
      return
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordErrorMessage("Die neuen Passwörter stimmen nicht überein.")
      return
    }

    if (newPassword.length < 6) {
      setPasswordErrorMessage(
        "Das neue Passwort muss mindestens 6 Zeichen lang sein."
      )
      return
    }

    setIsChangingPassword(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    })

    if (signInError) {
      setIsChangingPassword(false)
      setPasswordErrorMessage("Das aktuelle Passwort ist nicht korrekt.")
      return
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    })

    setIsChangingPassword(false)

    if (updateError) {
      setPasswordErrorMessage("Passwort konnte nicht geändert werden.")
      return
    }

    resetPasswordForm()
    setShowPasswordForm(false)
    setPasswordSuccessMessage("Passwort wurde geändert.")
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={handleShowPasswordForm}
        className="border-green-700 py-6 text-base font-semibold text-green-800 hover:bg-green-50 hover:text-green-900"
      >
        <KeyRound className="mr-2 h-5 w-5" />
        Passwort ändern
      </Button>

      {showPasswordForm && (
        <form
          onSubmit={handleChangePassword}
          className="col-span-2 space-y-5 rounded-xl border border-gray-200 bg-white p-5"
        >
          <div className="grid grid-cols-[180px_1fr] items-center gap-6">
            <Label htmlFor="currentPassword" className="text-gray-700">
              Aktuelles Passwort
            </Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              disabled={isChangingPassword}
              className={inputClassName}
            />
          </div>

          <div className="grid grid-cols-[180px_1fr] items-center gap-6">
            <Label htmlFor="newPassword" className="text-gray-700">
              Neues Passwort
            </Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              disabled={isChangingPassword}
              className={inputClassName}
            />
          </div>

          <div className="grid grid-cols-[180px_1fr] items-center gap-6">
            <Label htmlFor="confirmNewPassword" className="text-gray-700">
              Neues Passwort wiederholen
            </Label>
            <Input
              id="confirmNewPassword"
              type="password"
              value={confirmNewPassword}
              onChange={(event) => setConfirmNewPassword(event.target.value)}
              disabled={isChangingPassword}
              className={inputClassName}
            />
          </div>

          {passwordErrorMessage && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {passwordErrorMessage}
            </p>
          )}

          <div className="grid grid-cols-[180px_1fr] items-center gap-6">
            <div />

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isChangingPassword}
                className="bg-green-700 px-8 py-6 text-base font-semibold hover:bg-green-800 disabled:opacity-60"
              >
                <Save className="mr-2 h-5 w-5" />
                {isChangingPassword ? "Wird geändert..." : "Passwort speichern"}
              </Button>

              <Button
                type="button"
                onClick={handleCancelPasswordChange}
                disabled={isChangingPassword}
                className="rounded-lg border border-green-700 bg-transparent px-8 py-6 text-[1.03rem] font-semibold text-green-800 hover:bg-green-50"
              >
                <X className="mr-2 h-5 w-5" />
                Abbrechen
              </Button>
            </div>
          </div>
        </form>
      )}

      {passwordSuccessMessage && (
        <p className="col-span-2 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {passwordSuccessMessage}
        </p>
      )}
    </>
  )
}

export default ChangePassword
