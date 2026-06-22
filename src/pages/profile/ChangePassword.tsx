import { useEffect, useState, type SyntheticEvent } from "react"
import { Eye, EyeOff, KeyRound, Lock, Save, X } from "lucide-react"

import { useAuth } from "../../context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { changePasswordWithCurrentPassword } from "@/apiService/AuthApi"

function ChangePassword() {
  const { user } = useAuth()

  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false)
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)
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
    "h-13 rounded-xl border-gray-300 bg-white px-12 text-base text-gray-700"

  function resetPasswordForm() {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmNewPassword("")
    setIsCurrentPasswordVisible(false)
    setIsNewPasswordVisible(false)
    setIsConfirmPasswordVisible(false)
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

    const result = await changePasswordWithCurrentPassword(
      user.email,
      currentPassword,
      newPassword
    )

    setIsChangingPassword(false)

    if (!result.success) {
      if (result.reason === "wrong-current-password") {
        setPasswordErrorMessage("Das aktuelle Passwort ist nicht korrekt.")
        return
      }

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
        className="h-14 w-full rounded-xl border-green-700 text-lg font-semibold text-green-800 hover:bg-green-50 hover:text-green-900"
      >
        <KeyRound className="mr-2 h-5 w-5" />
        Passwort ändern
      </Button>

      {showPasswordForm && (
        <form onSubmit={handleChangePassword} className="col-span-2 space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="currentPassword"
              className="text-base font-semibold text-gray-800"
            >
              Aktuelles Passwort
            </Label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <Input
                id="currentPassword"
                type={isCurrentPasswordVisible ? "text" : "password"}
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                disabled={isChangingPassword}
                className={inputClassName}
              />
              <button
                type="button"
                onClick={() =>
                  setIsCurrentPasswordVisible((visible) => !visible)
                }
                disabled={isChangingPassword}
                aria-label={
                  isCurrentPasswordVisible
                    ? "Passwort verbergen"
                    : "Passwort anzeigen"
                }
                aria-pressed={isCurrentPasswordVisible}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCurrentPasswordVisible ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="newPassword"
              className="text-base font-semibold text-gray-800"
            >
              Neues Passwort
            </Label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <Input
                id="newPassword"
                type={isNewPasswordVisible ? "text" : "password"}
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                disabled={isChangingPassword}
                className={inputClassName}
              />
              <button
                type="button"
                onClick={() => setIsNewPasswordVisible((visible) => !visible)}
                disabled={isChangingPassword}
                aria-label={
                  isNewPasswordVisible
                    ? "Passwort verbergen"
                    : "Passwort anzeigen"
                }
                aria-pressed={isNewPasswordVisible}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isNewPasswordVisible ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirmNewPassword"
              className="text-base font-semibold text-gray-800"
            >
              Neues Passwort wiederholen
            </Label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <Input
                id="confirmNewPassword"
                type={isConfirmPasswordVisible ? "text" : "password"}
                value={confirmNewPassword}
                onChange={(event) => setConfirmNewPassword(event.target.value)}
                disabled={isChangingPassword}
                className={inputClassName}
              />
              <button
                type="button"
                onClick={() =>
                  setIsConfirmPasswordVisible((visible) => !visible)
                }
                disabled={isChangingPassword}
                aria-label={
                  isConfirmPasswordVisible
                    ? "Passwort verbergen"
                    : "Passwort anzeigen"
                }
                aria-pressed={isConfirmPasswordVisible}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isConfirmPasswordVisible ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {passwordErrorMessage && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {passwordErrorMessage}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="contents">
              <Button
                type="submit"
                disabled={isChangingPassword}
                className="h-14 rounded-xl bg-green-700 text-lg font-semibold text-white shadow-md hover:bg-green-800 disabled:opacity-60"
              >
                <Save className="mr-2 h-5 w-5" />
                {isChangingPassword ? "Wird geändert..." : "Passwort speichern"}
              </Button>

              <Button
                type="button"
                onClick={handleCancelPasswordChange}
                disabled={isChangingPassword}
                className="rounded-x h-14 border border-green-700 bg-transparent px-8 py-6 text-[1.03rem] font-semibold text-green-800 hover:bg-green-50"
              >
                <X className="mr-2 h-5 w-5" />
                Abbrechen
              </Button>
            </div>
          </div>
        </form>
      )}

      {passwordSuccessMessage && (
        <p className="col-span-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {passwordSuccessMessage}
        </p>
      )}
    </>
  )
}

export default ChangePassword
